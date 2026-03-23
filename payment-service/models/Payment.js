const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);