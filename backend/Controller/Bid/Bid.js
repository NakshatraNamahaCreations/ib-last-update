const bidModel = require("../../Model/Bid/Bid");

class Enquiry {
  async postbid(req, res) {
    let { bidamount, buyerId, productId, vendorId } = req.body;

    try {
      let newbid = new bidModel({
        bidamount,
        buyerId,
        productId,
        vendorId,
      });
      let save = newbid.save();
      if (save) {
        return res.status(200).json({ success: "Bid Added" });
      } else {
        return res.status(500).json({ Error: "Something wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getbid(req, res) {
    const bid = await bidModel.find({});
    if (bid) {
      return res.status(200).json({ bid: bid });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }
}

const bidController = new Enquiry();
module.exports = bidController;
