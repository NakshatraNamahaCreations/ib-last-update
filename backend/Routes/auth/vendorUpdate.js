const express = require("express");
const router = express.Router();
const vendorProfileUpdateController = require("../../Controller/auth/vendorUpdate");

router.post("/updatevendor", vendorProfileUpdateController.UpdatedVendor);
router.get("/getallupdatedvendor", vendorProfileUpdateController.getAllUser);
router.post("/approvevendor/:id", vendorProfileUpdateController.vendorapprove);
router.post(
  "/disapprovevendor/:id",
  vendorProfileUpdateController.vendordisapprove
);

module.exports = router;
