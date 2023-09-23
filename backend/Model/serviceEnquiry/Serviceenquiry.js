const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Serviceenquiry = new Schema({
  discription: {
    type: String,
  },
  buyerId: {
    type: ObjectId,
  },
  vendorId: {
    type: String,
  },
  service: {
    type: Array,
  },
});

const ServiceenquiryModel = mongoose.model("serviceenquiry", Serviceenquiry);
module.exports = ServiceenquiryModel;
