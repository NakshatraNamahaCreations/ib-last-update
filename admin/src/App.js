// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import VendorManagement from "./components/VendorManagement";
// import Buyer from "./components/Buyer";
// import Wallets from "./components/Wallets";
// import Settings from "./components/Settings";
// import Sidenav from "./Sidenav";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Sales from "./components/Sales";
// import Category from "./components/Category";
// import SubCategory from "./components/Subcategory";
// import Layout from "./components/layout/Layout";
// import Header from "./components/layout/Header";
// import Servicescategory from "./components/Servicescategory";
// import Servicessubcategory from "./components/Servicessubcategory";
// import Vendorprofile from "./components/Vendorprofile";
// import Dashboard from "./components/Dashboard";
// import Review from "./components/Review";
// import Invoice from "./components/Invoice";
// import ProductBanner from "./components/ProductBanner";
// import VendorUpdates from "./components/VendorUpdates";
// import SubAdminAccess from "./components/SubAdminAccess";

// import Papprovaldetails from "./components/Papprovaldetails";
// import Sapprovaldetail from "./components/Sapprovaldetail";

// function App() {
//   const admin = JSON.parse(sessionStorage.getItem("adminData"));
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </Router>
//       {admin == null ? (
//         <div>
//           {" "}
//           <Router>
//             <Routes>
//               <Route path="/" element={<Login />} />
//             </Routes>
//           </Router>
//         </div>
//       ) : (
//         <Router>
//           <Routes>
//             {" "}
//             <Route
//               path="/home"
//               element={
//                 <Layout
//                   childern={
//                     <>
//                       <Dashboard />
//                     </>
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/vendormanagement"
//               element={
//                 <>
//                   <Header />
//                   <VendorManagement />
//                 </>
//               }
//             />
//             <Route
//               path="/buyermanagement"
//               element={
//                 <>
//                   <Header /> <Buyer />
//                 </>
//               }
//             />
//             <Route
//               path="/Wallets"
//               element={
//                 <>
//                   <Header />
//                   <Wallets />
//                 </>
//               }
//             />
//             <Route
//               path="/sales"
//               element={
//                 <>
//                   <Header /> <Sales />
//                 </>
//               }
//             />
//             <Route
//               path="/settings"
//               element={
//                 <>
//                   <Header />
//                   <Settings />
//                 </>
//               }
//             />
//             <Route
//               path="/review"
//               element={
//                 <>
//                   <>
//                     {" "}
//                     <Header /> <Review />
//                   </>
//                 </>
//               }
//             />
//             <Route path="/Signup" element={<Signup />} />
//             <Route
//               path="/category"
//               element={
//                 <>
//                   {" "}
//                   <Header /> <Category />
//                 </>
//               }
//             />
//             <Route
//               path="/Subcategory"
//               element={
//                 <>
//                   {" "}
//                   <Header /> <SubCategory />
//                 </>
//               }
//             />
//             <Route
//               path="/servicecategory"
//               element={
//                 <>
//                   {" "}
//                   <Header />
//                   <Servicescategory />
//                 </>
//               }
//             />
//             <Route
//               path="/servicesubcategory"
//               element={
//                 <>
//                   <Header />
//                   <Servicessubcategory />
//                 </>
//               }
//             />
//             <Route path="/Vendorprofile" element={<Vendorprofile />} />
//             {/* <Route path="/Vendorprofile/:id" element={<Vendorprofile />} /> */}
//             {/* <Route
//           path="/banner"
//           element={
//             <Layout
//               children={
//                 <>
//                   <Banner />
//                 </>
//               }
//             />
//           }
//         /> */}
//             <Route
//               path="/productbanner"
//               element={
//                 <>
//                   <Header />
//                   <ProductBanner />
//                 </>
//               }
//             />
//             <Route
//               path="/updatevendor"
//               element={
//                 <>
//                   <Header />
//                   <VendorUpdates />
//                 </>
//               }
//             />
//             <Route
//               path="/subadminrights"
//               element={
//                 <>
//                   <Header />
//                   <SubAdminAccess />
//                 </>
//               }
//             />
//             <Route
//               path="/papprovaldetails/:id"
//               element={
//                 <>
//                   <Header />
//                   <Papprovaldetails />
//                 </>
//               }
//             />
//             <Route
//               path="/sapprovaldetails/:id"
//               element={
//                 <>
//                   <Header />
//                   <Sapprovaldetail />
//                 </>
//               }
//             />
//             <Route path="/invoice" element={<Invoice />} />
//           </Routes>
//         </Router>
//       )}
//     </div>

