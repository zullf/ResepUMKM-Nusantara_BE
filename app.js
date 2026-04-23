const express = require('express');
const cors = require('cors');

const resepRoutes = require('./routes/resepRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', resepRoutes);

module.exports = app;