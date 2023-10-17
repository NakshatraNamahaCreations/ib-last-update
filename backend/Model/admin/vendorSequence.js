const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSequence = new Schema({
  vendorSequenceNumber: {
    type: String,
  },
});

const vendorSequenceModel = mongoose.model("vendorsequence", vendorSequence);
module.exports = vendorSequenceModel;