//     // <BrowserRouter>
//     //   <Routes>
//     //     <Route
//     //       path="/home"
//     //       element={
//     //         <Layout
//     //           childern={
//     //             <>
//     //               <Dashboard />
//     //             </>
//     //           }
//     //         />
//     //       }
//     //     />
//     //     <Route
//     //       path="/vendormanagement"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <VendorManagement />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/buyermanagement"
//     //       element={
//     //         <>
//     //           <Header /> <Buyer />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/Wallets"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <Wallets />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/sales"
//     //       element={
//     //         <>
//     //           <Header /> <Sales />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/settings"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <Settings />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/review"
//     //       element={
//     //         <>
//     //           <>
//     //             {" "}
//     //             <Header /> <Review />
//     //           </>
//     //         </>
//     //       }
//     //     />
//     //     <Route path="/Signup" element={<Signup />} />
//     //     <Route
//     //       path="/category"
//     //       element={
//     //         <>
//     //           {" "}
//     //           <Header /> <Category />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/Subcategory"
//     //       element={
//     //         <>
//     //           {" "}
//     //           <Header /> <SubCategory />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/servicecategory"
//     //       element={
//     //         <>
//     //           {" "}
//     //           <Header />
//     //           <Servicescategory />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/servicesubcategory"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <Servicessubcategory />
//     //         </>
//     //       }
//     //     />
//     //     <Route path="/Vendorprofile" element={<Vendorprofile />} />
//     //     {/* <Route path="/Vendorprofile/:id" element={<Vendorprofile />} /> */}
//     //     {/* <Route
//     //       path="/banner"
//     //       element={
//     //         <Layout
//     //           children={
//     //             <>
//     //               <Banner />
//     //             </>
//     //           }
//     //         />
//     //       }
//     //     /> */}
//     //     <Route
//     //       path="/productbanner"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <ProductBanner />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/updatevendor"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <VendorUpdates />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/subadminrights"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <SubAdminAccess />
//     //         </>
//     //       }
//     //     />

//     //     <Route
//     //       path="/papprovaldetails/:id"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <Papprovaldetails />
//     //         </>
//     //       }
//     //     />
//     //     <Route
//     //       path="/sapprovaldetails/:id"
//     //       element={
//     //         <>
//     //           <Header />
//     //           <Sapprovaldetail />
//     //         </>
//     //       }
//     //     />

//     //     <Route path="/" element={<Login />} />
//     //     <Route path="/invoice" element={<Invoice />} />
//     //   </Routes>
//     // </BrowserRouter>
//   );
// }
// export default App;

// import React from "react";
// import "./App.js";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import VendorManagement from "./components/VendorManagement";
// import Buyer from "./components/Buyer";
// import Wallets from "./components/Wallets";
// import Settings from "./components/Settings";
// import Sidenav from "./Sidenav";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Sales from "./components/Sales";
// import Category from "./components/Category";
// import SubCategory from "./components/Subcategory";
// import Layout from "./components/layout/Layout";
// import Header from "./components/layout/Header";
// import Servicescategory from "./components/Servicescategory";
// import Servicessubcategory from "./components/Servicessubcategory";
// import Vendorprofile from "./components/Vendorprofile";
// import Dashboard from "./components/Dashboard";
// import Review from "./components/Review";
// import Invoice from "./components/Invoice";
// import ProductBanner from "./components/ProductBanner";
// import VendorUpdates from "./components/VendorUpdates";
// import SubAdminAccess from "./components/SubAdminAccess";

// import Papprovaldetails from "./components/Papprovaldetails";
// import Sapprovaldetail from "./components/Sapprovaldetail";
// import { Payment } from "@mui/icons-material";

// function App() {
//   const admin = JSON.parse(sessionStorage.getItem("adminData"));

