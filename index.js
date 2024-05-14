// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // o el puerto que desees utilizar
const cors = require('cors');
const impresoraRoutes = require('./impresoraRoutes');
app.use(cors());
app.use(bodyParser.json());
app.use(impresoraRoutes);
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
