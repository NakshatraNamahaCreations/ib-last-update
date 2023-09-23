const express = require("express");
const router = express.Router();
const bidproductController = require("../../Controller/Bid/Productbid");

router.post("/addproductbid", bidproductController.postproductbid);
router.get("/getproductbid", bidproductController.getproductbid);

module.exports = router;
