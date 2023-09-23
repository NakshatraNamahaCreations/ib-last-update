const express = require("express");
const router = express.Router();
const multer = require("multer");
const productBannerController = require("../../Controller/admin/productBanner");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/productBanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addproductbanner",
  upload.single("bannerImage"),
  productBannerController.postbanner
);
router.get("/getproductbanner", productBannerController.getbanner);
router.post(
  "/deleteproductbanner/:bannerid",
  productBannerController.deletebanner
);
// router.post("/editbanner", adminbannerontroller.editDetails);

module.exports = router;
