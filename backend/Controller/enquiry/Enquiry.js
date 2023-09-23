const enquiryModel = require("../../Model/enquiry/Enquiry");

class Enquiry {
  async postenquiry(req, res) {
    let { discription, buyerId, vendorId, product } = req.body;

    try {
      let newenquiry = new enquiryModel({
        discription: discription,
        buyerId: buyerId,
        vendorId: vendorId,
        product: product,
      });
      let save = newenquiry.save();
      if (save) {
        return res.status(200).json({ success: "Enquiry Added" });
      } else {
        return res.status(500).json({ Error: "Something wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getenquiry(req, res) {
    const enquiry = await enquiryModel.find({});
    if (enquiry) {
      return res.status(200).json({ success: enquiry });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }
}

const enquiryController = new Enquiry();
module.exports = enquiryController;
