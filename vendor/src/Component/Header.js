import React, { useState, useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

// import { CreateToggle } from "../TogglerProvider";
import { Menu, MenuItem } from "@material-ui/core";

function Header() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  // const { light, darkhandler, lighthandler } = useContext(CreateToggle);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    try {
      axios
        .get(`https://embarkers.co.in/api/admin/signout/` + user._id)
        .then(function (res) {
          if (res.status === 200) {
            sessionStorage.removeItem("admin");
            alert("Singout Success!");
            window.location.assign("/admin");
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
      <div
        className="row"
        style={{
          backgroundColor: "#e4e4e4",
          height: "auto",
          position: "fixed",
          width: "-webkit-fill-available",
          zIndex: 8,
        }}
      >
        <div className="col-md-10">
          <Link to="/home">
            <img
              src="./images/newlogo.png"
              style={{ width: "100px", height: "60px" }}
              alt=""
            />
          </Link>
        </div>
        <div className="col-md-2 d-flex header-profile-logo">
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "18px",
              }}
            >
              <i
                class="fa-solid fa-user h-icon"
                style={{
                  color: "white",
                  marginRight: "8px",
                  marginTop: "3px",
                }}
              ></i>
              <p style={{ color: "black", fontWeight: "bold" }}>
                {" "}
                Hi, {user?.firstname}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
