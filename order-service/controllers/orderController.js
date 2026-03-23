const Order = require("../models/Order");
const axios = require("axios");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customerId, restaurantId, menuItemId, quantity } = req.body;

    const customerResponse = await axios.get(
      `http://localhost:5001/api/customers/${customerId}`
    );

    if (!customerResponse.data) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const restaurantResponse = await axios.get(
      `http://localhost:5002/api/restaurants/${restaurantId}`
    );

    if (!restaurantResponse.data) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuResponse = await axios.get(
      `http://localhost:5003/api/menu/${menuItemId}`
    );

    if (!menuResponse.data) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const price = menuResponse.data.price;
    const totalPrice = price * quantity;

    const order = new Order({
      customerId,
      restaurantId,
      menuItemId,
      quantity,
      totalPrice,
      status: "Pending"
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(400).json({
      message: error.response?.data?.message || error.message
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};