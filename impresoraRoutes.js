// impresoraRoutes.js
const express = require('express');
const router = express.Router();
const printer = require('printer');
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
});
module.exports = router;
