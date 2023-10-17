const express = require("express");
const router = express.Router();
const catagoryController = require("../../Controller/product/catagory");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/catagory");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addcatagory",
  upload.single("catagoryImage"),
  catagoryController.Addcatagory
);
router.get("/getcatagory", catagoryController.getAllcatagory);
router.post("/deletecatagory/:catagoryid", catagoryController.deleteCatagory);
router.post("/postprocat", catagoryController.postcategory);
router.post(
  "/addcustomersviaexcelesheet",
  catagoryController.addCategoriesViaExcelSheet
);
router.put(
  "/updateproductcategory/:id",
  upload.single("catagoryImage"),
  catagoryController.updateCategory
);

module.exports = router;
