const ServiceProductListModal = require("../../Model/Services/serviceProductList");

class ServiceProductList {
  async AddProduct(req, res) {
    let {
      userId,
      serviceSubcatagoryName,
      serviceCatagoryName,
      serviceProductName,
      serviceProductPrice,
      serviceProductRange,
      serviceProductDescription,
      serviceProductBrand,
      serviceProductSize,
      serviceProductStatus,
      serviceProductMaxRange,
      serviceProductMinRange,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newProductList = new ServiceProductListModal({
        userId,
        serviceSubcatagoryName,
        serviceCatagoryName,
        serviceProductName,
        serviceProductPrice,
        serviceProductRange,
        serviceProductDescription,
        serviceProductBrand,
        serviceProductSize,
        serviceProductImage: file,
        serviceProductStatus,
        serviceProductMaxRange,
        serviceProductMinRange,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select product image",
        });
      }
      newProductList.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "success" });
      });
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getServiceProductByUserId(req, res) {
    try {
      let { userId } = req.body;
      const userProducts = await ServiceProductListModal.find({
        userId,
      });
      // .sort({ _id });
      console.log("userProducts", userProducts);
      if (userProducts.length > 0) {
        return res.json({ getUserProduct: userProducts });
      } else {
        return res.json({ getUserProduct: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch user products" });
    }
  }

  async getServiceWithUserDetails(req, res) {
    try {
      const serviceWithUsers = await ServiceProductListModal.find().populate(
        "userId",
        "-password"
      ); // "-password" to exclude the password field

      return res.status(200).json({ serviceWithUsers });
    } catch (error) {
      console.error("Error fetching service details:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching data." });
    }
  }

  async getProductservicelist(req, res) {
    try {
      let service = await ServiceProductListModal.find({});
      if (service) {
        console.log("product", service);
        return res.status(200).json({ service: service });
      } else {
        return res.status(404).json({ message: "No Services Found" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async ProductsBySubcategory(req, res) {
    try {
      let { serviceSubcatagoryName } = req.body;
      const products = await ServiceProductListModal.find({
        serviceSubcatagoryName,
      }).sort({ _id: -1 });
      console.log("Service", products);
      if (products.length > 0) {
        return res.json({ product: products });
      } else {
        return res.json({ product: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch subcategories" });
    }
  }

  async serviceApprove(req, res) {
    try {
      let productId = req.params.productId;
      const updatedProduct = await ServiceProductListModal.findOneAndUpdate(
        { _id: productId },
        { productStatus: "approved" },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error approving product:", error);
      res
        .status(500)
        .json({ error: "An error occurred while approving the product." });
    }
  }

  // async getProductservicelist(req, res) {
  //   try {
  //     let service = await ServiceProductListModal.find({});
  //     if (service) {
  //       console.log("service", service);
  //       return res.json({ service: service });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async serviceDisapprove(req, res) {
    try {
      let productId = req.params.productId;
      const updatedProduct = await ServiceProductListModal.findOneAndUpdate(
        { _id: productId },
        { productStatus: "disapproved" },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error disapproving product:", error);
      res
        .status(500)
        .json({ error: "An error occurred while disapproving the product." });
    }
  }

  async updateService(req, res) {
    try {
      const productId = req.params.id;
      const {
        userId,
        serviceCatagoryName,
        serviceSubcatagoryName,
        serviceProductName,
        serviceProductPrice,
        serviceProductDescription,
        serviceProductBrand,
        serviceProductRange,
        serviceProductMinRange,
        serviceProductMaxRange,
      } = req.body;
      const file = req.file?.filename;
      const existingService = await ServiceProductListModal.findById(productId);
      // Check each field and update only if it has a value
      if (userId) existingService.userId = userId;
      if (serviceCatagoryName)
        existingService.serviceCatagoryName = serviceCatagoryName;
      if (serviceSubcatagoryName)
        existingService.serviceSubcatagoryName = serviceSubcatagoryName;
      if (serviceProductName)
        existingService.serviceProductName = serviceProductName;
      if (serviceProductPrice)
        existingService.serviceProductPrice = serviceProductPrice;

      if (serviceProductMaxRange)
        existingService.serviceProductMaxRange = serviceProductMaxRange;
      if (serviceProductMinRange)
        existingService.serviceProductMinRange = serviceProductMinRange;

      if (serviceProductDescription)
        existingService.serviceProductDescription = serviceProductDescription;

      if (serviceProductRange)
        existingService.serviceProductRange = serviceProductRange;
      if (serviceProductBrand)
        existingService.serviceProductBrand = serviceProductBrand;

      if (file) existingService.serviceProductImage = file;
      const updatedService = await existingService.save();
      return res.json({ success: "Updated", product: updatedService });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the product" });
    }
  }

  async deleteService(req, res) {
    let service = req.params.serviceId;
    try {
      const data = await ServiceProductListModal.deleteOne({ _id: service });
      if (data) {
        return res.status(200).json({ Success: "Deleted Successfully" });
      } else {
        return res.status(200).json({ Error: "Can't able to do" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ Error: "Something went wrong" });
    }
  }
}

const ServiceProductListController = new ServiceProductList();
module.exports = ServiceProductListController;
