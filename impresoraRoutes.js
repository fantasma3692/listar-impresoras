// impresoraRoutes.js
const express = require('express');
const path = require('path'); // Importa el módulo 'path' de Node.js
const { execSync } = require('child_process');

const router = express.Router();

// Directorio donde moveremos el archivo para ejecutarlo
const directorioEjecucion = '/tmp'; // Cambia esto según tus necesidades

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

module.exports = router;
