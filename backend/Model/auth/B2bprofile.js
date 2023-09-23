const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Buyer = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
const BuyerModel = mongoose.model("buyerprofile", Buyer);
module.exports = BuyerModel;
