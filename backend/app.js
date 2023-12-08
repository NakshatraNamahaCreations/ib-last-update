const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const crypto = require("crypto");
const bodyParser = require("body-parser");
// const express = require("express");
const axios = require("axios");

app.use(express.json());
const ccav = require("node-ccavenue");

// Middleware
app.use(bodyParser.json());
//Db Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected !!!"));

// Function to encrypt the data using AES-128-CBC
const encrypt = (data, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return {
    encryptedData,
    iv: iv.toString("hex"),
  };
};

app.get("/response", (req, res) => {
  // Handle the response from CCavenue after payment completion
  res.send("Payment response received");
});

//import routes
const superAdminAuthroute = require("./Routes/auth/superAdminAuth");
const subAdminAuthroute = require("./Routes/auth/SubAdminAuth");
const ventorauthroute = require("./Routes/auth/vendorProfile");
const vendorupdate = require("./Routes/auth/vendorUpdate");
const catagoryroute = require("./Routes/product/catagory");
const subcatagoryroute = require("./Routes/product/subcatagory");
const productlistroute = require("./Routes/product/productList");
const productBannerroute = require("./Routes/admin/productBanner");
const serviceBannerroute = require("./Routes/admin/serviceBanner");
const authotprouter = require("./Routes/auth/otp");
const servicescatagoryroute = require("./Routes/Services/Category");
const servicessubcatagoryroute = require("./Routes/Services/Subcategory");
const AddPaymentGetWay = require("./Routes/Paymentgetway/Payment");
const servicesProductroute = require("./Routes/Services/serviceProductList");
const buyerauthroute = require("./Routes/auth/B2bprofile");
const bannerroute = require("./Routes/admin/banner");
const appbannerroute = require("./Routes/admin/Appbanner");
const enquiryroute = require("./Routes/enquiry/Enquiry");
const Serviceenquiryroute = require("./Routes/serviceEnquiry/Serviceenquiry");
const addpackage = require("./Routes/Package/Package");
const bidroute = require("./Routes/Bid/Bid");
const bidproductroute = require("./Routes/Bid/Productbid");
const postroute = require("./Routes/Post/Post");
const productpostroute = require("./Routes/Productpost/Productpost");
const adminSequenceVendorCode = require("./Routes/admin/vendorSequence");

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//creating Routes
app.use("/api/superadmin", superAdminAuthroute);
app.use("/api/subadmin", subAdminAuthroute);
app.use("/api/vendor", ventorauthroute);
app.use("/api", vendorupdate);
app.use("/api/vendor/product/catagory", catagoryroute);
app.use("/api/vendor/product/subcatagory", subcatagoryroute);
app.use("/api/product", productlistroute);
app.use("/api/product", productBannerroute);
app.use("/api/service", serviceBannerroute);
app.use("/api", authotprouter);
app.use("/api/vendor/services/catagory", servicescatagoryroute);
app.use("/api/vendor/services/subcatagory", servicessubcatagoryroute);
app.use("/api/payment", AddPaymentGetWay);
app.use("/api/vendor/services/productlist", servicesProductroute);
app.use("/api/buyer", buyerauthroute);
app.use("/api/buyer/serviceenquiry", Serviceenquiryroute);
app.use("/api/package", addpackage);
app.use("/api/bid", bidroute);
app.use("/api/productbid", bidproductroute);
app.use("/api/postreq", postroute);
app.use("/api/productpost", productpostroute);
app.use("/api/buyer/enquiry", enquiryroute);
app.use("/api/admin", bannerroute);
app.use("/api/admin", appbannerroute);
app.use("/api/admin", adminSequenceVendorCode);

app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
