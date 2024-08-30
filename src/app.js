require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./app/routes/orderRoutes');
const errorHandler = require('./frameworks/middleware/errorHandler');
const connectDB = require('./frameworks/database/db');
const { PORT } = require('./frameworks/environment');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/orders', orderRoutes);

app.use(errorHandler);

// const PORT = PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
