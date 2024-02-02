require('dotenv').config();

const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');

const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// db connection
require('./config/db');

// routes
const router = require('./routes/Router');

app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
