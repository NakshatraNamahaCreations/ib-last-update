const express = require("express");
const router = express.Router();
const ProductListController = require("../../Controller/product/productList");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/productlist");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addproduct",
  upload.single("productImage"),
  ProductListController.AddProduct
);
router.get("/getcatagory", ProductListController.getcatagory);
router.get("/getproduct", ProductListController.getProduct);
router.get(
  "/getproductswithusersdetails",
  ProductListController.getProductsWithUserDetails
);
router.post("/productsbyuserid", ProductListController.getProductByUserId);
router.post("/productrange/:id", ProductListController.productrange);
router.put("/productapprove/:productId", ProductListController.productApprove);
router.put(
  "/productdisapprove/:productId",
  ProductListController.productDisapprove
);
router.post(
  "/updateproduct/:id",
  upload.single("productImage"),
  ProductListController.updateProduct
);
router.post(
  "/getproductsbysubcategory",
  ProductListController.ProductsBySubcategory
);

router.post("/deleteproduct/:productId", ProductListController.deleteProduct);
module.exports = router;
