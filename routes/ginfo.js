const express = require("express");
const Ginfo = require("../models/inventory/ginfo");

const router = express.Router();

router.get("/", async (req, res) => {
  // const products = await Product.find({}).select("-__v -_id");
  // try {
  //   if (products == null || products == "") {
  //     return res.send({ message: "No products found" });
  //   }
  //   res.send(products);
  // } catch (e) {
  //   res.status(500).send({
  //     error: e,
  //     message: "Error Occured on server!",
  //   });
  // }
});

router.post("/", async (req, res) => {
  const { refNo, ref, nameAddress } = req.body;

  try {
    const dataInfo = new Ginfo({
      refNo: refNo,
      ref: ref,
      nameAddress: nameAddress,
    });

    await dataInfo.save();

    res.send({
      data: dataInfo,
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

module.exports = router;
