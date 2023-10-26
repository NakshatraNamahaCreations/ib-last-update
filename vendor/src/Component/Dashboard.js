import React, { useState } from "react";
import { Card } from "react-bootstrap";

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  var i = 1;
  return (
    <div className="row me-0">
      <div className="pb-4" style={{ display: "flex" }}>
        {/* <img
          src="../images/testimonial.jpg"
          alt=""
          style={{ width: "10%", borderRadius: "100%" }}
        /> */}
        <div className="" style={{ marginTop: "70px", marginLeft: "30px" }}>
          <h5 style={{ fontSize: "17px" }}>
            Hi, <span style={{ color: "#FF4131" }}>{user?.firstname},</span>
          </h5>
          <h2 style={{ fontSize: "19px" }}>Welcome back!</h2>
        </div>
      </div>
      <div className="col vm-col-grid" style={{ marginLeft: "35px" }}>
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div
              className="vm-card-bg"
              style={{ backgroundColor: "rgb(255 193 18)" }}
            >
              <div className="vm-count_content vm-font-awsm">
                <p>Wallet</p>{" "}
                <h3 className="vm-count_content-head">
                  ₹ <span class="vm-counter">0</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{
                  backgroundColor: "#ffd253",
                  fontSize: "23px",
                  padding: "3px 10px",
                }}
              >
                <i class="fa-solid fa-wallet"></i>
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col vm-col-grid">
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div className="vm-card-bg" style={{ backgroundColor: "#fe5041" }}>
              <div className="vm-count_content vm-font-awsm">
                <p>Total leads</p>{" "}
                <h3 className="vm-count_content-head">
                  <span class="vm-counter">0</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{
                  backgroundColor: "#ff877c",
                  fontSize: "23px",
                  padding: "3px 10px",
                }}
              >
                <i class="fa-solid fa-leaf"></i>
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col vm-col-grid">
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div
              className="vm-card-bg"
              style={{ backgroundColor: "rgb(29 184 81)" }}
            >
              <div className="vm-count_content vm-font-awsm">
                <p>Profile visits</p>{" "}
                <h3 className="vm-count_content-head">
                  <span class="vm-counter">0</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{
                  backgroundColor: "#42ff818a",
                  fontSize: "23px",
                  padding: "3px 10px",
                }}
              >
                <i class="fa-regular fa-eye"></i>
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col vm-col-grid">
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div
              className="vm-card-bg"
              style={{ backgroundColor: "rgb(34 148 255)" }}
            >
              <div className="vm-count_content vm-font-awsm">
                <p>Enquiry</p>{" "}
                <h3 className="vm-count_content-head">
                  <span class="vm-counter">0</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{
                  backgroundColor: "rgb(92 176 255)",
                  fontSize: "23px",
                  padding: "3px 10px",
                }}
              >
                <i class="fa-regular fa-envelope"></i>
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
