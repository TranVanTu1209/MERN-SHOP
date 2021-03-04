const express = require("express");
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  markOrderAsDelivered,
} = require("../controllers/order-controllers");
const { protect, admin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/").get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, markOrderAsDelivered);

module.exports = router;
