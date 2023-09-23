const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = new Schema({
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
  paymentStatus: {
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
  myReferalCode: {
    type: String,
  },
  referalCode: {
    type: String,
  },
  gst: {
    type: String,
  },
  accountname: {
    type: String,
  },
  packageId: {
    type: String,
  },
  vendorId: {
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
  city: {
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
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const VendorModel = mongoose.model("vendorprofile", Vendor);
module.exports = VendorModel;
