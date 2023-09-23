const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const productBanner = new Schema({
  bannerImage: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  bannerContent: {
    type: String,
  },
  bannerPlacement: {
    type: String,
  },
});

const productBannerModel = mongoose.model("productBanner", productBanner);
module.exports = productBannerModel;
