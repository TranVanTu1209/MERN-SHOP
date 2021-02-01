const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc fetch all products
// @route GET /api/v1/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

// @desc fetch product by id
// @route GET /api/v1/products/:id
// @access public

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  return res.status(404).json({ msg: 'Product not found' });
});

module.exports = { getProducts, getSingleProduct };