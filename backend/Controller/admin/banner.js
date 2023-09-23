const bannerModel = require("../../Model/admin/banner");

class banner {
  async postbanner(req, res) {
    let { content, userId } = req.body;
    let file = req.file?.filename;
    try {
      let newbanner = new bannerModel({
        bannerImage: file,
        content: content,
        userId: userId,
      });
      let save = newbanner.save();
      if (save) {
        return res.status(200).json({ success: "banner Added" });
      } else {
        return res.status(500).json({ Error: "Something wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getbanner(req, res) {
    const banner = await bannerModel.find({});
    if (banner) {
      return res.status(200).json({ success: banner });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }

  async deletebanner(req, res) {
    let banner = req.params.bannerid;
    const data = await bannerModel.deleteOne({ _id: banner });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  // async editDetails(req, res) {
  // 	const { id, content } = req.body;
  // 	try {
  // 		let oldData = await bannerModel.findOneAndUpdate(
  // 			{ _id: id },
  // 			{
  // 				content: content,
  // 			}
  // 		);
  // 		if (oldData) {
  // 			return res.status(200).json({ data: "Content Updated" });
  // 		} else {
  // 			return res.status(500).json({ Error: "Something wrong" });
  // 		}
  // 	} catch (error) {
  // 		console.log(error);
  // 	}
  // }
}

const adminbannerontroller = new banner();
module.exports = adminbannerontroller;
