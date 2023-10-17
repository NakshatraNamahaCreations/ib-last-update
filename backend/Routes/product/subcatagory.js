const express = require("express");
const router = express.Router();
const SubCatagoryController = require("../../Controller/product/subcatagory");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/subcatagory");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addsubcatagory",
  upload.single("SubcatagoryImage"),
  SubCatagoryController.AddSubcatagory
);
router.get("/getsubcatagory", SubCatagoryController.getsubcategory);
router.get(
  "/getSubcategoriesByCategory/:categoryId",
  SubCatagoryController.getSubcategoriesByCategory
);
router.put(
  "/updateproductsubcategory/:id",
  upload.single("SubcatagoryImage"),
  SubCatagoryController.updateSubcategory
);
router.post(
  "/addsubcatogoriesviaexcelesheet",
  SubCatagoryController.addSubCategoriesViaExcelSheet
);
router.get("/getallsubcatagory", SubCatagoryController.getAllSubcatagory);
router.post("/postsubcatagory", SubCatagoryController.postsubcategory);
router.post(
  "/deletesubcatagory/:subcatagoryid",
  SubCatagoryController.deleteSubCatagory
);

module.exports = router;
