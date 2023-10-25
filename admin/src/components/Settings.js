import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Button, Card, Form, Modal } from "react-bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

function Settings() {
  const adminData = JSON.parse(sessionStorage.getItem("adminData"));
  // console.log("adminData====", adminData);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showeditprofile, setShowEditProfile] = useState(false);

  const handleEditprofileClose = () => setShowEditProfile(false);
  const handleEditprofileShow = () => setShowEditProfile(true);
  // admin profile update
  const [adminName, setAdminName] = useState(adminData.name);
  const [adminEmail, setAdminEmail] = useState(adminData.email);
  const [adminMobileNumber, setAdminMobileNumber] = useState(
    adminData.mobileNumber
  );

  // open modal to adding sub admin
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //creating subadmin
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  // const [defineRoll, setDefineRoll] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [allSubAdmins, setAllSubAdmins] = useState([]);
  //showing subadmin
  const [viewSubAdmin, setViewSubAdmin] = useState(false);

  // change password
  const handleChangePassword = async () => {
    try {
      const response = await fetch(
        `https://api.infinitimart.in/api/superadmin/superadminchangepassword/${adminData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.success || data.error);
      if (data.success) {
        setTimeout(() => {
          setMessage("");
          setShowChangePassword(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  // const updateProfile = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.infinitimart.in/api/superadmin/updatesuperadminprofile/${adminData._id}`,
  //       {
  //         method: "put",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           adminName,
  //           adminMobileNumber,
  //           adminEmail,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Profile updated successfully:", data);
  //       alert("Profile updated successfully");
  //       window.location.reload("");
  //     } else {
  //       console.error("Error updating profile:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const updateProfile = async () => {
    try {
      const config = {
        url: `/superadmin/updatesuperadminprofile/${adminData._id}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: adminName,
          mobileNumber: adminMobileNumber,
          email: adminEmail,
        },
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success", res);
          sessionStorage.removeItem("adminData");
          alert(res.data.Success);
          window.location.assign("/");
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  const addSubAdmin = async () => {
    // e.preventDefault();
    try {
      const response = {
        url: "/subadmin/createsubadmin",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          email: email,
          password: passord,
          mobileNumber: mobileNumber,
          responsibilities: responsibilities,
          role: "2",
        },
      };
      await axios(response).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(`New Sub Admin ${name} added successfully`);
          // window.location.reload();
          setViewSubAdmin(true);
          setShow(false);
        }
      });
      // const SubAdmin = await response.json();
      // if (SubAdmin.success) {
      //   alert(`New Sub Admin ${name} added successfully`);
      // }
    } catch (error) {
      console.error("Error on something adding:", error);
      // alert("An error occurred. Please try again later.");
      alert(error.response.data.error);
    }
  };

  const signout = () => {
    try {
      axios
        .get(
          `https://api.infinitimart.in/api/superadmin/superadminsignout/${adminData._id}`
        )
        .then(function (res) {
          if (res.status === 200) {
            sessionStorage.removeItem("adminData");
            // alert("Signout Success!");
            window.location.assign("/");
          } else {
            alert("Signout Unsuccessfully");
            console.log(res);
          }
        });
    } catch (error) {
      console.log(error);
      // alert(error.);
    }
  };

  const deleteSubAdmin = async (data) => {
    try {
      axios
        .post(
          `https://api.infinitimart.in/api/subadmin/deletesubadmin/` + data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            alert(res.data.success);
            setViewSubAdmin(true);
          }
        });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const getAllSubAdmins = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/subadmin/getallsubadmins"
    );
    if (res.status === 200) {
      // console.log(res);
      setAllSubAdmins(res.data?.allSubAdmin);
    }
  };
  useEffect(() => {
    getAllSubAdmins();
  }, []);

  const columns = [
    {
      name: "SL.NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row, index) => row.name,
    },
    {
      name: "Email",
      selector: (row, index) => row.email,
    },
    {
      name: "Mobile",
      selector: (row, index) => row.mobileNumber,
    },
    {
      name: "Password",
      selector: (row, index) => row.password,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <span>
            <i
              class="fa-solid fa-trash delete-icon"
              title="Delete"
              onClick={() => deleteSubAdmin(row)}
            ></i>
          </span>{" "}
          <span>
            <i
              class="fa-solid fa-ban block-icon"
              title="Block"
              onClick={() => deleteSubAdmin(row)}
            ></i>
          </span>{" "}
          <span>
            <Link to="/subadminrights" state={{ assignRights: row }}>
              <i
                class="fa-solid fa-circle-check rights-icon"
                title="Rights"
                // onClick={() => handleShowRights(row)}
              ></i>
            </Link>
          </span>
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   deleteSubAdmin();
  // }, [viewSubAdmin]);

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 mt-5">
        {viewSubAdmin ? (
          <>
            <h2>
              <i class="fa-solid fa-users" style={{ fontSize: "25px" }}></i>
              Sub-Admin List
            </h2>

            <div className="mt-5">
              <div
                className="d-flex ps-2 pe-5 pb-3"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <Form.Control type="text" placeholder="Search by name" />
                </div>
                <div>
                  <span>
                    <i
                      class="fa-solid fa-circle-plus"
                      title="Add Sub admin"
                      style={{ fontSize: "25px", cursor: "pointer" }}
                      onClick={handleShow}
                    ></i>
                  </span>
                  <span>
                    {" "}
                    <i
                      class="fa-solid fa-circle-xmark"
                      title="Close"
                      style={{ fontSize: "25px", cursor: "pointer" }}
                      onClick={() => setViewSubAdmin(false)}
                    ></i>
                  </span>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={allSubAdmins}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </div>
          </>
        ) : (
          <>
            <h2
              className="ps-3 pe-5"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <i class="fa-solid fa-gear" style={{ fontSize: "25px" }}></i>{" "}
                Account Settings
              </div>
              <div>
                {" "}
                <i
                  class="fa-solid fa-arrow-right-to-bracket"
                  title="Signout"
                  style={{ cursor: "pointer" }}
                  onClick={signout}
                ></i>
              </div>
            </h2>
            <div className="shadow-lg bg-white rounded p-3 m-auto mt-3">
              <h5 className="ps-4">
                {!showChangePassword ? "My Profile" : "Change Password"}{" "}
              </h5>

              <Card className=" p-3 m-auto mt-3" style={{ width: "95%" }}>
                {!showChangePassword ? (
                  <div className="row me-0">
                    <div className="col-md-4">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginLeft: "1rem" }}>
                          <div style={{ fontSize: "18px", fontWeight: "500" }}>
                            {adminData?.name}{" "}
                          </div>
                          <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                            <i>{adminData?.email}</i>
                          </div>
                          <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                            <i>+91 {adminData?.mobileNumber}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <div>
                          <u
                            className="admin-profile-edit"
                            title="Edit Profile"
                            onClick={handleEditprofileShow}
                          >
                            Edit Profile
                            {/* <i class="fa-solid fa-pen"></i> */}
                          </u>{" "}
                          <br />
                          <u
                            className="admin-profile-edit"
                            title="Change Password"
                            onClick={() => setShowChangePassword(true)}
                          >
                            Change Password
                            {/* <i class="fa-solid fa-pen"></i> */}
                          </u>{" "}
                          <br />
                          <u
                            className="admin-profile-edit"
                            title="Add"
                            onClick={handleShow}
                          >
                            Add Sub Admin
                            {/* <i class="fa-solid fa-plus"></i> */}
                          </u>
                          <br />
                          <u
                            className="admin-profile-edit"
                            title="View"
                            onClick={() => setViewSubAdmin(true)}
                          >
                            View Sub Admin
                          </u>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row me-0">
                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label admin-label-edit">
                        Old Password
                      </div>
                      <div className="group pt-1">
                        <input
                          className="col-md-12 vhs-input-value"
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label admin-label-edit">
                        New Password
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label admin-label-edit">
                        Confirm Password
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
              {/* change password=========== */}
              {showChangePassword ? (
                <div>
                  <div className="row  pt-3 justify-content-center">
                    <div className="col-md-1">
                      <button
                        className="vhs-button"
                        onClick={handleChangePassword}
                      >
                        Update
                      </button>
                    </div>
                    <div className="col-md-1">
                      {" "}
                      <button
                        className="vhs-button"
                        onClick={() => {
                          setShowChangePassword(false);
                          setMessage(""); // Clear the message when canceling
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div
                    className="setting-response-message-card"
                    style={{ display: message ? "block" : "none" }}
                  >
                    <p>{message}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>

      <Offcanvas
        show={showeditprofile}
        placement="end"
        onHide={handleEditprofileClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row me-0">
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Name</div>
              <div className="group pt-1">
                <input
                  className="col-md-12 vhs-input-value"
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>
            </div>{" "}
            <br />
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Mobile Number</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  value={adminMobileNumber}
                  onChange={(e) => setAdminMobileNumber(e.target.value)}
                  isReadOnly={false}
                />
              </div>
            </div>{" "}
            <br /> <br />
            <div className="col-md-8 pt-2">
              <div className="subadmin-label-edit"> Email</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
            </div>
          </div>{" "}
          <br />
          <div
            className=" mt-2 d-flex justify-center"
            style={{ justifyContent: "center", marginTop: "20px" }}
          >
            <Button
              style={{ backgroundColor: "maroon", borderColor: "maroon" }}
              onClick={updateProfile}
            >
              Update
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="dynamic"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "brown" }}>Create sub admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row me-0">
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Name</div>
              <div className="group pt-1">
                <input
                  className="col-md-12 vhs-input-value"
                  type="text"
                  // value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Email</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Mobile Number</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  // value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Password</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  // value={passord}
                  onChange={(e) => setPassord(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">Define Role's</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  // value={defineRoll}
                  onChange={(e) => setDefineRoll(e.target.value)}
                />
              </div>
            </div> */}
            <div className="col-md-6 pt-2">
              <div className="subadmin-label-edit">
                Responsibilities of the sub admin
              </div>
              <div className="group pt-1">
                <textarea
                  type="text"
                  className="col-md-12 vhs-input-value"
                  // value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className=" mt-2 d-flex justify-center"
            style={{ justifyContent: "center" }}
          >
            <Button
              style={{ backgroundColor: "maroon", borderColor: "maroon" }}
              onClick={handleEditprofileClose}
            >
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Settings;
