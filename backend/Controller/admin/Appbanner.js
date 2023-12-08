const appbannerModel = require("../../Model/admin/Appbanner");

class appbanner {
  async postbannerr(req, res) {
    let { content, userId } = req.body;
    let file = req.file?.filename;
    try {
      let newbanner = new appbannerModel({
        appbannerImage: file,
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

  async getbannerr(req, res) {
    const banner = await appbannerModel.find({});
    if (banner) {
      return res.status(200).json({ success: banner });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }

  async deletebannerr(req, res) {
    let banner = req.params.bannerid;
    const data = await appbannerModel.deleteOne({ _id: banner });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const appbannerontroller = new appbanner();
module.exports = appbannerontroller;
