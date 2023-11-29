const catagoryModal = require("../../Model/product/catagory");

class Catagory {
  async Addcatagory(req, res) {
    let { catagoryName } = req.body;
    let file = req.file?.filename;
    try {
      let newCatagory = new catagoryModal({
        catagoryImage: file,
        catagoryName,
        businesstype: "Products",
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select catagory image",
        });
      }
      newCatagory.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "Category Added Successfully" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllcatagory(req, res) {
    try {
      let catagory = await catagoryModal.find({}).sort({ _id: -1 });
      if (catagory) {
        return res.json({ catagory: catagory });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postcategory(req, res) {
    let { businesstype } = req.body;
    let data = await catagoryModal
      .find({
        businesstype,
      })
      .sort({
        _id: -1,
      });

    if (data) {
      return res.json({ catagory: data });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  async deleteCatagory(req, res) {
    let catagory = req.params.catagoryid;
    const data = await catagoryModal.deleteOne({ _id: catagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  // async addCategoriesViaExcelSheet(req, res) {
  //   const catagoryName = req.body;
  //   try {
  //     const categoryList = await catagoryModal.insertMany(catagoryName);

  //     if (categoryList.length > 0) {
  //       return res.json({ success: "Category Added" });
  //     } else {
  //       return res.status(400).json({ error: "Failed to add" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }

  async addCategoriesViaExcelSheet(req, res) {
    const catagoryName = req.body;
    try {
      const categoryList = await catagoryModal.insertMany(catagoryName);

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
      const { catagoryName } = req.body;
      const file = req.file?.filename;

      const findCategory = await catagoryModal.findOne({
        _id: categoryId,
      });
      if (!findCategory) {
        return res.json({ error: "No such record found" });
      }

      findCategory.catagoryName = catagoryName || findCategory.catagoryName;

      if (file) {
        findCategory.catagoryImage = file;
      }

      const updateCategory = await catagoryModal.findOneAndUpdate(
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

const catagoryController = new Catagory();
module.exports = catagoryController;
