const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductPost = new Schema({
  productname: {
    type: String,
  },
  productcatagory: {
    type: String,
  },
  quantity: {
    type: String,
  },
  location: {
    type: String,
  },
  buyerId: {
    type: String,
  },
});

const ProductPostModel = mongoose.model("productpost", ProductPost);
module.exports = ProductPostModel;
