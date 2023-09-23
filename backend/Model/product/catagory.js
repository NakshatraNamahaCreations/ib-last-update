const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Catagory = new Schema({
  catagoryName: {
    type: String,
  },
  catagoryImage: {
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

const CatagoryModel = mongoose.model("catagory", Catagory);
module.exports = CatagoryModel;
