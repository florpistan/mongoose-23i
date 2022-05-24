const Product = require('../models/Product');

exports.getProducts = (req, res) => res.status(200).json({ message: 'Hola Mundo' });

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body });
    const savedProduct = await product.save();
    return res.status(201).json({ message: 'El producto se guardó exitosamente', product: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'El servidor ha fallado' });
  }
};