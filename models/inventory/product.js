const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ["KG", "Packets", "No."],
    default: "No.",
  },
  unitPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  purchasedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Products", productSchema);
