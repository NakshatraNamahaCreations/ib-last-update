const postModel = require("../../Model/Post/Post");

class Post {
  async postreq(req, res) {
    let { productname, productcatagory, quantity, location, buyerId } =
      req.body;

    try {
      let newpost = new postModel({
        productname,
        productcatagory,
        quantity,
        location,
        buyerId,
      });
      let save = newpost.save();
      if (save) {
        return res.status(200).json({ success: "Bid Added" });
      } else {
        return res.status(500).json({ Error: "Something wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getpost(req, res) {
    const post = await postModel.find({});
    if (post) {
      return res.status(200).json({ post: post });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }
}

const postController = new Post();
module.exports = postController;
