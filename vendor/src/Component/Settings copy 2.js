import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Card } from "react-bootstrap";

function Settings() {
  const [changePassword, setChangePassword] = useState(false);
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
            {!changePassword ? (
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
                    <div
                      className="admin-profile-edit"
                      onClick={() => setChangePassword(true)}
                    >
                      <u>
                        Change Password <i class="fa-solid fa-pen"></i>
                      </u>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="row" style={{ justifyContent: "center" }}>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label admin-label-edit">
                      Old Password
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        placeholder="loremipsum "
                      />
                    </div>{" "}
                  </div>
                </div>
                <div className="row" style={{ justifyContent: "center" }}>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label admin-label-edit">
                      New Password
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        placeholder="loremipsum "
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>{" "}
                </div>
                <div className="row" style={{ justifyContent: "center" }}>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label admin-label-edit">
                      Confirm Password
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        placeholder="loremipsum "
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>{" "}
                </div>
              </>
            )}
          </Card>
          {/* change password=========== */}
          {changePassword ? (
            <div>
              <div className="row pt-3 justify-content-center">
                <div className="col-md-1">
                  <button className="vhs-button">Update</button>
                </div>
                <div className="col-md-1">
                  {" "}
                  <button
                    className="vhs-button"
                    onClick={() => setChangePassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Settings;
