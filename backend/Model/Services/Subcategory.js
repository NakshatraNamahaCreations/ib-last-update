const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Subcatagoryservices = new Schema({
  SubcatagoryName: {
    type: String,
  },
  SubcatagoryImage: {
    type: String,
  },
  catagoryId: {
    type: ObjectId,
    ref: "catagories",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  businesstype: {
    type: String,
  },
  catagoryName: {
    type: String,
  },
});

const ServicesSubcatagoryModel = mongoose.model(
  "subcatagoryservices",
  Subcatagoryservices
);
module.exports = ServicesSubcatagoryModel;
