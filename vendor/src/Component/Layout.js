import React from "react";
import AdminHeader from "../Component/Header";
import Sidebar from "../Component/Sidebar";

function Layout({ children }) {
  return (
    <div style={{ backgroundColor: "rgb(250 248 248)" }}>
      <AdminHeader />
      <div>
        <div className="row me-0">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
