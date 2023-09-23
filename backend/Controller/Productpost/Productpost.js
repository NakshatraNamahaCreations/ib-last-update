const ProductPostModel = require("../../Model/Productpost/Productpost");

class ProductPost {
  async productpostreq(req, res) {
    let { productname, productcatagory, quantity, location, buyerId } =
      req.body;

    try {
      let newproductpost = new ProductPostModel({
        productname,
        productcatagory,
        quantity,
        location,
        buyerId,
      });
      let save = newproductpost.save();
      if (save) {
        return res.status(200).json({ success: "Bid Added" });
      } else {
        return res.status(500).json({ Error: "Something wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getproductpost(req, res) {
    const productpost = await ProductPostModel.find({});
    if (productpost) {
      return res.status(200).json({ productpost: productpost });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }
}

const productpostController = new ProductPost();
module.exports = productpostController;
