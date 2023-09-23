const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminbannerontroller = require("../../Controller/admin/banner");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/banner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addbanner",
  upload.single("bannerImage"),
  adminbannerontroller.postbanner
);
router.get("/getbanner", adminbannerontroller.getbanner);
router.post("/deletebanner/:bannerid", adminbannerontroller.deletebanner);
// router.post("/editbanner", adminbannerontroller.editDetails);

module.exports = router;
