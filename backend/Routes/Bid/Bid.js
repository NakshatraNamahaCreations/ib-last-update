const express = require("express");
const router = express.Router();
const bidController = require("../../Controller/Bid/Bid");

router.post("/addbid", bidController.postbid);
router.get("/getbid", bidController.getbid);

module.exports = router;
