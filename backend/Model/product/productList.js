const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const ProductList = new Schema({
  catagoryId: {
    type: ObjectId,
    ref: "catagories",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendorprofile", // Reference to Vendor model
  },
  subcatagoryId: {
    type: ObjectId,
    ref: "subcatagories",
  },
  SubcatagoryName: {
    type: String,
  },
  catagoryName: {
    type: String,
  },
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productImage: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productQuantity: {
    type: Number,
  },
  productStatus: {
    type: String,
  },
  productBrand: {
    type: String,
  },
  productSize: {
    type: String,
  },
  productDiscount: {
    type: String,
  },
  productRange: {
    type: Number,
  },
  productvalue: {
    type: String,
  },
  serviceProductMinRange: {
    type: Number,
  },
  serviceProductMaxRange: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductListModel = mongoose.model("ProductList", ProductList);
module.exports = ProductListModel;
