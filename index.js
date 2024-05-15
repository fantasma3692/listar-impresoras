const express = require('express');
const bodyParser = require('body-parser');
const printer = require('pdf-to-printer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

const port = 3000;
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/print', async (req, res) => {
  const { content, options } = req.body;

  if (!content) {
    return res.status(400).send('El contenido es requerido');
  }

  const pdfPath = path.join(__dirname, 'temp.pdf');
  
  try {
    // Aquí deberías generar el PDF a partir del contenido
    // Para simplicidad, asumiremos que content es un HTML y usamos una librería para convertirlo en PDF
    const pdf = require('html-pdf');
    pdf.create(content).toFile(pdfPath, async (err, result) => {
      if (err) return res.status(500).send('Error al crear el PDF');
      
      try {
        await printer.print(result.filename, options);
        res.send('Impresión enviada');
      } catch (printError) {
        res.status(500).send('Error al imprimir el PDF');
      } finally {
        // Elimina el archivo temporal después de imprimir
        fs.unlinkSync(result.filename);
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor de impresión escuchando en http://localhost:${port}`);
});
