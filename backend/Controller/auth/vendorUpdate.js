const VendorUpdateModel = require("../../Model/auth/vendorUpdate");

// const jwt = require("jsonwebtoken");
// const generateSeriesNumber = require("../../Config/function");

class vendorProfileUpdate {
  async UpdatedVendor(req, res) {
    try {
      let {
        userId,
        firstname,
        lastname,
        email,
        phoneNumber,
        dob,
        businessName,
        businesstype,
        category,
      } = req.body;
      let data = await VendorUpdateModel({
        userId,
        firstname,
        lastname,
        email,
        phoneNumber,
        dob,
        businessName,
        businesstype,
        category,
      });
      const saveVendor = await data.save();

      if (saveVendor) {
        return res.status(200).json({ Success: "Updated", user: saveVendor });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getAllUser(req, res) {
    try {
      let allUser = await VendorUpdateModel.find({});
      res.json({ vendorprofile: allUser });
    } catch {
      res.status(404);
    }
  }

  async vendorapprove(req, res) {
    let id = req.params.id;
    try {
      await VendorUpdateModel.findOneAndUpdate(
        { _id: id },
        { vendorstatus: "approved" }
      )
        .then((data) => {
          return res.json({ Success: " Vendor registration approved" });
        })
        .catch((err) => {
          return res.status({ error: "Something went wrong" });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async vendordisapprove(req, res) {
    let id = req.params.id;
    try {
      await VendorUpdateModel.findOneAndUpdate(
        { _id: id },
        { vendorstatus: "disapproved" } // Change the status to "disapproved"
      )
        .then((data) => {
          return res.json({ Success: "Vendor registration disapproved" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Something went wrong" }); // Use status code 500 for internal server error
        });
    } catch (error) {
      console.log(error);
    }
  }
}

const vendorProfileUpdateController = new vendorProfileUpdate();
module.exports = vendorProfileUpdateController;
