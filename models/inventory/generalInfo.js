const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  refNo: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
    required: true,
  },
  nameAddress: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Ginfo", infoSchema);
