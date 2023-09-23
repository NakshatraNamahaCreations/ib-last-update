import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Sidenav from "../../Sidenav";

function Layout({ childern }) {
  return (
    <div>
      <Header />
      <div className="row me-0">
        <div className="col-2">
          <Sidebar />
          {/* <Sidenav /> */}
        </div>
        <div className="col-10">{childern}</div>
      </div>
    </div>
  );
}

export default Layout;
