const express = require("express");
const router = express.Router();
const SubCatagoryserviceController = require("../../Controller/Services/Subcategory");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/servicesubcatagory");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addsubcatagoryservices",
  upload.single("SubcatagoryImage"),
  SubCatagoryserviceController.AddSubcatagoryservices
);
router.get(
  "/getsubcatagoryservices",
  SubCatagoryserviceController.getsubcategoryservices
);
router.get(
  "/getSubcategoriesByCategoryservices/:categoryId",
  SubCatagoryserviceController.getSubcategoriesservicesByCategory
);
router.post(
  "/addservicesubcatogoriesviaexcelesheet",
  SubCatagoryserviceController.addServiceSubCategoriesViaExcelSheet
);
router.get(
  "/getallsubcatagoryservices",
  SubCatagoryserviceController.getAllSubcatagoryservice
);
router.post(
  "/postsubcatagoryservices",
  SubCatagoryserviceController.postsubcategory
);
router.post(
  "/deletesubcatagoryservices/:subcatagoryid",
  SubCatagoryserviceController.deleteSubCatagory
);
router.post(
  "/updateservicesubcategory/:id",
  upload.single("SubcatagoryImage"),
  SubCatagoryserviceController.updateSubcategory
);
module.exports = router;
