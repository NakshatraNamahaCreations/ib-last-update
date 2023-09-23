const SubAdminModel = require("../../Model/auth/SubAdminAuth");
const bcrypt = require("bcryptjs");

class SubAdmin {
  async createSubAdmin(req, res) {
    try {
      const { name, mobileNumber, password, role, email, responsibilities } =
        req.body;
      if (!name || !mobileNumber || !password || !email) {
        console.log("All fields are required");
        return res.status(500).json({ error: "All fields are required" });
      }
      const phone = await SubAdminModel.findOne({ mobileNumber: mobileNumber });
      if (phone) {
        return res.status(500).json({ error: "Mobile number already exits" });
      }
      const checkEmail = await SubAdminModel.findOne({ email: email });
      if (checkEmail) {
        return res.status(500).json({ error: "Email Already exits" });
      }
      const newSubAdmin = new SubAdminModel({
        name,
        mobileNumber,
        password,
        email,
        role, //2
        responsibilities,
      });
      const savedSubAdmin = await newSubAdmin.save();
      if (savedSubAdmin) {
        return res.status(200).json({ success: "Account Created" });
      } else {
        return res.status(500).json({ error: "Failed to create account" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async SubAdminLogin(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await SubAdminModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or invalid password" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await SubAdminModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async SubAdminChangePassword(req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          error:
            "Please enter old password, new password, and confirm password",
        });
      }

      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ error: "New password and confirm password do not match" });
      }

      const user =
        await SubAdminModel.findOne(/* Add your condition to identify the user */);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid old password" });
      }

      // Hash the new password before updating
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

      // Update the user's password
      await SubAdminModel.findOneAndUpdate(
        /* Add your condition to identify the user */
        {
          password: hashedNewPassword,
          passwordChangedAt: new Date(), // Add this line to update the timestamp
        }
      );

      return res.json({ success: "Password Changed Successfully" });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSignout(req, res) {
    const signoutId = req.params.id;
    if (!signoutId) {
      return res.status(400).json({ error: "Invalid signout ID" });
    }
    SubAdminModel.findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
      .then(() => {
        res.json({ Success: "Signout Successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      });
  }

  async getAllSubAdmins(req, res) {
    try {
      let subadmins = await SubAdminModel.find({});
      if (subadmins) {
        return res.status(200).json({ allSubAdmin: subadmins });
      } else {
        return res.status(403).json({ error: "Not able to find" });
      }
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async deleteSubAdmin(req, res) {
    try {
      let admin = req.params.adminid;
      const data = await SubAdminModel.deleteOne({ _id: admin });
      if (data) {
        return res.status(200).json({ success: "Deleted Successfully" });
      } else {
        return res
          .status(400)
          .json({ error: "Can't able to delete! Please try again" });
      }
    } catch (error) {
      console.log("error==", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  // give rights
  async giveRights(req, res) {
    try {
      const userData = req.params.userId;
      const {
        bannerAccess,
        vendorManagementAccess,
        buyerManagementAccess,
        productAccess,
        serviceAccess,
        reviewManagementsAccess,
      } = req.body;
      let obj = {};
      // Check if the user exists
      const user = await SubAdminModel.findOne({ _id: userData });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (typeof bannerAccess !== "undefined") {
        obj["bannerAccess"] = bannerAccess;
      }
      if (typeof vendorManagementAccess !== "undefined") {
        obj["vendorManagementAccess"] = vendorManagementAccess;
      }
      if (typeof buyerManagementAccess !== "undefined") {
        obj["buyerManagementAccess"] = buyerManagementAccess;
      }
      if (typeof productAccess !== "undefined") {
        obj["productAccess"] = productAccess;
      }
      if (typeof serviceAccess !== "undefined") {
        obj["serviceAccess"] = serviceAccess;
      }
      if (typeof reviewManagementsAccess !== "undefined") {
        obj["reviewManagementsAccess"] = reviewManagementsAccess;
      }
      let isData = await SubAdminModel.findOneAndUpdate(
        { _id: userData },
        { $set: obj },
        {
          new: true,
        }
      );
      if (isData) {
        return res.status(200).json({ message: "Added", data: isData });
      } else {
        return res.status(500).json({ status: false, msg: "No such profile" });
      }
    } catch (error) {
      console.log("Error in updateprofile : ", error);
      return res.status(403).send({
        message:
          "Something went wrong while adding access. Please try again later.",
      });
    }
  }
}

const SubAdminController = new SubAdmin();
module.exports = SubAdminController;
