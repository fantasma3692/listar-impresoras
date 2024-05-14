// impresoraRoutes.js
const express = require('express');
const { execSync } = require('child_process');
const printer = require('printer');
const router = express.Router();
const directorioEjecucion = '/tmp';
router.get('/api/impresora', (req, res) => {
  try {
    // Mover el archivo a un directorio donde tengamos permisos de ejecución
    const pluginPath = path.join(__dirname, 'PrinterRecognitionPlugin.exe');
    const destino = path.join(directorioEjecucion, 'PrinterRecognitionPlugin.exe');
    fs.renameSync(pluginPath, destino);

    // Ejecutar el archivo desde su nueva ubicación
    const output = execSync(destino).toString();
    const impresoras = output.split('\n').filter(line => line.trim() !== ''); // Parsea la salida del programa C#
    res.json(impresoras);
  } catch (error) {
    console.error('Error al obtener la lista de impresoras:', error);
    res.status(500).json({ error: 'Error al obtener la lista de impresoras: ' + error });
  }
});
router.post('/print', (req, res) => {
  const { printerName, data } = req.body;

  if (!printerName || !data) {
    return res.status(400).json({ error: 'Se requiere printerName y data' });
  }

  try {
    printer.printDirect({
      data: data,
      printer: printerName,
      type: 'RAW',
      success: (jobID) => {
        console.log(`Impresión exitosa, ID de trabajo: ${jobID}`);
        res.json({ success: true, jobID: jobID });
      },
      error: (err) => {
        console.error('Error en la impresión:', err);
        res.status(500).json({ error: 'Error en la impresión' });
      }
    });
  } catch (err) {
    console.error('Error en la impresión:', err);
    res.status(500).json({ error: 'Error en la impresión' });
  }
})
module.exports = router;
