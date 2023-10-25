const productBannerModel = require("../../Model/admin/productBanner");

class banner {
  // async postbanner(req, res) {
  //   let { bannerContent, userId, bannerPlacement, bannerType } = req.body;
  //   let file = req.file?.filename;
  //   try {
  //     let newbanner = new productBannerModel({
  //       bannerImage: file,
  //       bannerContent: bannerContent,
  //       userId: userId,
  //       bannerPlacement: bannerPlacement,
  //     });
  //     let save = newbanner.save();
  //     if (save) {
  //       return res.status(200).json({ success: "banner Added" });
  //     } else {
  //       return res.status(500).json({ Error: "Something wrong" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async postbanner(req, res) {
    const { bannerContent, userId, bannerPlacement, bannerType } = req.body;
    const file = req.file?.filename;
    const errors = [];

    if (!bannerContent) {
      errors.push("Please provide a value for bannerContent.");
    }

    if (!bannerPlacement) {
      errors.push("Please provide a value for bannerPlacement.");
    }

    if (!file) {
      errors.push("Please upload a bannerImage.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        errors,
      });
    }

    try {
      const newbanner = new productBannerModel({
        bannerImage: file,
        bannerContent: bannerContent,
        userId: userId,
        bannerPlacement: bannerPlacement,
      });

      const save = await newbanner.save();

      if (save) {
        return res.status(200).json({ success: "banner Added" });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getbanner(req, res) {
    const banner = await productBannerModel.find({});
    if (banner) {
      return res.status(200).json({ success: banner });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }

  async deletebanner(req, res) {
    let banner = req.params.bannerid;
    const data = await productBannerModel.deleteOne({ _id: banner });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  // async editDetails(req, res) {
  // 	const { id, content } = req.body;
  // 	try {
  // 		let oldData = await productBannerModel.findOneAndUpdate(
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
