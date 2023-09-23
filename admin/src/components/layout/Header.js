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
          backgroundColor: "blue",
          height: "42px",
        }}
      >
        <Link to="/settings">
          <i class="fa-solid fa-user h-icon" style={{ float: "right" }}>
            Super
          </i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
