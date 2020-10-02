const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const inventoryRouter = require("./routes/inventory");
const generalInfo = require("./routes/generalInfo");
const cors = require("cors");
const path = require("path");

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/inventory", inventoryRouter);
app.use("/slip", generalInfo);
// app.use("view-engine", "html");

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname + "addProducts.html"));
  res.sendFile(path.join(__dirname + "/public/views/addProducts.html"));
});

app.get("/generate-slip", (req, res) => {
  // res.sendFile(path.join(__dirname + "addProducts.html"));
  res.sendFile(path.join(__dirname + "/public/views/generalInfo.html"));
});

app.get("/the-slip", (req, res) => {
  // res.sendFile(path.join(__dirname + "addProducts.html"));
  res.sendFile(path.join(__dirname + "/public/views/slip.html"));
});

app.get("/database", (req, res) => {
  // res.sendFile(path.join(__dirname + "addProducts.html"));
  res.sendFile(path.join(__dirname + "/public/views/database.html"));
});

// let url =
//   "mongodb+srv://testapp:shujja@cluster0.lzutz.mongodb.net/Product?retryWrites=true&w=majority";

let url = "mongodb://localhost/os_inventory";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("open", () => {
  console.log("connected to mongodb");
});

db.on("error", (e) => {
  console.log(e);
});

let port = 8000;
app.listen(process.env.PORT || port, () => {
  console.log(`Listening to ${port}`);
});
