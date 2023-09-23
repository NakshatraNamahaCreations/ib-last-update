const PackageModel = require("../../Model/Package/Package");

class Package {
  async Addpackage(req, res) {
    let { packageName, userId, packageId, packageprice, packagediscription } =
      req.body;
    let file = req.file?.filename;
    try {
      let newPackage = new PackageModel({
        packageName,
        userId,
        packageId,
        packageprice,
        packagediscription,
        packageImage: file,
      });
      newPackage.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "success" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllpackage(req, res) {
    try {
      const getpackages = await PackageModel.find({});
      if (getpackages) {
        return res.json({ getpackages: getpackages });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
const packageController = new Package();
module.exports = packageController;
