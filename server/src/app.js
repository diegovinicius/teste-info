const express = require('express');
const routes = require('./routes/veiculoRoutes');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

module.exports = app;