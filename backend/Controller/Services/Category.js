const ServiceCategoryModel = require("../../Model/Services/Category");

class Catagory {
  async Addcatagoryservices(req, res) {
    let { categoryname, userId } = req.body;
    let file = req.file?.filename;
    try {
      let newCatagory = new ServiceCategoryModel({
        categoryimage: file,
        categoryname,
        businesstype: "Services",
        userId,
      });
      let newData = newCatagory.save();
      if (newData) {
        return res
          .status(200)
          .send({ message: `Category Added`, success: "success" });
      } else {
        throw Error("Not Able To Save Data");
      }
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .json({ Error: `Unable to add the catagory! Try again...` });
      // .json({ Error: `Error in Saving Catagories ${error}` });
    }
  }

  async getAllcatagoryservices(req, res) {
    try {
      let categoryservices = await ServiceCategoryModel.find({}).sort({
        _id: -1,
      });
      if (categoryservices) {
        return res.json({ categoryservices: categoryservices });
      } else {
        return res.json({ message: "No Services Found" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postcategory(req, res) {
    let { businesstype } = req.body;
    let data = await ServiceCategoryModel.find({
      businesstype,
    }).sort({
      _id: -1,
    });

    if (data) {
      return res.json({ categoryservices: data });
    }
  }

  async deleteserviceCatagory(req, res) {
    let catagory = req.params.catagoryid;
    const data = await ServiceCategoryModel.deleteOne({ _id: catagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  async addSerivceCategoriesViaExcelSheet(req, res) {
    const categoryname = req.body;
    try {
      const categoryList = await ServiceCategoryModel.insertMany(categoryname);

      if (categoryList.length > 0) {
        return res.json({ success: "Category Added" });
      } else {
        return res.status(400).json({ error: "Failed to add" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const { categoryname } = req.body;
      const file = req.file?.filename;

      const findCategory = await ServiceCategoryModel.findOne({
        _id: categoryId,
      });
      if (!findCategory) {
        return res.json({ error: "No such record found" });
      }
      //
      findCategory.categoryname = categoryname || findCategory.categoryname;
      if (file) {
        findCategory.categoryimage = file;
      }

      const updateCategory = await ServiceCategoryModel.findOneAndUpdate(
        { _id: categoryId },
        findCategory,
        { new: true } // Return the updated document
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }
}

const catagoryserviceController = new Catagory();
module.exports = catagoryserviceController;
