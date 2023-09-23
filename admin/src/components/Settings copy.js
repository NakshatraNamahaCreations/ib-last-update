import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { Card } from "react-bootstrap";

function Settings() {
  return (
    <div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 mt-5">
        <h2>
          {" "}
          <i class="fa-solid fa-gear" style={{ fontSize: "25px" }}></i> Account
          Settings
        </h2>
        <div className="shadow-lg bg-white rounded p-3 m-auto mt-3">
          <h5 className="ps-4">My Profile</h5>
          <Card className=" p-3 m-auto mt-3" style={{ width: "95%" }}>
            <div className="row">
              <div className="col-md-4">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="../images/testimonial.jpg"
                    alt=""
                    style={{ width: "25%", borderRadius: "100%" }}
                  />
                  <div style={{ marginLeft: "1rem" }}>
                    <div style={{ fontSize: "18px", fontWeight: "500" }}>
                      Name
                    </div>
                    <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                      <i>Admin</i>
                    </div>
                    <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                      <i>Bangalore, India</i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div className="admin-profile-edit">
                    <u>
                      Edit <i class="fa-solid fa-pen"></i>
                    </u>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-3 justify-content-center">
              <div className="col-md-1">
                <button className="vhs-button">Save</button>
              </div>
            </div>
          </Card>
          <br />
          <Card className=" m-auto mt-3" style={{ width: "95%" }}>
            <div className="card-body p-4">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="vhs-sub-heading">Personal Information</div>
                <div className="float-end admin-profile-edit">
                  {" "}
                  <u>
                    Edit {""}
                    <i class="fa-solid fa-pen"></i>
                  </u>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">
                    First Name
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="loremipsum "
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">
                    Last Name
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="loremipsum "
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">Email</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="loremipsum "
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">Phone</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="loremipsum "
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">Bio</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="loremipsum "
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-3 justify-content-center">
                <div className="col-md-2">
                  <button className="vhs-button" style={{ width: "140px" }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Card className=" m-auto mt-3" style={{ width: "95%" }}>
            <div className="card-body p-4">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="vhs-sub-heading">Address</div>
                <div className="float-end admin-profile-edit">
                  {" "}
                  <u>
                    Edit {""}
                    <i class="fa-solid fa-pen"></i>
                  </u>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">
                    Country
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="loremipsum "
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">
                    City/State
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="loremipsum "
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="vhs-input-label admin-label-edit">
                    Postal Code
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="loremipsum "
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-3 justify-content-center">
                <div className="col-md-2">
                  <button className="vhs-button" style={{ width: "140px" }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
