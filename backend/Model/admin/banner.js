const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const banner = new Schema({
  bannerImage: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  content: {
    type: String,
  },
});

const bannerModel = mongoose.model("banner", banner);
module.exports = bannerModel;
