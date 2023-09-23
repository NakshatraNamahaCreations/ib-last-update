const express = require("express");
const router = express.Router();
const SubAdminController = require("../../Controller/auth/SubAdminAuth");

router.post("/createsubadmin", SubAdminController.createSubAdmin);
router.post("/subadminlogin", SubAdminController.SubAdminLogin);
router.get("/subadminsignout/:id", SubAdminController.getSignout);
router.get("/getallsubadmins", SubAdminController.getAllSubAdmins);
router.post("/deletesubadmin/:adminid", SubAdminController.deleteSubAdmin);
router.put("/giverightsforsubadmin/:userId", SubAdminController.giveRights);
router.post(
  "/subadminchangepassword",
  SubAdminController.SubAdminChangePassword
);

module.exports = router;
