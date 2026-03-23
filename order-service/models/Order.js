const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  menuItemId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Preparing", "Delivered", "Cancelled"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);