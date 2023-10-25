const otpModel = require("../../Model/auth/otp");
const userModel = require("../../Model/auth/vendorProfile");
const axios = require("axios");

class Otp {
  // async sendotp(req, res) {
  //   const { phoneNumber } = req.body;

  //   if (!phoneNumber) {
  //     return res.json({ error: "No Number" });
  //   } else {
  //     try {
  //       const authkey =
  //         "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
  //       const otp = Math.floor(1000 + Math.random() * 9000);
  //       const message = `160430 ${otp}.`;
  //       const sender_id = "IBVSMS";

  //       const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authkey}&route=dlt&sender_id=${sender_id}&message=${message}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;

  //       const response = await axios.get(url);
  //       const newOTP = new otpModel({ phoneNumber, otp });
  //       await newOTP.save();
  //       console.log("Response:", response.data);
  //       return res.json({ success: true, message: "OTP sent successfully." });
  //     } catch (error) {
  //       console.error("Error:", error);
  //       return res.status(500).json({ error: "Failed to send OTP." });
  //     }
  //   }
  // }

  async sendotp(req, res) {
    try {
      const { phoneNumber } = req.body;

      if (!phoneNumber) {
        return res.status(400).json({ error: "No Number" });
      }
      const authkey =
        "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log("first", otp);
      const message = `160430 ${otp}.`;
      const sender_id = "IBVSMS";

      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authkey}&route=dlt&sender_id=${sender_id}&message=${message}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;

      const response = await axios.get(url);

      console.log(phoneNumber);

      if (response.status === 200) {
        const newOTP = new otpModel({
          phoneNumber: phoneNumber,
          otp: otp,
        });
        await newOTP.save();
        res.json({ success: true, message: "OTP sent successfully." });
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to send OTP." });
    }
  }

  // async sendotp1(req, res) {
  //   const { phoneNumber } = req.body;
  //   const user = await userModel.findOne({ phoneNumber: phoneNumber });

  //   if (!phoneNumber) {
  //     return res.json({ error: "No Number" });
  //   } else if (!user) {
  //     return res.status(404).json({ error: "User not found! please register" });
  //   } else {
  //     try {
  //       const authkey =
  //         "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
  //       const otp = Math.floor(1000 + Math.random() * 9000);
  //       const message = `160430 ${otp}.`;
  //       const sender_id = "IBVSMS";

  //       const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authkey}&route=dlt&sender_id=${sender_id}&message=${message}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;

  //       const response = await axios.get(url);

  //       const newOTP = new otpModel({ phoneNumber, otp });
  //       await newOTP.save();

  //       console.log("Response:", response.data);
  //       return res.json({ success: true, message: "OTP sent successfully." });
  //     } catch (error) {
  //       console.error("Error:", error);
  //       return res.status(500).json({ error: "Failed to send OTP." });
  //     }
  //   }
  // }

  async sendotp1(req, res) {
    try {
      const { phoneNumber } = req.body;

      // Validate phone number format (you may want to use a more robust validation library)
      if (!/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ error: "Invalid phone number format" });
      }

      const user = await userModel.findOne({ phoneNumber });

      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found. Please register." });
      }

      const authkey =
        "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
      const otp = Math.floor(1000 + Math.random() * 9000);
      const message = `160430 ${otp}.`;
      const sender_id = "IBVSMS";

      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authkey}&route=dlt&sender_id=${sender_id}&message=${message}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;

      const response = await axios.get(url);

      const newOTP = new otpModel({ phoneNumber: phoneNumber, otp });
      await newOTP.save();

      console.log("Response:", response.data);

      res.json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to send OTP." });
    }
  }

  async verifyotp1(req, res) {
    const { otp, phoneNumber } = req.body;
    console.log(otp, phoneNumber);
    if (!otp) {
      return res.json({ error: "enter otp" });
    } else {
      try {
        let verify = await otpModel.findOne({
          otp: otp,
          phoneNumber: phoneNumber,
        });

        if (verify) {
          return res.json({ success: "otp verified" });
        } else {
          return res.status(500).json({ error: "enter valid otp" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }
    }
  }

  async verifyotp(req, res) {
    const { otp, phoneNumber } = req.body;

    console.log(otp, phoneNumber);
    if (!otp) {
      return res.json({ error: "enter otp" });
    } else {
      try {
        const customer = await userModel.findOne({
          phoneNumber: phoneNumber,
        });

        if (!customer) {
          console.log("user not found");
          return res
            .status(404)
            .json({ error: "User not found! please register" });
        } else {
          const storedOtp = await otpModel.findOne({ otp: otp });
          if (!storedOtp) {
            return res.status(404).json({ error: "OTP not found" });
          }

          if (otp === storedOtp.otp.toString()) {
            console.log("storedOtp.otp.toString()", storedOtp.otp.toString());

            return res.json({ success: "OTP verified", user: customer });
          } else {
            return res.status(400).json({ error: "Invalid OTP" });
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }
    }
  }
}

const authotpController = new Otp();
module.exports = authotpController;
