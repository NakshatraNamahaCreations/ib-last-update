const otpModel = require("../../Model/auth/otp");
const userModel = require("../../Model/auth/vendorProfile");
const axios = require("axios");

class Otp {
  async sendotp(req, res) {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: "No phone number provided" });
    }

    const authorization =
      "ibuXkkgS8CqjW2mQmqWdMxRUQe01H6t9IyHza8fJoOwCEZW8uPMPCWBMUSWE";
    const route = "dlt";
    const sender_id = "IBVSMS";
    const variables_values = "0000|";

    try {
      const existingOTP = await otpModel.findOne({ phoneNumber });

      if (existingOTP) {
        return res.json({ otp: existingOTP.otp });
      } else {
        const otp = (Math.floor(Math.random() * 1000000) + 1000000)
          .toString()
          .substring(1);
        let newOTP = new otpModel({ phoneNumber, otp });
        await newOTP.save();

        const message = `Your OTP is: ${otp}`;
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${authorization}&route=${route}&sender_id=${sender_id}&message=${message}&variables_values=${variables_values}&flash=0&numbers=${phoneNumber}`;

        try {
          const response = await axios.get(url);

          if (response.status === 200) {
            return res.json({ otp });
          } else {
            return res
              .status(response.status)
              .json({ error: "Failed to send OTP" });
          }
        } catch (error) {
          return res.status(500).json({ error: "Error sending OTP" });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
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
          let user = await userModel.findOneAndUpdate(
            {
              phoneNumber: phoneNumber,
            },
            { status: "online" }
          );
          console.log(user);
          return res.json({ success: "otp verified", user: user });
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
