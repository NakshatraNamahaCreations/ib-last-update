const express = require("express");
const router = express.Router();
const SuperAdminController = require("../../Controller/auth/superAdminAuth");

router.post("/superadminregister", SuperAdminController.createSuperAdmin);
router.post("/superadminlogin", SuperAdminController.superAdminLogin);
router.get("/superadminsignout/:id", SuperAdminController.getSignout);
router.put(
  "/updatesuperadminprofile/:id",
  SuperAdminController.updateSuperAdminProfile
);
router.post(
  "/superadminchangepassword/:userId",
  SuperAdminController.superAdminChangePassword
);

module.exports = router;
