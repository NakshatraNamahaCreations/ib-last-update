const express = require("express");
const router = express.Router();
const vendorProfileController = require("../../Controller/auth/vendor");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/signup", upload.any(), vendorProfileController.createAccount);
router.post("/emailcheck", vendorProfileController.createAccount1);
router.post("/login", vendorProfileController.vendorLogin);
router.post("/loginvendor", vendorProfileController.vendorLoginwithvendorcode);

router.post("/loginwithmobile", vendorProfileController.vendorLoginWithMobile);
router.post("/postsubcategory", vendorProfileController.postsubcategory);
router.post(
  "/uploaddocument/:id",
  upload.any(),
  vendorProfileController.uploaddocument
);
router.get("/signout/:id", vendorProfileController.getSignout);
router.get("/getuser/:userid", vendorProfileController.getuser);
router.get("/getalluser", vendorProfileController.getAllUser);
router.get(
  "/getuserswithpaymentsdata",
  vendorProfileController.getUsersWithPaymentsData
);
// router.post("/useredit/:id", vendorProfileController.userupdate);
router.put("/productslimits/:id", vendorProfileController.productsLimites);
router.post("/gstverify", vendorProfileController.gstverify);
router.post("/approvevendor/:id", vendorProfileController.vendorapprove);
router.post("/disapprovevendor/:id", vendorProfileController.vendordisapprove);
router.post("/updateuser/:id", vendorProfileController.approveupdate);
router.post("/delete/:id", vendorProfileController.deletevendor);
router.post("/userupdate/:id", vendorProfileController.updateProfile);
router.put(
  "/updatevendorprofile/:id",
  vendorProfileController.updateVendorsProfile
);

module.exports = router;
