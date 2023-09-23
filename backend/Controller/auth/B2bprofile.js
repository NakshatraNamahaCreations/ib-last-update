const BuyerModel = require("../../Model/auth/B2bprofile");
const bcrypt = require("bcryptjs");

class buyerProfile {
  async createprofile(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const existingEmail = await BuyerModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const existingPhone = await BuyerModel.findOne({ password });
      if (existingPhone) {
        return res.status(400).json({ error: "Mobile Number already exists" });
      }
      const newbuyer = new BuyerModel({
        name,
        email,
        password: hashedPassword,
      });
      const saveBuyer = await newbuyer.save();
      console.log(saveBuyer);
      return res
        .status(200)
        .json({ success: "Account created. Please login", user: saveBuyer });
    } catch (error) {
      console.log("Error creating account:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async buyerLogin(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please Enter Your Password" });
      }
      const user = await BuyerModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "user not found or invalid password" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid Password" });
      }
      await BuyerModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login Successful", user });
    } catch (error) {
      console.log("Something went wrong", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async updateProfile(req, res) {
    let id = req.params.id;
    const { name, email } = req.body;
    try {
      const updatedUser = await BuyerModel.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ success: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.log("Error updating profile:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async getAllUser(req, res) {
    try {
      let allUser = await BuyerModel.find({});
      res.json({ buyerProfile: allUser });
    } catch {
      res.status(404);
    }
  }

  async getuser(req, res) {
    let id = req.params.userid;
    let isUser = await BuyerModel.findOne({ _id: id });
    if (isUser) {
      return res.json({ NewUser: isUser });
    }
  }
}

const buyerProfileController = new buyerProfile();
module.exports = buyerProfileController;
