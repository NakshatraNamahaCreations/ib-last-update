const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceProductList = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "vendorprofile",
  },
  serviceSubcatagoryName: {
    type: String,
  },
  serviceCatagoryName: {
    type: String,
  },
  serviceProductName: {
    type: String,
  },
  serviceProductPrice: {
    type: Number,
  },
  serviceProductImage: {
    type: String,
  },
  serviceProductDescription: {
    type: String,
  },
  serviceProductQuantity: {
    type: String,
  },
  serviceProductRange: {
    type: Number,
  },
  serviceProductStatus: {
    type: String,
  },
  serviceProductBrand: {
    type: String,
  },
  serviceProductSize: {
    type: String,
  },
  serviceProductDiscount: {
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

const ServiceProductListModal = mongoose.model(
  "ServiceProducts",
  ServiceProductList
);
module.exports = ServiceProductListModal;
