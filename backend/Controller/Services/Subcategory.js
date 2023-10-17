const ServicesSubcatagoryModel = require("../../Model/Services/Subcategory");

class SubCatagory {
  async AddSubcatagoryservices(req, res) {
    let { SubcatagoryName, catagoryName } = req.body;
    let file = req.file?.filename;
    try {
      let newSubCatagory = new ServicesSubcatagoryModel({
        SubcatagoryImage: file,
        SubcatagoryName,
        catagoryName,
        businesstype: "Categoryes",
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select image",
        });
      }
      newSubCatagory.save().then((data) => {
        console.log(data);
        return res.status(200).json({ message: `Subcategory Added` });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .json({ Error: `Unable to add the Subcatagory! Try again...` });
    }
  }

  async getsubcategoryservices(req, res) {
    let subcategory = await ServicesSubcatagoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  // this api for fetching subcategory from  category
  async postsubcategory(req, res) {
    let { catagoryName } = req.body;
    let subcatagoryservices = await ServicesSubcatagoryModel.find({
      catagoryName,
    }).sort({
      _id: -1,
    });
    console.log(subcatagoryservices);
    if (subcatagoryservices) {
      return res.json({ success: subcatagoryservices });
    }
  }

  async addServiceSubCategoriesViaExcelSheet(req, res) {
    const { subcategories } = req.body;
    try {
      const SubcategoryList = await ServicesSubcatagoryModel.insertMany(
        subcategories
      );
      if (SubcategoryList.length > 0) {
        const responseSubcategories = SubcategoryList.map((subcategory) => ({
          SubcatagoryName: subcategory.SubcatagoryName,
          catagoryName: subcategory.catagoryName,
          _id: subcategory._id,
        }));
        return res.json({
          success: "Subcategory Added",
          subcategories: responseSubcategories,
        });
      } else {
        return res.status(400).json({ error: "Failed to add" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSubcategoriesservicesByCategory(req, res) {
    const catagoryname = req.params.categoryId;
    try {
      const subcatagoryservices = await ServicesSubcatagoryModel.find({
        catagoryname,
      }).sort({
        _id: -1,
      });
      if (subcatagoryservices) {
        console.log("catagoryname", catagoryname);
        return res.json({ subcatagoryservices: subcatagoryservices });
      }
    } catch (err) {
      console.log(err);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllSubcatagoryservice(req, res) {
    try {
      let subcatagoryservices = await ServicesSubcatagoryModel.aggregate([
        {
          $lookup: {
            from: "catagories",
            localField: "catagoryId",
            foreignField: "_id",
            as: "catagories",
          },
        },
      ]);
      if (subcatagoryservices) {
        return res.send({ subcatagoryservices: subcatagoryservices });
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
    const data = await ServicesSubcatagoryModel.deleteOne({ _id: subcatagory });
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

      const findSubCategory = await ServicesSubcatagoryModel.findOne({
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

      const updateSubcategory = await ServicesSubcatagoryModel.findOneAndUpdate(
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

const SubCatagoryserviceController = new SubCatagory();
module.exports = SubCatagoryserviceController;
