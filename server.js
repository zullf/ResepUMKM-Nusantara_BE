const express = require('express');
const app = express();
const resepRoutes = require('./src/routes/resepRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api', resepRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});