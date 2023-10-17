const otpModel = require("../../Model/auth/otp");
const userModel = require("../../Model/auth/vendorProfile");
const axios = require("axios");

class Otp {
  // async sendotp(req, res) {
  //   const { phoneNumber } = req.body;

  //   if (!phoneNumber) {
  //     return res.status(400).json({ error: "No phone number provided" });
  //   }

  //   const authorization =
  //     "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
  //   const route = "dlt";
  //   const sender_id = "IBVSMS";

  //   try {
  //     let otp;
  //     const existingOTP = await otpModel.findOne({ phoneNumber });

  //     if (existingOTP) {
  //       otp = existingOTP.otp;
  //     } else {
  //       otp = (Math.floor(Math.random() * 1000000) + 1000000)
  //         .toString()
  //         .substring(1);
  //       const newOTP = new otpModel({ phoneNumber, otp });
  //       await newOTP.save();
  //     }

  //     const message = `Your OTP is: ${otp}`;
  //     const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authkey}&route=dlt&sender_id=${sender_id}&message=${message}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;

  //     try {
  //       const response = await axios.get(url);

  //       if (response.status === 200) {
  //         return res.json({ success: true, message: "OTP sent successfully" });
  //       } else {
  //         return res
  //           .status(response.status)
  //           .json({ error: "Failed to send OTP" });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       return res.status(500).json({ error: "Error sending OTP" });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }

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
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.json({ error: "No Number" });
    } else {
      try {
        const authkey =
          "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
        const otp = Math.floor(1000 + Math.random() * 9000);
        const message = `160430 ${otp}.`;
        const sender_id = "IBVSMS";

        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authkey}&route=dlt&sender_id=${sender_id}&message=${message}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;

        const response = await axios.get(url);

        const newOTP = new otpModel({ phoneNumber, otp });
        await newOTP.save();

        console.log("Response:", response.data);
        return res.json({ success: true, message: "OTP sent successfully." });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to send OTP." });
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
}

const authotpController = new Otp();
module.exports = authotpController;
