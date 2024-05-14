// impresoraRoutes.js
const express = require('express');
const { execSync } = require('child_process');

const router = express.Router();

router.get('/api/impresora', (req, res) => {
  try {
    const output = execSync('PrinterRecognitionPlugin.exe').toString();
    const impresoras = output.split('\n').filter(line => line.trim() !== ''); // Parsea la salida del programa C#
    res.json(impresoras);
  } catch (error) {
    console.error('Error al obtener la lista de impresoras:', error);
    res.status(500).json({ error: 'Error al obtener la lista de impresoras'+ error });
  }
});

module.exports = router;
