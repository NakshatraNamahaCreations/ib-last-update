const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const serviceBanner = new Schema({
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
  bannerType: {
    type: String,
  },
});

const serviceBannerModel = mongoose.model("serviceBanner", serviceBanner);
module.exports = serviceBannerModel;
