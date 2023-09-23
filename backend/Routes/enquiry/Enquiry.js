const express = require("express");
const router = express.Router();
const enquiryController = require("../../Controller/enquiry/Enquiry");

router.post("/addenquiry", enquiryController.postenquiry);
router.get("/getenquiry", enquiryController.getenquiry);

module.exports = router;
