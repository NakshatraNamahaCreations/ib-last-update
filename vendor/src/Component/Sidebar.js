import React from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import createNotification from "./NotificationContainer";

function Sidebar() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const signout = () => {
    try {
      axios
        .get(`http://api.infinitimart.in/api/vendor/signout/` + user._id)
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

  return (
    <div>
      <ProSidebar style={{ color: "rgb(40, 104, 107)" }}>
        <div className="pro-sidebar-inner">
          <div>
            <img
              src="images/Infinitimart_Logo.png"
              className="img-fluid"
              style={{ width: "180px" }}
              alt=""
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
              Dashboard <Link to="/home" />
            </MenuItem>
            <MenuItem className="adminsidebar">
              Banner <Link to="/banner" />
            </MenuItem> */}
            {/* <SubMenu title="Product">
          <MenuItem>
            {" "}
            Category <Link to="/Category" />
          </MenuItem>
          <MenuItem>
            {" "}
            Subcategory <Link to="/SubCategory" />
          </MenuItem>
          <MenuItem>
            {" "}
            Products <Link to="/Products" />
          </MenuItem>
          <MenuItem>
            {" "}
            Order <Link to="/order" />
          </MenuItem>
        </SubMenu> */}
            {/* <SubMenu title="Services">
          <MenuItem>
            {" "}
            Category <Link to="/servicescategory" />
          </MenuItem>
          <MenuItem>
            {" "}
            Subcategory <Link to="/servicessubcategory" />
          </MenuItem>
          <MenuItem>
            {" "}
            Services <Link to="/services" />
          </MenuItem>
         
        </SubMenu> */}

            <MenuItem>
              {user?.businesstype === "Products" ? (
                <>
                  <Link to="/Products" style={{ color: "black" }}>
                    {" "}
                    Product
                  </Link>{" "}
                </>
              ) : (
                <>
                  <Link to="/services" style={{ color: "black" }}>
                    Services
                  </Link>
                </>
              )}
            </MenuItem>
            {/* <MenuItem>
              Content Management <Link to="/contentmanagement" />
            </MenuItem> */}
            <MenuItem>
              Ads <Link to="/ads" />
            </MenuItem>
            {/* <MenuItem>
              Discount <Link to="/voucher" />
            </MenuItem> */}
            {/* <MenuItem>
              Payments and Reports
              <Link to="/payment" />
            </MenuItem> */}
            {/* <MenuItem>
              Review Management <Link to="/review" />{" "}
            </MenuItem> */}
            <MenuItem>
              Settings <Link to="/settings" />{" "}
            </MenuItem>
            <MenuItem onClick={signout}>
              Logout
              <Link to="/" />
            </MenuItem>
          </Menu>
        </div>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
