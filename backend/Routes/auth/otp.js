const express = require("express");
const router = express.Router();
const authotpController = require("../../Controller/auth/otp");

router.post("/sendotp", authotpController.sendotp);
router.post("/verifyotp", authotpController.verifyotp);

module.exports = router;
