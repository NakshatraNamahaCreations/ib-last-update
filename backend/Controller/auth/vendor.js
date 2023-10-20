const VendorModel = require("../../Model/auth/vendorProfile");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const generateSeriesNumber = require("../../Config/function");

class vendorProfile {
  async createAccount(req, res) {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        alternativeNumber,
        dob,
        address,
        distric,
        pincode,
        state,
        businessName,
        businesstype,
        category,
        checkbox,
        websiteaddress,
        panImage,
        panNumber,
        selfie,
        gst,
        vendorId,
        accountName,
        accountNumber,
        latitude,
        longitude,
        categoryname,
        aadhaarNumber,
        referalCode,
        packageId,
        city,
      } = req.body;

      const file = req.files[0]?.filename;
      const file1 = req.files[1]?.filename;
      const file2 = req.files[2]?.filename;
      // const file3 = req.files[3]?.filename;

      const vendorCount = await VendorModel.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true }
      );

      if (!vendorCount) {
        const newVendorCount = new VendorModel({ count: 1 });
        await newVendorCount.save();
      }

      if (!vendorCount) {
        return res.status(500).json({ error: "An error occurred" });
      }

      const customNumber = `IM2023${vendorCount.count}`;
      const myReferalCode = `REFIM2023${vendorCount.count}`;

      console.log("myReferalCode", myReferalCode);

      const hashedPassword = bcrypt.hashSync(password, 10);

      const existingEmail = await VendorModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const existingPhone = await VendorModel.findOne({ phoneNumber });
      if (existingPhone) {
        return res.status(400).json({ error: "Mobile number already exists" });
      }

      const existinggst = await VendorModel.findOne({ gst });
      if (existinggst) {
        return res.status(400).json({ error: "Gst already exists" });
      }

      const newVendor = new VendorModel({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phoneNumber,
        alternativeNumber,
        dob,
        address,
        distric,
        pincode,
        state,
        businessName,
        businesstype,
        category,
        customNumber,
        referalCode,
        myReferalCode,
        websiteaddress,
        checkbox,
        panImage,
        panNumber,
        selfie,
        gst,
        accountName,
        accountNumber,
        latitude,
        longitude,
        categoryname,
        aadhaarNumber,
        adharfrontendimg: file,
        adharbackendimg: file1,
        panimg: file2,
        vendorId,
        packageId,
        city,
        // selfieImage: file3,
      });

      const savedVendor = await newVendor.save();
      console.log(savedVendor);
      return res
        .status(201)
        .json({ success: "Account created. Please login", user: savedVendor });
    } catch (error) {
      console.error("Error creating account:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async createAccount1(req, res) {
    try {
      const { email, phoneNumber } = req.body;

      const existingEmail = await VendorModel.findOne({ email });
      const existingPhone = await VendorModel.findOne({ phoneNumber });

      if (existingEmail && existingPhone) {
        return res
          .status(400)
          .json({ error: "Email and mobile number already exist" });
      } else if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      } else if (existingPhone) {
        return res.status(400).json({ error: "Mobile number already exists" });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
    // 29AIZPH5569G1ZE
  }

  async gstverify(req, res) {
    try {
      const { gst } = req.body;
      console.log(gst);
      if (gst.length === 15) {
        const existingGst = await VendorModel.findOne({ gst });
        console.log(existingGst);

        if (existingGst) {
          return res.status(200).json({ error: "GST already exists" });
        } else {
          return res.status(400).json({ message: "GST is available" });
        }
      } else {
        return res.status(400).json({ error: "Invalid GST length" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // 29AAACM0829Q1Z0 exits

  async postsubcategory(req, res) {
    let { businesstype } = req.body;
    let vendorprofile = await VendorModel.find({ businesstype }).sort({
      _id: -1,
    });

    if (vendorprofile) {
      return res.json({ vendorprofile: vendorprofile });
    }
  }

  // async vendorLogin(req, res) {
  //   let { email, password } = req.body;
  //   try {
  //     if (!email || !password) {
  //       return res.status(500).json({ error: "Please fill all fields" });
  //     } else {
  //       const data = await VendorModel.findOne({ email: email });
  //       if (!data) {
  //         return res.status(500).json({ error: "Invalid email id" });
  //       } else {
  //         const passcheck = bcrypt.compare(password, data.password);
  //         if (passcheck) {
  //           VendorModel.findOneAndUpdate({ email }, { status: "Online" });
  //           console.log("User Data:", data);
  //           return res
  //             .status(200)
  //             .json({ Success: "Signin successful", user: data });
  //         } else {
  //           return res.status(500).json({ error: "Invalid Password" });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async vendorLogin(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await VendorModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or invalid password" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await VendorModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // async vendorLoginwithvendorcode(req, res) {
  //   const { phoneNumber, customNumber } = req.body; // Extract phoneNumber and customNumber

  //   try {
  //     if (!phoneNumber) {
  //       return res.status(400).json({ error: "Please enter your phoneNumber" });
  //     }
  //     if (!customNumber) {
  //       return res
  //         .status(400)
  //         .json({ error: "Please enter your customNumber" });
  //     }
  //     const user = await VendorModel.findOne({ phoneNumber });
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }
  //     // const passwordMatch = customNumber === user.customNumber;
  //     // if (!passwordMatch) {
  //     //   return res.status(401).json({ error: "Invalid customNumber" });
  //     // }
  //     if (customNumber !== user.customNumber) {
  //       return res.status(401).json({ error: "Invalid customNumber" });
  //     }
  //     await VendorModel.findOneAndUpdate({ phoneNumber }, { status: "Online" });
  //     return res.json({ success: "Login successful", user });
  //   } catch (error) {
  //     console.error("Something went wrong", error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }

  async vendorLoginwithvendorcode(req, res) {
    const { phoneNumber, password } = req.body;
    try {
      if (!phoneNumber) {
        return res.status(400).json({ error: "Please enter your phoneNumber" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await VendorModel.findOne({ phoneNumber });
      if (!user) {
        return res.status(404).json({ error: "invalid Mobile Number" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await VendorModel.findOneAndUpdate({ phoneNumber }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async vendorLoginWithMobile(req, res) {
    const { phoneNumber } = req.body;
    try {
      if (!phoneNumber) {
        return res.status(400).json({ error: "Please enter mobile number" });
      }

      const user = await VendorModel.findOne({ phoneNumber });
      if (!user) {
        return res
          .status(404)
          .json({ error: "Mobile number not found or invalid mobile number" });
      }
      await VendorModel.findOneAndUpdate({ phoneNumber }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async uploaddocument(req, res) {
    try {
      let id = req.params.id;
      let file = req.files[0]?.filename;
      let file1 = req.files[1]?.filename;
      let file2 = req.files[2]?.filename;
      let file3 = req.files[3]?.filename;
      let { aadhaarNumber, panNumber } = req.body;
      let data = await VendorModel.findByIdAndUpdate(
        { _id: id },
        {
          aadhaarNumber,
          panNumber,
          adharfrontendimg: file,
          adharbackendimg: file1,
          panimg: file2,
          selfie: file3,
        }
      );
      if (data) {
        return res.json({ success: "Updated" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSignout(req, res) {
    const signoutId = req.params.id;
    if (!signoutId) {
      return res.status(400).json({ error: "Invalid signout ID" });
    }

    // Simulate an error by trying to find the Vendor with the provided ID
    // Replace this line with your actual database query, which should return a promise
    VendorModel.findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
      .then(() => {
        res.json({ Success: "Signout Successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      });
  }

  // async userupdate(req, res) {
  //   let id = req.params.id;
  //   let { firstname, lastname, email, password, phoneNumber } = req.body;
  //   let data = await VendorModel.findOneAndUpdate(
  //     { _id: id },
  //     {
  //       firstname,
  //       lastname,
  //       email,
  //       password,
  //       phoneNumber,
  //     }
  //   );
  //   if (data) {
  //     return res
  //       .status(200)
  //       .json({ Success: "Account created. Please login", user: data });
  //   }
  // }

  async updateProfile(req, res) {
    let id = req.params.id;
    const { firstname, lastname, email, password, phoneNumber } = req.body;
    try {
      const updatedUser = await VendorModel.findByIdAndUpdate(
        id,
        { firstname, lastname, email, password, phoneNumber },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ success: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.log("Error updating profile:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async approveupdate(req, res) {
    try {
      const vendorId = req.params.id;
      const {
        firstname,
        lastname,
        email,
        dob,
        phoneNumber,
        businessName,
        businesstype,
        category,
      } = req.body;
      const findVendor = await VendorModel.findOne({
        _id: vendorId,
      });
      if (!findVendor) {
        return res.json({ error: "No such record found" });
      }

      findVendor.firstname = firstname || findVendor.firstname;
      findVendor.lastname = lastname || findVendor.lastname;
      findVendor.email = email || findVendor.email;
      findVendor.phoneNumber = phoneNumber || findVendor.phoneNumber;
      findVendor.dob = dob || findVendor.dob;
      findVendor.businessName = businessName || findVendor.businessName;
      findVendor.businesstype = businesstype || findVendor.businesstype;
      findVendor.category = category || findVendor.category;

      let updateVendor = await VendorModel.findOneAndUpdate(
        { _id: vendorId },
        updateVendor,
        { new: true }
      );
      return res.status(200).json({ Success: "Updates", user: updateVendor });
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getAllUser(req, res) {
    try {
      let allUser = await VendorModel.find({});
      res.json({ vendorprofile: allUser });
    } catch {
      res.status(404);
    }
  }

  async getuser(req, res) {
    let id = req.params.userid;
    let isUser = await VendorModel.findOne({ _id: id });
    if (isUser) {
      return res.json({ NewUser: isUser });
    }
  }

  async getUsersWithPaymentsData(req, res) {
    try {
      let User = await VendorModel.aggregate([
        {
          $lookup: {
            from: "paymentgetwaymodels",
            localField: "_id",
            foreignField: "userId",
            as: "PaymentDetails",
          },
        },
      ]);
      if (User) {
        console.log("users with payments details");
        return res.status(200).json({ vendorsPayments: User });
      }
    } catch (error) {
      console.log("Error in getting users with payments");
    }
  }

  // async getUsersWithPaymentsData(req, res) {
  //   try {
  //     const { search } = req.query;
  //     let usersWithPayments = await VendorModel.aggregate([
  //       {
  //         $lookup: {
  //           from: "paymentgetwaymodels",
  //           localField: "_id",
  //           foreignField: "userId",
  //           as: "PaymentDetails",
  //         },
  //       },
  //     ]);
  //     const searchResults = usersWithPayments.filter((item) =>
  //       item.firstname.toLowerCase().includes(search.toLowerCase())
  //     );
  //     if (searchResults.length > 0) {
  //       return res.json({ results: searchResults });
  //     } else {
  //       console.log("No matching users found");
  //       return res.status(404).json({ error: "No matching users found" });
  //     }
  //   } catch (error) {
  //     console.log("Error in getting users with payments");
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }

  async productsLimites(req, res) {
    try {
      let userId = req.params.id;
      let { ProductLimits } = req.body;
      let data = await VendorModel.findOneAndUpdate(
        { _id: userId },
        {
          ProductLimits,
        },
        { new: true } // Return the updated document
      );
      if (data) {
        return res.status(200).json({ Success: "Added", user: data });
      } else {
        return res.status(400).json({ Error: "Not added", user: data });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something happen when limiting the products" });
    }
  }

  async vendorapprove(req, res) {
    let id = req.params.id;
    try {
      await VendorModel.findOneAndUpdate(
        { _id: id },
        { vendorstatus: "approved" }
      )
        .then((data) => {
          return res.json({ Success: " Vendor registration approved" });
        })
        .catch((err) => {
          return res.status({ error: "Something went wrong" });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async vendordisapprove(req, res) {
    let id = req.params.id;
    try {
      await VendorModel.findOneAndUpdate(
        { _id: id },
        { vendorstatus: "disapproved" } // Change the status to "disapproved"
      )
        .then((data) => {
          return res.json({ Success: "Vendor registration disapproved" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Something went wrong" }); // Use status code 500 for internal server error
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deletevendor(req, res) {
    let catagory = req.params.id;
    const data = await VendorModel.deleteOne({ _id: catagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const vendorProfileController = new vendorProfile();
module.exports = vendorProfileController;
