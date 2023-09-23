const express = require("express");
const router = express.Router();
const multer = require("multer");
const serviceBannerController = require("../../Controller/admin/serviceBanner");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/serviceBanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addservicebanner",
  upload.single("bannerImage"),
  serviceBannerController.postbanner
);
router.get("/getservicebanner", serviceBannerController.getbanner);
router.post(
  "/deleteservicebanner/:bannerid",
  serviceBannerController.deletebanner
);
// router.post("/editbanner", adminbannerontroller.editDetails);

module.exports = router;
