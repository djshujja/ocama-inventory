const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    // required: true,
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
    // required: true,
    default: 0,
  },
  purchasedPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  partyName: {
    type: String,
    required: true,
  },
  personToContact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date,
    required: true,
  },
  refNo: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
