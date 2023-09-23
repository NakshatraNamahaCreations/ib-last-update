const express = require("express");
const router = express.Router();
const productpostController = require("../../Controller/Productpost/Productpost");

router.post("/addproductpost", productpostController.productpostreq);
router.get("/getproductpost", productpostController.getproductpost);

module.exports = router;
