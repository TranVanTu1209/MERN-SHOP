const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc create new order
// @route POST /api/v1/orders
// @access private

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user.id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get order by id
// @route GET /api/v1/orders/:id
// @access private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    if (
      req.user.id.toString() === order.user._id.toString() ||
      req.user.isAdmin
    ) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error("Permission Denied. Can not access this order");
    }
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc update order to paid
// @route PUT /api/v1/orders/:id/pay
// @access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.user.id.toString() !== order.user._id.toString()) {
      res.status(401);
      throw new Error("Permission Denied. Can not access this order");
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get logged in user orders
// @route GET /api/v1/orders/myorders
// @access private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

// @desc get all orders
// @route GET /api/v1/orders
// @access private/admin

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email");
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

// @desc mark order as delivered
// @route PUT /api/v1/orders/:id/deliver
// @access private/admin

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  markOrderAsDelivered,
};
