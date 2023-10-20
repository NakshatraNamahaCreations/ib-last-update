const express = require("express");
const router = express.Router();
const authotpController = require("../../Controller/auth/otp");

router.post("/sendotp", authotpController.sendotp);
router.post("/sendotp1", authotpController.sendotp1);
router.post("/verifyotp", authotpController.verifyotp);
router.post("/verifyotp1", authotpController.verifyotp1);

module.exports = router;
