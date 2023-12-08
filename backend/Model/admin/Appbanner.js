const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const appbanner = new Schema({
  appbannerImage: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  content: {
    type: String,
  },
});

const appbannerModel = mongoose.model("appbanner", appbanner);
module.exports = appbannerModel;
