import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateToggle } from "../TogglerProvider";

function Header() {
  const { light, darkhandler, lighthandler } = useContext(CreateToggle);
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
          <Link to="/settings">
            <i
              class="fa-solid fa-user h-icon"
              style={{ marginRight: "10px", marginTop: "-3px" }}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
