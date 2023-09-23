const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuperAdmin = new Schema(
  {
    name: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      enum: [0, 1, 2], // Allow 0, 1, or 2
    },
    oldPassword: {
      type: String,
    },
    newPassword: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
  },
  { timestamps: true }
);

const SuperAdminModel = mongoose.model("SuperAdmin", SuperAdmin);
module.exports = SuperAdminModel;
