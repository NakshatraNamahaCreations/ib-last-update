import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Layout from "./Component/Layout";
import Settings from "./Component/Settings";
import Banner from "./Component/Banner";
import Products from "./Component/Products";
import Services from "./Component/Services";
import Voucher from "./Component/Voucher";
import Paymentsreports from "./Component/Paymentsreports";
import Review from "./Component/Review";
import Login from "./Component/Login";
import ContentManagement from "./Component/ContentManagement";
import EditProducts from "./Component/EditProducts";
import Header from "./Component/Header";
import EditServices from "./Component/EditServices";
import SettingsCopy from "./Component/SettingsCopy";

function App() {
  const admin = JSON.parse(sessionStorage.getItem("vendor"));

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
            <Layout
              children={
                <>
                  <Dashboard />
                </>
              }
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Layout
              children={
                <>
                  <Settings />
                </>
              }
            />
          }
        />
        <Route
          path="/banner"
          element={
            <Layout
              children={
                <>
                  <Banner />
                </>
              }
            />
          }
        />
        <Route
          path="/Products"
          element={
            <Layout
              children={
                <>
                  <Products />
                </>
              }
            />
          }
        />
        <Route
          path="/services"
          element={
            <Layout
              children={
                <>
                  <Services />
                </>
              }
            />
          }
        />
        <Route
          path="/voucher"
          element={
            <Layout
              children={
                <>
                  <Voucher />
                </>
              }
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Layout
              children={
                <>
                  <Paymentsreports />
                </>
              }
            />
          }
        />
        <Route
          path="/review"
          element={
            <Layout
              children={
                <>
                  <Review />
                </>
              }
            />
          }
        />
        <Route
          path="/contentmanagement"
          element={
            <Layout
              children={
                <>
                  <ContentManagement />
                </>
              }
            />
          }
        />
        <Route
          path="/editproducts"
          element={
            <Layout
              children={
                <>
                  <EditProducts />
                </>
              }
            />
          }
        />
        <Route
          path="/editservices"
          element={
            <Layout
              children={
                <>
                  <EditServices />
                </>
              }
            />
          }
        />
        <Route
          path="/SettingsCopy"
          element={
            <Layout
              children={
                <>
                  <SettingsCopy />
                </>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import Dashboard from "./Component/Dashboard";
// import Layout from "./Component/Layout";
// import Settings from "./Component/Settings";
// import Banner from "./Component/Banner";
// import Products from "./Component/Products";
// import Services from "./Component/Services";
// import Voucher from "./Component/Voucher";
// import Paymentsreports from "./Component/Paymentsreports";
// import Review from "./Component/Review";
// import Login from "./Component/Login";
// import ContentManagement from "./Component/ContentManagement";
// import EditProducts from "./Component/EditProducts";
// import Header from "./Component/Header";
// import EditServices from "./Component/EditServices";
// import SettingsCopy from "./Component/SettingsCopy";
// import { Payment } from "@mui/icons-material";

// function App() {
//   const admin = JSON.parse(sessionStorage.getItem("vendor"));

//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={admin ? <Navigate to="/" /> : <Login />} />
//           <Route
//             path="/home"
//             element={
//               admin ? <Layout children={<Dashboard />} /> : <Navigate to="/" />
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               admin ? (
//                 <Layout>
//                   <Settings />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/Products"
//             element={
//               admin ? (
//                 <Layout>
//                   <Products />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/services"
//             element={
//               admin ? (
//                 <Layout>
//                   <Services />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/voucher"
//             element={
//               admin ? (
//                 <Layout>
//                   <Voucher />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/payment"
//             element={
//               admin ? (
//                 <Layout>
//                   <Payment />
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
//                   <Review />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/contentmanagement"
//             element={
//               admin ? (
//                 <Layout>
//                   <ContentManagement />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/editproducts"
//             element={
//               admin ? (
//                 <Layout>
//                   <EditProducts />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/editservices"
//             element={
//               admin ? (
//                 <Layout>
//                   <EditServices />
//                 </Layout>
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/SettingsCopy"
//             element={
//               admin ? (
//                 <Layout>
//                   <SettingsCopy />
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
