const express = require("express");
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/order-controllers");
const { protect } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
