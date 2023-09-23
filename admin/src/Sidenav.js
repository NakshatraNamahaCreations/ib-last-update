import React from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <ProSidebar style={{ minHeight: "100%" }}>
      <div className="row justify-content-center mt-2">
        <img
          src="./images/newlogo.png"
          className="img-fluid"
          style={{ width: "80px" }}
        />
        <h6
          className="text-center pt-1"
          style={{ color: "black", fontWeight: "bold" }}
        >
          Infinitimart
        </h6>
      </div>
      <Menu iconShape="square">
        <MenuItem>
          Dashboard <Link to="/home" />
        </MenuItem>
        {/* <MenuItem>
          Vendor Management <Link to="/VendorManagement" />
        </MenuItem> */}
        <MenuItem>
          Vendor Management <Link to="/Vendor" />
        </MenuItem>
        <MenuItem>
          Buyer Management <Link to="/Buyer" />
        </MenuItem>
        <SubMenu title="Product">
          <MenuItem>
            {" "}
            Category <Link to="/Category" />
          </MenuItem>
          <MenuItem>
            {" "}
            Subcategory <Link to="/SubCategory" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Services">
          <MenuItem>
            {" "}
            Category <Link to="/servicecategory" />
          </MenuItem>
          <MenuItem>
            {" "}
            Subcategory <Link to="/servicesubcategory" />
          </MenuItem>
        </SubMenu>
        <MenuItem>
          Sales
          <Link to="/Sales" />
        </MenuItem>
        <MenuItem>
          wallet <Link to="/Wallets" />{" "}
        </MenuItem>
        <MenuItem>
          Settings <Link to="/settings" />{" "}
        </MenuItem>
        <MenuItem>
          Logout
          <Link to="/" />
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}

export default Sidenav;
