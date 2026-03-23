const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);