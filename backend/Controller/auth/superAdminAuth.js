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

  async updateSuperAdminProfile(req, res) {
    try {
      let userId = req.params.id;
      let { name, mobileNumber, email } = req.body;
      let findUser = await SuperAdminModel.findOne({ _id: userId });
      if (!findUser) {
        return res.json({ error: "User Not Found" });
      }
      findUser.name = name || findUser.name;
      findUser.mobileNumber = mobileNumber || findUser.mobileNumber;
      findUser.email = email || findUser.email;
      const updateUser = await SuperAdminModel.findOneAndUpdate(
        { _id: userId },
        findUser,
        { new: true }
      );
      return res.status(200).json({
        Success:
          "Profile Updated successfully, for better experice please login again",
        user: updateUser,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the profile." });
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
          .json({ error: "User not found or invalid email" });
      }
      if (user.password !== password) {
        return res.status(400).json({ error: "Invalid password" });
      }
      await SuperAdminModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // async superAdminChangePassword(req, res) {
  //   const { oldPassword, newPassword, confirmPassword } = req.body;

  //   try {
  //     if (!oldPassword || !newPassword || !confirmPassword) {
  //       return res.status(400).json({
  //         error:
  //           "Please enter old password, new password, and confirm password",
  //       });
  //     }

  //     if (newPassword !== confirmPassword) {
  //       return res
  //         .status(400)
  //         .json({ error: "New password and confirm password do not match" });
  //     }

  //     // Assuming you have a unique identifier like userId
  //     const userId = req.params.userId; // Adjust this based on your route setup

  //     // Find the user based on the unique identifier
  //     const user = await SuperAdminModel.findOne(userId);

  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     if (oldPassword !== user.password) {
  //       return res.status(401).json({ error: "Invalid old password" });
  //     }

  //     // Update the user's password and passwordChangedAt
  //     await SuperAdminModel.findByIdAndUpdate(userId, {
  //       password: newPassword, // Update the password directly
  //       passwordChangedAt: new Date(),
  //     });

  //     return res.json({ success: "Password Changed Successfully" });
  //   } catch (error) {
  //     console.error("Something went wrong", error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }
  async superAdminChangePassword(req, res) {
    const { userId } = req.params;
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

      // Find the user based on their unique identifier (e.g., user ID)
      const user = await SuperAdminModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (oldPassword !== user.password) {
        return res.status(401).json({ error: "Invalid old password" });
      }

      // Update the user's password and passwordChangedAt
      await SuperAdminModel.findByIdAndUpdate(userId, {
        password: newPassword, // Update the password directly
        passwordChangedAt: new Date(),
      });

      return res.json({ success: "Password Changed Successfully" });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSignout(req, res) {
    try {
      const signoutId = req.params.id;
      if (!signoutId) {
        return res.status(400).json({ error: "Invalid signout ID" });
      }
      await SuperAdminModel.findOneAndUpdate(
        { _id: signoutId },
        { status: "Offline" }
      );
      res.status(200).json({ Success: "Signout Successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}

const SuperAdminController = new SuperAdmin();
module.exports = SuperAdminController;
