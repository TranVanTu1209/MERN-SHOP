const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");

// @desc fetch all products
// @route GET /api/v1/products?keywords=...
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keywords = req.query.keywords
    ? {
        name: {
          $regex: req.query.keywords,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keywords });
  const products = await Product.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc fetch product by id
// @route GET /api/v1/products/:id
// @access public

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews",
    "_id name rating comment createdAt"
  );
  if (product) return res.json(product);
  return res.status(404).json({ msg: "Product not found" });
});

// @desc delete product
// @route DELETE /api/v1/products/:id
// @access Private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    return res.json({ msg: "Deleted product success" });
  }
  return res.status(404).json({ msg: "Product not found" });
});

// @desc update product
// @route POST /api/v1/products
// @access Private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Puma Jacket",
    price: 20,
    category: "Clothing & Fashion",
    description: "Using for winter",
    brand: "PUMA",
    countInStock: 5,
    user: req.user.id,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/519435/02/fv/fnd/IND/fmt/png",
    numReviews: 2,
  });
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).json({ msg: "Server error when creating product" });
  }
});

// @desc update product
// @route PUT /api/v1/products/:id
// @access Private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    category,
    description,
    brand,
    countInStock,
    image,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  product.name = name;
  product.price = price;
  product.category = category;
  product.brand = brand;
  product.countInStock = countInStock;
  product.image = image;
  product.description = description;
  try {
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ msg: "Server error when updating product" });
  }
});

// @desc create product review
// @route PUT /api/v1/products/:id/review
// @access Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id).populate(
    "reviews",
    "_id name rating comment createdAt user"
  );
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );
  if (alreadyReviewed) {
    return res.status(400).json({ msg: "Already been reviewed" });
  }
  const review = new Review({
    user: req.user.id,
    name: req.user.name,
    comment,
    rating: Number(rating),
    createdAt: Date.now(),
  });
  await review.save();
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
    product.reviews.length;
  await product.save();
  res.status(201).json({ msg: "Review added", product: product });
  try {
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ msg: "Server error when updating product" });
  }
});

// @desc fetch product by rating
// @route GET /api/v1/products/top
// @access public

const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(3);
  if (products) return res.json(products);
  return res.status(404).json({ msg: "Products not found" });
});

module.exports = {
  getProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
};
