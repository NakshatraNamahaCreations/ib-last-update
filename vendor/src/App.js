import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
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
      )}
    </div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route
    //       path="/home"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Dashboard />
    //             </>
    //           }
    //         />
    //       }
    //     />

    //     <Route
    //       path="/settings"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Settings />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
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
    //     />
    //     <Route
    //       path="/Products"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Products />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/services"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Services />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/voucher"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Voucher />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/payment"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Paymentsreports />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/review"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <Review />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/contentmanagement"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <ContentManagement />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/editproducts"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <EditProducts />
    //             </>
    //           }
    //         />
    //       }
    //     />

    //     <Route
    //       path="/editservices"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <EditServices />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //     <Route
    //       path="/SettingsCopy"
    //       element={
    //         <Layout
    //           children={
    //             <>
    //               <SettingsCopy />
    //             </>
    //           }
    //         />
    //       }
    //     />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
