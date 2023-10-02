const express = require('express');
const dotenv = require('dotenv').config();

const products = require('./routes/productRoutes');
const users = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

app.use(express.json());
app.use('/api/products', products);
app.use('/api/users', users);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
