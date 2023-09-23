const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const enquiry = new Schema({
  discription: {
    type: String,
  },
  buyerId: {
    type: ObjectId,
  },
  vendorId: {
    type: String,
  },
  product: {
    type: Array,
  },
});

const enquiryModel = mongoose.model("enquiry", enquiry);
module.exports = enquiryModel;
