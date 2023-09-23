const productbidModel = require("../../Model/Bid/Productbid");

class productbid {
  async postproductbid(req, res) {
    let { bidamount, buyerId, productId, vendorId } = req.body;

    try {
      let newproductbid = new productbidModel({
        bidamount,
        buyerId,
        productId,
        vendorId,
      });
      let save = newproductbid.save();
      if (save) {
        return res.status(200).json({ success: "Bid Added" });
      } else {
        return res.status(500).json({ Error: "Something wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getproductbid(req, res) {
    const productbid = await productbidModel.find({});
    if (productbid) {
      return res.status(200).json({ productbid: productbid });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }
}

const bidproductController = new productbid();
module.exports = bidproductController;
