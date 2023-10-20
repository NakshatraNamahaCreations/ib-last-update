import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
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

function App() {
  const admin = JSON.parse(sessionStorage.getItem("adminData"));
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      {admin == null ? (
        <div>
          {" "}
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        </div>
      ) : (
        <Router>
          <Routes>
            {" "}
            <Route
              path="/home"
              element={
                <Layout
                  childern={
                    <>
                      <Dashboard />
                    </>
                  }
                />
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
                  <Header /> <Buyer />
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
                  <Header /> <Sales />
                </>
              }
            />
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
                  <>
                    {" "}
                    <Header /> <Review />
                  </>
                </>
              }
            />
            <Route path="/Signup" element={<Signup />} />
            <Route
              path="/category"
              element={
                <>
                  {" "}
                  <Header /> <Category />
                </>
              }
            />
            <Route
              path="/Subcategory"
              element={
                <>
                  {" "}
                  <Header /> <SubCategory />
                </>
              }
            />
            <Route
              path="/servicecategory"
              element={
                <>
                  {" "}
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
            <Route path="/Vendorprofile" element={<Vendorprofile />} />
            {/* <Route path="/Vendorprofile/:id" element={<Vendorprofile />} /> */}
            {/* <Route
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
        /> */}
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
          </Routes>
        </Router>
      )}
    </div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="/home"
    //       element={
    //         <Layout
    //           childern={
    //             <>
    //               <Dashboard />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/vendormanagement"
    //       element={
    //         <>
    //           <Header />
    //           <VendorManagement />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/buyermanagement"
    //       element={
    //         <>
    //           <Header /> <Buyer />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/Wallets"
    //       element={
    //         <>
    //           <Header />
    //           <Wallets />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/sales"
    //       element={
    //         <>
    //           <Header /> <Sales />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/settings"
    //       element={
    //         <>
    //           <Header />
    //           <Settings />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/review"
    //       element={
    //         <>
    //           <>
    //             {" "}
    //             <Header /> <Review />
    //           </>
    //         </>
    //       }
    //     />
    //     <Route path="/Signup" element={<Signup />} />
    //     <Route
    //       path="/category"
    //       element={
    //         <>
    //           {" "}
    //           <Header /> <Category />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/Subcategory"
    //       element={
    //         <>
    //           {" "}
    //           <Header /> <SubCategory />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/servicecategory"
    //       element={
    //         <>
    //           {" "}
    //           <Header />
    //           <Servicescategory />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/servicesubcategory"
    //       element={
    //         <>
    //           <Header />
    //           <Servicessubcategory />
    //         </>
    //       }
    //     />
    //     <Route path="/Vendorprofile" element={<Vendorprofile />} />
    //     {/* <Route path="/Vendorprofile/:id" element={<Vendorprofile />} /> */}
    //     {/* <Route
    //       path="/banner"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Banner />
    //             </>
    //           }
    //         />
    //       }
    //     /> */}
    //     <Route
    //       path="/productbanner"
    //       element={
    //         <>
    //           <Header />
    //           <ProductBanner />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/updatevendor"
    //       element={
    //         <>
    //           <Header />
    //           <VendorUpdates />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/subadminrights"
    //       element={
    //         <>
    //           <Header />
    //           <SubAdminAccess />
    //         </>
    //       }
    //     />

    //     <Route
    //       path="/papprovaldetails/:id"
    //       element={
    //         <>
    //           <Header />
    //           <Papprovaldetails />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/sapprovaldetails/:id"
    //       element={
    //         <>
    //           <Header />
    //           <Sapprovaldetail />
    //         </>
    //       }
    //     />

    //     <Route path="/" element={<Login />} />
    //     <Route path="/invoice" element={<Invoice />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
export default App;
