const ServiceenquiryModel = require("../../Model/serviceEnquiry/Serviceenquiry");

class Enquiry {
  async postserviceenquiry(req, res) {
    let { discription, buyerId, vendorId, service } = req.body;

    try {
      let newenquiry = new ServiceenquiryModel({
        discription: discription,
        buyerId: buyerId,
        vendorId: vendorId,
        service: service,
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

  async getserviceenquiry(req, res) {
    try {
      const serviceenquiry = await ServiceenquiryModel.find({});
      if (serviceenquiry) {
        return res.status(200).json({ success: serviceenquiry });
      } else {
        return res.status(403).json({ error: "not able to find" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const ServiceenquiryController = new Enquiry();
module.exports = ServiceenquiryController;
