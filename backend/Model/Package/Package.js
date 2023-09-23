const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Package = new Schema({
  packageName: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  packageId: {
    type: String,
  },
  packageprice: {
    type: String,
  },
  packagediscription: {
    type: String,
  },
  packageImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const PackageModel = mongoose.model("package", Package);
module.exports = PackageModel;
