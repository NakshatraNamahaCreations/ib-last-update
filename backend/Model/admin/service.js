const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const service = new Schema({
  serviceImage: {
    type: String,
  },
  content: {
    type: String,
  },
});

const serviceModel = mongoose.model("service", service);
module.exports = serviceModel;
