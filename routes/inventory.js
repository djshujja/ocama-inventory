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

// router.delete('/:productId', async (req , res) => {
    
//     const product = Product.findOne({productId: req.params.productId})

//     if(product == null || product "") {
//       return res.status(404).send(`No product with ID: ${req.params.productId} is found in the database!`)
//     }
//   }
// )

router.delete('/:productId', async (req, res) =>{
  const product = await Product.findOne({productId: req.params.productId})

    if(product == null || product == "" ) {
      return res.status(404).send(`No product with ID: ${req.params.productId} is found in the database!`)
    }

    try {
      product.delete()
      res.send({
        data: product,
        message: "Product is has been successfully deleted!"
        

      })



    } catch (e) {
      res.status(500).send(e)
    }

})



router.get('/:productId', async (req, res) => {
  const product = await Product.findOne({productId: req.params.productId})
  if(product == null  || product == ""){
    return res.send(`No Product have been found with ${req.body.params} ID on database.`)
  }
  try {
    res.send(product)
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router;
