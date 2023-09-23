const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorUpdate = new Schema({
  userId: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  alternativeNumber: {
    type: Number,
  },
  aadhaarNumber: {
    type: String,
  },
  panNumber: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  selfie: {
    type: String,
  },
  distric: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  state: {
    type: String,
  },
  businessName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
  },
  businesstype: {
    type: String,
  },
  adharfrontendimg: {
    type: String,
  },
  adharbackendimg: {
    type: String,
  },
  panimg: {
    type: String,
  },
  selfie: {
    type: String,
  },
  customNumber: {
    type: String,
    require: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  checkbox: {
    type: Boolean,
  },
  websiteaddress: {
    type: String,
  },
  gst: {
    type: String,
  },
  accountname: {
    type: String,
  },
  accountnumber: {
    type: String,
  },
  categoryname: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  referalCode: {
    type: String,
  },
  myreferalCode: {
    type: String,
  },
  ProductLimits: {
    type: Number,
  },
  vendorstatus: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const VendorUpdateModel = mongoose.model("vendorupdate", VendorUpdate);
module.exports = VendorUpdateModel;
