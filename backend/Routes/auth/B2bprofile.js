const express = require("express");
const router = express.Router();
const buyerProfileController = require("../../Controller/auth/B2bprofile");

router.post("/buyersignup", buyerProfileController.createprofile);
router.post("/buyersignin", buyerProfileController.buyerLogin);
router.get("/getuser/:userid", buyerProfileController.getuser);
router.get("/getalluser", buyerProfileController.getAllUser);
router.post("/userupdate/:id", buyerProfileController.updateProfile);

module.exports = router;
