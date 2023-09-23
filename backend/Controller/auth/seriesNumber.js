// const VendorModel = require("../../Model/auth/vendorProfile");

// class uniquenumber {
//   async generateSeriesNumber(req, res) {
//     try {
//       // Find the latest account in the collection
//       const newUser = await VendorModel.findOne(
//         {},
//         {},
//         { sort: { seriesNumber: -1 } }
//       );

//       // Extract the series number from the latest account
//       let seriesNumber = 1;
//       if (newUser) {
//         const newUserNumber = newUser.seriesNumber;
//         seriesNumber = parseInt(newUserNumber.split("-")[1]) + 1;
//       }

//       // Generate the new account number with the series number
//       const newseriesNumber = `IM2023-${seriesNumber}`;
//       console.log("newseriesNumber=====", newseriesNumber);
//       return newseriesNumber;
//     } catch (error) {
//       console.error("Error generating series number:", error);
//       throw error;
//     }
//   }
// }
// const uniquenumberController = new uniquenumber();
// module.exports = uniquenumberController;
// // export default uniquenumberController;
