const SubcatagoryModel = require("../../Model/product/subCatagory");

class SubCatagory {
  async AddSubcatagory(req, res) {
    let { SubcatagoryName, catagoryName } = req.body;
    let file = req.file?.filename;
    try {
      let newSubCatagory = new SubcatagoryModel({
        SubcatagoryImage: file,
        SubcatagoryName,
        catagoryName,
        businesstype: "Products",
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select image",
        });
      }
      newSubCatagory.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Subcategory Added Successfully" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getsubcategory(req, res) {
    let subcategory = await SubcatagoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  // this api for fetching subcategory from  category
  async postsubcategory(req, res) {
    let { catagoryName } = req.body;
    let subcategory = await SubcatagoryModel.find({ catagoryName }).sort({
      _id: -1,
    });
    console.log(subcategory);
    if (subcategory) {
      return res.json({ success: subcategory });
    }
  }

  async getSubcategoriesByCategory(req, res) {
    const catagoryName = req.params.categoryId;
    try {
      const subcategories = await SubcatagoryModel.find({ catagoryName }).sort({
        _id: -1,
      });
      if (subcategories) {
        console.log("catagoryName", catagoryName);
        return res.json({ subcategories: subcategories });
      }
    } catch (err) {
      console.log(err);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllSubcatagory(req, res) {
    try {
      let AllsubCatagory = await SubcatagoryModel.aggregate([
        {
          $lookup: {
            from: "catagories",
            localField: "catagoryId",
            foreignField: "_id",
            as: "catagories",
          },
        },
      ]);
      if (AllsubCatagory) {
        return res.send({ subcatagory: AllsubCatagory });
      } else {
        return res.status(404).json({ error: "subcatagory didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async deleteSubCatagory(req, res) {
    let subcatagory = req.params.subcatagoryid;
    const data = await SubcatagoryModel.deleteOne({ _id: subcatagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  async updateSubcategory(req, res) {
    try {
      const SubcategoryId = req.params.id;
      const { catagoryName, SubcatagoryName } = req.body;
      const file = req.file?.filename;

      const findSubCategory = await SubcatagoryModel.findOne({
        _id: SubcategoryId,
      });
      if (!findSubCategory) {
        return res.json({ error: "No such record found" });
      }
      //
      findSubCategory.catagoryName =
        catagoryName || findSubCategory.catagoryName;
      findSubCategory.SubcatagoryName =
        SubcatagoryName || findSubCategory.SubcatagoryName;
      if (file) {
        findSubCategory.SubcatagoryImage = file;
      }

      const updateSubcategory = await SubcatagoryModel.findOneAndUpdate(
        { _id: SubcategoryId },
        findSubCategory,
        { new: true } // Return the updated document
      );
      return res.json({
        message: "Updated successfully",
        date: updateSubcategory,
      });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the Subcategory" });
    }
  }
}

const SubCatagoryController = new SubCatagory();
module.exports = SubCatagoryController;
