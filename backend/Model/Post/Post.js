const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
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

const postModel = mongoose.model("post", Post);
module.exports = postModel;
