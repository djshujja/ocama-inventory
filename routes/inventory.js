const express = require("express");
const Product = require("../models/inventory/product");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({}).select("-__v -_id");

  try {
    if (products == null || products == "") {
      return res.send({ message: "No products found" });
    }
    res.send(products);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: "Error Occured on server!",
    });
  }
});

router.post("/", async (req, res) => {
  const { productId, name, qty, unit, unitPrice, purchasedPrice } = req.body;

  try {
    const newProduct = new Product({
      productId: productId,
      name: name,
      qty: qty,
      unit: unit,
      unitPrice: unitPrice,
      purchasedPrice: purchasedPrice,
    });

    await newProduct.save();

    res.send({
      data: newProduct,
      message: "Your data has been successfully saved on database! :)",
    });
  } catch (e) {
    res.status(400).send({
      error: e,
      message: "Error Occured on server!",
    });
  }
});

module.exports = router;
