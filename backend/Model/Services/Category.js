const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const categoryservices = new Schema({
  categoryname: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  categoryimage: {
    type: String,
  },
  businesstype: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const ServiceCategoryModel = mongoose.model(
  "categoryservices",
  categoryservices
);
module.exports = ServiceCategoryModel;
