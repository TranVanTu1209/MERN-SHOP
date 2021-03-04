const express = require("express");
const {
  getProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} = require("../controllers/product-controllers");
const { protect, admin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.route("/top").get(getTopRatedProducts);
router.route("/:id/review").put(protect, createProductReview);
router.route("/:id").put(protect, admin, updateProduct);
router.route("/:id").delete(protect, admin, deleteProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/").post(protect, admin, createProduct);

module.exports = router;
