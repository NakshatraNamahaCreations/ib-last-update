import { Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
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
      <Navbar style={{ backgroundColor: "blue" }}>
        <Container style={{ justifyContent: "flex-end" }}>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <i
                class="fa-solid fa-user h-icon"
                style={{
                  color: "white",
                  marginRight: "8px",
                  marginTop: "3px",
                }}
              ></i>
              <p style={{ color: "white", fontWeight: "bold" }}>
                {" "}
                Hi, {user?.firstname}
              </p>
            </div>
          </Link>

          {/* <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={signout}>Logout</MenuItem>
          </Menu> */}
          {/* </> */}
          {/* ) : ( */}
          {/* ""
          )} */}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