//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={admin ? <Navigate to="/home" /> : <Login />}
//           />
//           <Route
//             path="/home"
//             element={
//               admin ? (
//                 <Layout>
//                   <Dashboard />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/vendormanagement"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <VendorManagement />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/buyermanagement"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header /> <Buyer />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/Wallets"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <Wallets />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/sales"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header /> <Sales />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <Settings />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/review"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header /> <Review />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/Signup"
//             element={
//               admin ? (
//                 <Layout>
//                   <Signup />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/category"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header /> <Category />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/Subcategory"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header /> <SubCategory />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/servicecategory"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <Servicescategory />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/servicesubcategory"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <Servicessubcategory />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/Vendorprofile"
//             element={
//               admin ? (
//                 <Layout>
//                   <Vendorprofile />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/productbanner"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <ProductBanner />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           <Route
//             path="/updatevendor"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <VendorUpdates />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/subadminrights"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <SubAdminAccess />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/papprovaldetails/:id"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <Papprovaldetails />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/sapprovaldetails/:id"
//             element={
//               admin ? (
//                 <Layout>
//                   <Header />
//                   <Sapprovaldetail />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/invoice"
//             element={
//               admin ? (
//                 <Layout>
//                   <Invoice />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import VendorManagement from "./components/VendorManagement";
import Buyer from "./components/Buyer";
import Wallets from "./components/Wallets";
import Settings from "./components/Settings";
import Sidenav from "./Sidenav";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Sales from "./components/Sales";
import Category from "./components/Category";
import SubCategory from "./components/Subcategory";
import Layout from "./components/layout/Layout";
import Header from "./components/layout/Header";
import Servicescategory from "./components/Servicescategory";
import Servicessubcategory from "./components/Servicessubcategory";
import Vendorprofile from "./components/Vendorprofile";
import Dashboard from "./components/Dashboard";
import Review from "./components/Review";
import Invoice from "./components/Invoice";
import ProductBanner from "./components/ProductBanner";
import VendorUpdates from "./components/VendorUpdates";
import SubAdminAccess from "./components/SubAdminAccess";

import Papprovaldetails from "./components/Papprovaldetails";
import Sapprovaldetail from "./components/Sapprovaldetail";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";

function App() {
  const admin = JSON.parse(sessionStorage.getItem("adminData"));
  console.log("admin====", admin);

  const [loggedIn, setLoggedIn] = useState(!!admin);

  if (!loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/vendormanagement"
          element={
            <>
              <Header />
              <VendorManagement />
            </>
          }
        />
        <Route
          path="/buyermanagement"
          element={
            <>
              <Header />
              <Buyer />
            </>
          }
        />

        <Route
          path="/Wallets"
          element={
            <>
              <Header />
              <Wallets />
            </>
          }
        />

        <Route
          path="/sales"
          element={
            <>
              <Header />
              <Sales />
            </>
          }
        />

        {/* <Route path="/settings" element={<Header children={<Settings />} />} /> */}
        <Route
          path="/settings"
          element={
            <>
              <Header />
              <Settings />
            </>
          }
        />

        <Route
          path="/review"
          element={
            <>
              <Header />
              <Review />
            </>
          }
        />

        <Route
          path="/Signup"
          element={
            <>
              <Header />
              <Signup />
            </>
          }
        />

        <Route
          path="/category"
          element={
            <>
              <Header />
              <Category />
            </>
          }
        />

        <Route
          path="/Subcategory"
          element={
            <>
              <Header />
              <SubCategory />
            </>
          }
        />

        <Route
          path="/servicecategory"
          element={
            <>
              <Header />
              <Servicescategory />
            </>
          }
        />

        <Route
          path="/servicesubcategory"
          element={
            <>
              <Header />
              <Servicessubcategory />
            </>
          }
        />

        <Route
          path="/Vendorprofile"
          element={
            <>
              <Header />
              <Vendorprofile />
            </>
          }
        />

        <Route
          path="/productbanner"
          element={
            <>
              <Header />
              <ProductBanner />
            </>
          }
        />

        <Route
          path="/updatevendor"
          element={
            <>
              <Header />
              <VendorUpdates />
            </>
          }
        />

        <Route
          path="/subadminrights"
          element={
            <>
              <Header />
              <SubAdminAccess />
            </>
          }
        />

        <Route
          path="/papprovaldetails/:id"
          element={
            <>
              <Header />
              <Papprovaldetails />
            </>
          }
        />

        <Route
          path="/sapprovaldetails/:id"
          element={
            <>
              <Header />
              <Sapprovaldetail />
            </>
          }
        />
        <Route path="/invoice" element={<Invoice />} />

        <Route path="/invoice" element={<Invoice />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
