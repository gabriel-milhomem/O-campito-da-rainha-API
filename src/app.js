require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routers = require('./routers');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/matches', routers.matches);
app.use('/pieces', routers.pieces);

module.exports = app;