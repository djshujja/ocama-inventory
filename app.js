const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const inventoryRouter = require("./routes/inventory");
var cors = require('cors')


// app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());
app.use(bodyParser.json());

app.use("/inventory", inventoryRouter);

let url =
  "mongodb+srv://testapp:shujja@cluster0.lzutz.mongodb.net/Product?retryWrites=true&w=majority";

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
