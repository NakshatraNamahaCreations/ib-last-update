const express = require("express");
const router = express.Router();
const ServiceenquiryController = require("../../Controller/serviceEnquiry/Serviceenquiry");

router.post("/addserviceenquiry", ServiceenquiryController.postserviceenquiry);
router.get("/getserviceenquiry", ServiceenquiryController.getserviceenquiry);

module.exports = router;
