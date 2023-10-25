const moment = require("moment/moment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otp = new Schema({
  otp: {
    type: Number,
    required: true,
    // maxlength: 6,
  },
  phoneNumber: {
    type: Number,
    required: true,
    // trim: true,
    // index: { unique: true },
    match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
  },
  type: {
    type: String,
    // required: true,
    // maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60, // Expires documents after 60 seconds
  },
});

otp.virtual("formattedCreatedAt").get(function () {
  return moment(this.createdAt).format("YYYY-MM-DD HH:mm:ss");
});

const otpModel = mongoose.model("otp", otp);
module.exports = otpModel;
