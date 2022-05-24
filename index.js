const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

connectDB();
dotenv.config();

const app = express();

//Utilizamos limit para evitar que los request.body sean muy pesados.
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes)
/* app.use('/api/v1/products', );
app.use('/api/v1/purchases');
app.use('/api/v1/reviews'); */

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`Está corriendo en el puerto ${port}`);
});