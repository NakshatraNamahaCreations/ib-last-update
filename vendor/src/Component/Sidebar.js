// import React from "react";
// import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// // import createNotification from "./NotificationContainer";

// function Sidebar() {
//   const user = JSON.parse(sessionStorage.getItem("vendor"));
//   const signout = () => {
//     try {
//       axios
//         .get(`https://api.infinitimart.in/api/vendor/signout/` + user._id)
//         .then(function (res) {
//           if (res.status === 200) {
//             // alert("Signout Success!");
//             // createNotification("success", "Login Success");
//             toast.success("Logout Done", {
//               position: toast.POSITION.TOP_RIGHT,
//               autoClose: 6000, // milliseconds
//               hideProgressBar: true,
//               closeOnClick: true,
//               draggable: true,
//               theme: "colored",
//             });
//             sessionStorage.removeItem("vendor");
//             window.location.assign("/");
//             return;
//           } else {
//             alert("Signout Unsuccessfully");
//             return;
//           }
//         });
//     } catch (error) {
//       console.warn(error);
//       alert("Signout Unsuccessfully");
//     }
//   };

//   return (
//     <div>
//       <ProSidebar style={{ color: "rgb(40, 104, 107)" }}>
//         <div className="pro-sidebar-inner">
//           <div>
//             <img
//               src="images/Infinitimart_Logo.png"
//               className="img-fluid"
//               style={{ width: "180px" }}
//               alt=""
//             />
//             <h6
//               className="text-center pt-1"
//               style={{ color: "black", fontWeight: "bold" }}
//             >
//               Infinitimart
//             </h6>
//           </div>

//           <Menu iconShape="square">
//             <MenuItem>
//               Dashboard <Link to="/home" />
//             </MenuItem>

//             <MenuItem>
//               {user?.businesstype === "Products" ? (
//                 <>
//                   <Link to="/Products" style={{ color: "black" }}>
//                     {" "}
//                     Product
//                   </Link>{" "}
//                 </>
//               ) : (
//                 <>
//                   <Link to="/services" style={{ color: "black" }}>
//                     Services
//                   </Link>
//                 </>
//               )}
//             </MenuItem>

//             <MenuItem>
//               Ads <Link to="/ads" />
//             </MenuItem>

//             <MenuItem>
//               Settings <Link to="/settings" />{" "}
//             </MenuItem>
//             <MenuItem onClick={signout}>
//               Logout
//               <Link to="/" />
//             </MenuItem>
//           </Menu>
//         </div>
//       </ProSidebar>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import Header from "./Header";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const signout = () => {
    try {
      axios
        .get(`https://api.infinitimart.in/api/vendor/signout/` + user._id)
        .then(function (res) {
          if (res.status === 200) {
            // alert("Signout Success!");
            // createNotification("success", "Login Success");
            toast.success("Logout Done", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 6000, // milliseconds
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
              theme: "colored",
            });
            sessionStorage.removeItem("vendor");
            window.location.assign("/");
            return;
          } else {
            alert("Signout Unsuccessfully");
            return;
          }
        });
    } catch (error) {
      console.warn(error);
      alert("Signout Unsuccessfully");
    }
  };

  const menuItem = [
    {
      path: "/home",
      name: "Dashboard",
    },
    {
      path: "/Products",
      name: "Products",
    },
    {
      path: "/services",
      name: "Services",
    },
    {
      path: "/ads",
      name: "Ads",
    },
    {
      path: "/settings",
      name: "Settings",
    },
  ];
  return (
    <div>
      <div
        style={{
          width: isOpen ? "220px" : "50px",
          position: "fixed",
          marginTop: "59px",
        }}
        className="sidebar"
      >
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
