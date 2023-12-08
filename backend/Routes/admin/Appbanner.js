const express = require("express");
const router = express.Router();
const multer = require("multer");
const appbannerontroller = require("../../Controller/admin/Appbanner");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/appbanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postbanner",
  upload.single("appbannerImage"),
  appbannerontroller.postbannerr
);
router.get("/addgetbanner", appbannerontroller.getbannerr);
router.post("/deletebanner/:bannerid", appbannerontroller.deletebannerr);
// router.post("/editbanner", adminbannerontroller.editDetails);

module.exports = router;
