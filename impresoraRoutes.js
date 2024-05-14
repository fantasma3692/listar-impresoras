// impresoraRoutes.js
const express = require('express');
const path = require('path'); // Importa el módulo 'path' de Node.js
const { execSync } = require('child_process');

const router = express.Router();

router.get('/api/impresora', (req, res) => {
  try {
    const pluginPath = path.join(__dirname, 'PrinterRecognitionPlugin.exe'); // Construye la ruta completa del archivo
    const output = execSync(pluginPath).toString();
    const impresoras = output.split('\n').filter(line => line.trim() !== ''); // Parsea la salida del programa C#
    res.json(impresoras);
  } catch (error) {
    console.error('Error al obtener la lista de impresoras:', error);
    res.status(500).json({ error: 'Error al obtener la lista de impresoras: ' + error });
  }
});

module.exports = router;

