const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Subcatagory = new Schema({
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
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
  catagoryName: {
    type: String,
  },
  businesstype: {
    type: String,
  },
});

const SubcatagoryModel = mongoose.model("subcatagory", Subcatagory);
module.exports = SubcatagoryModel;
