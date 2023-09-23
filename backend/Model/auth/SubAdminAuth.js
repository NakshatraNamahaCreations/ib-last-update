const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubAdmin = new Schema(
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
      default: 2, // 1-admin  2 - sub admin
    },
    responsibilities: {
      type: String,
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

    // give access
    bannerAccess: {
      type: Boolean,
    },
    vendorManagementAccess: {
      type: Boolean,
    },
    buyerManagementAccess: {
      type: Boolean,
    },
    productAccess: {
      type: Boolean,
    },
    serviceAccess: {
      type: Boolean,
    },
    reviewManagementsAccess: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const SubAdminModel = mongoose.model("subadmin", SubAdmin);
module.exports = SubAdminModel;
