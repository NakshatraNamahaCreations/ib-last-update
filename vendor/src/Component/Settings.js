import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function Settings() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const [catagory, setCatagory] = useState([]);
  const formdata = new FormData();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dOB, setDOB] = useState("");
  const [profileImage, setProfileImage] = useState();

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const getAllCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
    );
    if (res.status === 200) {
      console.log(res);
      setCatagory(res.data?.catagory);
    }
  };
  useEffect(() => {
    getAllCatagory();
  }, []);

  const UpdateVendorProfile = async (e) => {
    e.preventDefault();
    try {
      const userId = user._id;
      const config = {
        url: `/vendor/updatevendorprofile/${userId}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api",
        headers: { "content-type": "application/json" },
        data: {
          firstname: firstName,
          phoneNumber: mobileNumber,
          dob: dOB,
          businessName: businessName,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success", response);
          sessionStorage.removeItem("vendor");
          alert(response.data.Success);
          window.location.assign("/");
        }
      });
    } catch (error) {
      console.error(error);
      // alert(error.);
    }
  };

  const updateProfileImage = async (e) => {
    e.preventDefault();
    formdata.append("profileImage", profileImage);
    try {
      const userId = user._id;
      const config = {
        url: `/vendor/updateprofile/${userId}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api",
        headers: { "content-type": "application/json" },
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success", response);
        }
      });
    } catch (error) {
      console.error(error);
      // alert(error.);
    }
  };

  return (
    <div className="row">
      <div style={{ paddingTop: "35px" }}>
        <h2>
          {" "}
          <i class="fa-solid fa-gear" style={{ fontSize: "25px" }}></i> Settings
        </h2>
        <div className="shadow-lg bg-white rounded p-3 m-auto mt-3">
          {/* <h5 className="ps-4">My Profile</h5> */}

          <div className="row mt-4">
            <div className="col-md-4">
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <input
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
                <button onClick={updateProfileImage}>Update</button> */}
                {/* <img
                  className="profileImage-hover"
                  src={
                    user?.profileImage === "" ||
                    user?.profileImage === undefined
                      ? "/images/camera.png"
                      : `https://api.infinitimart.in/documents/${user?.profileImage}`
                  }
                  alt=""
                  style={{
                    width: "110px",
                    height: "105px",
                    borderRadius: "100%",
                    border: "1px dashed rgb(207 207 207)",
                    padding: "3px",
                    cursor: "pointer",
                  }}
                /> */}
                <div style={{ marginLeft: "1rem" }}>
                  <h3 style={{ fontWeight: "500" }}>{user?.firstname} </h3>
                  {/* <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                      <i>{user?.customNumber}</i>
                    </div> */}
                  {/* <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                    <i>
                      {user?.distric} , {user?.state}
                    </i>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="col-md-8">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div className="admin-profile-edit">
                    <u>
                      Edit <i class="fa-solid fa-pen"></i>
                    </u>
                  </div>
                </div>
              </div> */}
          </div>

          {/* <div className="row pt-3 justify-content-center">
              <div className="col-md-1">
                <button className="settings-button">Save</button>
              </div>
            </div> */}

          <br />
          <Card className=" m-auto mt-3" style={{ width: "95%" }}>
            <div className="card-body p-4">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="settings-sub-heading">Personal Information</div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    First Name
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Email
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      value={user?.email}
                      disabled
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Phone
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      defaultValue={user?.phoneNumber}
                      className="col-md-12 settings-input-value"
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Date of birth
                  </div>
                  <div className="group pt-1">
                    <input
                      type="date"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.dob}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="row pt-3 justify-content-center">
                <div className="col-md-2">
                  <button
                    className="settings-button"
                    style={{ width: "140px" }}
                  >
                    Save
                  </button>
                </div>
              </div> */}
            </div>
          </Card>
          <br />
          {/* <Card className=" m-auto mt-3" style={{ width: "95%" }}>
            <div className="card-body p-4">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="settings-sub-heading">Address</div>
              </div>

              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Street/House No/Building
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.address}
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    District
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.distric}
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    City/State
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      defaultValue={user?.state}
                      className="col-md-12 settings-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Postal Code
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.pincode}
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-3 justify-content-center">
                <div className="col-md-2">
                  <button
                    className="settings-button"
                    style={{ width: "140px" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Card> */}
          <br />
          <Card className=" m-auto mt-3" style={{ width: "95%" }}>
            <div className="card-body p-4">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="settings-sub-heading">Business Details</div>
              </div>

              <div className="row">
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Business Name
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Business Type
                  </div>
                  <div className="group pt-1">
                    {/* <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      defaultValue={user?.businesstype}
                    /> */}
                    <input
                      type="text"
                      className="col-md-12 settings-input-value"
                      value={user?.businesstype}
                      disabled
                      // onChange={(e) => setFirstName(e.target.value)}
                    />
                    {/* <select
                      className="col-md-12 settings-input-value"
                      onChange={(e) => setBusinessType(e.target.value)}
                    >
                      <option>--Select--</option>
                      <option value="Services">Services</option>
                      <option value="Products">Products</option>
                    </select> */}
                  </div>
                </div>
                <div className="col-md-4 pt-2">
                  <div className="settings-input-label admin-label-edit">
                    Category
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      value={user?.category}
                      disabled
                      className="col-md-12 settings-input-value"
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-3 justify-content-center">
                <div className="col-md-2">
                  <button
                    className="settings-button"
                    style={{ width: "140px" }}
                    onClick={UpdateVendorProfile}
                  >
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
