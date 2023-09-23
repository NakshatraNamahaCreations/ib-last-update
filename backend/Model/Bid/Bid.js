const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Bid = new Schema({
  bidamount: {
    type: String,
  },
  buyerId: {
    type: ObjectId,
  },
  productId: {
    type: Array,
  },
  vendorId: {
    type: String,
  },
});

const bidModel = mongoose.model("bid", Bid);
module.exports = bidModel;
