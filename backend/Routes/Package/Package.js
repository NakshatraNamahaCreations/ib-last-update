const express = require("express");
const router = express.Router();
const packageController = require("../../Controller/Package/Package");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/package");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addpackage",
  upload.single("packageImage"),
  packageController.Addpackage
);
router.get("/getallpackage", packageController.getAllpackage);

module.exports = router;
