const express = require("express");
const router = express.Router();
const SequenceController = require("../../Controller/admin/vendorSequence");

router.post("/updatevendorcodesequence", SequenceController.AddSequence);
router.get("/getsequencecode", SequenceController.getSequence);

module.exports = router;
