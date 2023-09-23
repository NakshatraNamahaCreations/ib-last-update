const SuperAdminModel = require("../../Model/auth/superAdminAuth");
const bcrypt = require("bcryptjs");

class SuperAdmin {
  async createSuperAdmin(req, res) {
    try {
      const { name, mobileNumber, password, role, confirmPassword, email } =
        req.body;
      if (!name || !mobileNumber || !password || !confirmPassword || !email) {
        console.log("All fields are required");
        return res.status(500).json({ error: "All fields are required" });
      }
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return res.status(500).json({ error: "Passwords do not match" });
      }
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // Save to the database
      const newSuperAdmin = new SuperAdminModel({
        name,
        mobileNumber,
        // password: hashedPassword,
        password,
        email,
        role,
      });
      const savedSuperAdmin = await newSuperAdmin.save();
      if (savedSuperAdmin) {
        return res.status(201).json({ success: "Account Created" });
      } else {
        return res.status(500).json({ error: "Failed to create account" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async superAdminLogin(req, res) {
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
      const user = await SuperAdminModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or invalid password" });
      }
      // const passwordMatch = bcrypt.compareSync(password, user.password);
      // if (!passwordMatch) {
      //   return res.status(401).json({ error: "Invalid password" });
      // }
      await SuperAdminModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async superAdminChangePassword(req, res) {
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
        await SuperAdminModel.findOne(/* Add your condition to identify the user */);
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
      await SuperAdminModel.findOneAndUpdate(
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
    SuperAdminModel.findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
      .then(() => {
        res.json({ Success: "Signout Successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      });
  }
}

const SuperAdminController = new SuperAdmin();
module.exports = SuperAdminController;
