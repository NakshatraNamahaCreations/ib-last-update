import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/home",
      name: "Dashboard",
    },
    {
      path: "/productbanner",
      name: "Banner",
    },
    {
      path: "/vendormanagement",
      name: "Vendor Management",
    },
    {
      path: "/buyermanagement",
      name: "Buyer Management",
    },
    {
      path: "/category",
      name: "Product",
    },

    {
      path: "/servicecategory",
      name: "Service",
    },

    // {
    //   path: "/updatevendor",
    //   name: "Vendor Approve ",
    // },
    // {
    //   path: "/servicesubcategory",
    //   name: "Service Subcategory",
    // },
    // {
    //   path: "/sales",
    //   name: "Sales",
    // },
    {
      path: "/review",
      name: "Review Management",
    },
    // {
    //   path: "/Wallets",
    //   name: "Wallets",
    // },
    {
      path: "/settings",
      name: "Settings",
    },
  ];
  return (
    <div>
      <div style={{ width: isOpen ? "220px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img src="./images/newlogo.png" style={{ width: "85%" }} alt="" />
        </div>
        <hr />
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            // activeclassName="active"
          >
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
