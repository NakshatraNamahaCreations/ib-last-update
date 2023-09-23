const express = require("express");
const router = express.Router();
const catagoryserviceController = require("../../Controller/Services/Category");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/ServiceCategory");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addservicecatagory",
  upload.single("categoryimage"),
  catagoryserviceController.Addcatagoryservices
);
router.get(
  "/getservicecatagory",
  catagoryserviceController.getAllcatagoryservices
);
router.post(
  "/deleteservicecatagory/:catagoryid",
  catagoryserviceController.deleteserviceCatagory
);
router.post("/postsercat", catagoryserviceController.postcategory);
router.put(
  "/updateservicecategory/:id",
  upload.single("categoryimage"),
  catagoryserviceController.updateCategory
);

module.exports = router;
