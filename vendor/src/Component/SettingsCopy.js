import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Button } from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function SettingsCopy() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [catagory, setCatagory] = useState("");
  const [customNumber, setCustomNumber] = useState("");

  const [editfirstname, seteditfirstname] = useState(false);
  const [editlastname, seteditlastname] = useState(false);
  console.log("user", user);
  // const [first, setfirst] = useState(second);
  // const [first, setfirst] = useState(second);
  // const [first, setfirst] = useState(second);
  //  const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setItem('value', value);
  // };

  // const getValues = () => {
  //   const valuesFromStorage = sessionStorage.getItem('values');

  //   if (valuesFromStorage) {
  //     setValues(JSON.parse(valuesFromStorage));
  //   }
  // };

  return (
    <div style={{ paddingTop: "0px" }}>
      <div class="page-content page-container" id="page-content">
        <div class="padding-p">
          <div class="row container d-flex justify-content-center">
            <div class="">
              <div class="card-d user-card-full">
                <div class="row m-l-0 m-r-0" style={{ height: "100%" }}>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                        <i class="fa-solid fa-user"></i> Personal Information{" "}
                      </h6>
                      <div class="row">
                        <div class="col-sm-4 pb-4">
                          <span class="m-b-10 f-w-600">First Name</span>{" "}
                          <input defaultValue={user?.firstname} />
                        </div>
                        <div class="col-sm-4 pb-4">
                          <span class="m-b-10 f-w-600 mb-2">Last Name</span>{" "}
                          <input defaultValue={user?.lastname} />
                        </div>
                        <div class="col-sm-4">
                          <span class="m-b-10 f-w-600">Email</span>{" "}
                          <input defaultValue={user?.email} />
                        </div>
                        <div class="col-sm-4">
                          <span class="m-b-10 f-w-600">Phone Number</span> :{" "}
                          <span class="text-muted f-w-400">
                            {user?.phoneNumber}{" "}
                          </span>
                        </div>
                        <div class="col-sm-4">
                          <span class="m-b-10 f-w-600">Data of birth</span> :{" "}
                          <span class="text-muted f-w-400">{user?.dob} </span>
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        <i class="fa-solid fa-house"></i> Address{" "}
                      </h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <span class="text-muted f-w-400">
                            {user?.address},
                            <br /> {user?.distric}, <br /> {user?.state} -{" "}
                            {user?.pincode}
                          </span>
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        <i class="fa-solid fa-briefcase"></i> Business Details{" "}
                      </h6>
                      <div class="row">
                        <div className="col-md-6 pb-3">
                          {" "}
                          <span class="m-b-10 f-w-600">
                            Business Name
                          </span> :{" "}
                          <span class="text-muted f-w-400">
                            {user.businessName}{" "}
                          </span>
                        </div>

                        <div className="col-md-6 pb-3">
                          <span class="m-b-10 f-w-600">Business Type</span> :{" "}
                          <span class="text-muted f-w-400">
                            {user.businesstype}{" "}
                          </span>
                        </div>

                        <div className="col-md-6">
                          <span class="m-b-10 f-w-600">category</span> :{" "}
                          <span class="text-muted f-w-400">
                            {user.category}{" "}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <span class="m-b-10 f-w-600">Custom Number</span> :{" "}
                          <span class="text-muted f-w-400">
                            {user.customNumber}{" "}
                          </span>
                        </div>
                      </div>

                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        <i class="fa-solid fa-file-lines"></i> Documents{" "}
                      </h6>
                      <div class="row">
                        <div class="m-b-10 f-w-600">Aadhaar Card</div>
                        <div className="col-md-6 pb-3">
                          {" "}
                          <img
                            src={`http://localhost:8000/documents/${user?.adharfrontendimg}`}
                            class="img-radius"
                            alt={user?.adharfrontendimg}
                            title={user?.aadhaarNumber}
                          />
                        </div>
                        <div className="col-md-6 pb-3">
                          <img
                            src={`http://localhost:8000/documents/${user?.adharbackendimg}`}
                            class="img-radius"
                            alt={user?.adharbackendimg}
                            title={user?.aadhaarNumber}
                          />
                        </div>
                        <div className="col-md-6">
                          <div class="m-b-10 f-w-600">PAN Card </div>
                          <img
                            src={`http://localhost:8000/documents/${user?.panimg}`}
                            class="img-radius"
                            alt={user?.panimg}
                            title={user?.panNumber}
                          />
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        <i class="fa-solid fa-globe"></i> Website{" "}
                      </h6>
                      <ul class="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href={user.websiteaddress}
                            target="_blank"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            {/* <i
                              class="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i> */}
                            <img
                              src="images/chrome.png"
                              className="img-radius"
                              alt="User-Profile-Image"
                              style={{ width: "5%" }}
                            />
                          </a>
                        </li>
                        {/* <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <img
                          src={`http://localhost:8000/documents/${user?.selfie}`}
                          class="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 class="f-w-600">
                        {user?.firstname} {user?.lastname}{" "}
                      </h6>
                      <p>{user?.UserType} </p>
                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsCopy;
{
  /* <div>
        <Form className=" shadow p-3 mb-5 bg-body rounded">
          <div className="vhs-sub-heading">Account Setting</div>
          <div>
            <span>Enquiry ID:</span> <span>{user?.customNumber} </span>{" "}
          </div>
          <br />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="lable-text">
                {" "}
                First Name :{" "}
                <span>
                  {user?.firstname}{" "}
                  <i
                    class="fa-solid fa-pen"
                    title="Edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => seteditfirstname(true)}
                  ></i>{" "}
                </span>{" "}
              </Form.Label>
              {editfirstname && (
                <Form.Control
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder={user?.firstname}
                />
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="lable-text">
                Last Name :{" "}
                <span>
                  {user?.lastname}{" "}
                  <i
                    class="fa-solid fa-pen"
                    title="Edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => seteditlastname(true)}
                  ></i>{" "}
                </span>{" "}
              </Form.Label>
              {editlastname && (
                <Form.Control
                  onChange={(e) => setlastname(e.target.value)}
                  placeholder={user?.lastname}
                />
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="lable-text">
                Email : <span>{user?.email} </span>{" "}
              </Form.Label>
              {/* <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user?.email}
          //     /> */
}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   {" "}
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">Mobile Number</Form.Label>
//     <div>{user?.phoneNumber} </div>
//   </Form.Group>
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">Business Type</Form.Label>
{
  /* <Form.Control
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder={user?.businesstype}
              /> */
}
//     <div>{user?.businesstype} </div>
//   </Form.Group>{" "}
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">Alternative Number</Form.Label>
//     <div>{user?.alternativeNumber} </div>
//   </Form.Group>
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">PAN Number</Form.Label>
//     <div>{user?.panNumber} </div>
//   </Form.Group>
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">Aadhaar Number</Form.Label>
//     <div>{user?.aadhaarNumber} </div>
//   </Form.Group>
// </Row>

// <Row className="mb-3">
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">Aadhaar Front</Form.Label>
//     <img
//       src={`http://localhost:8000/documents/${user?.adharfrontendimg}`}
//       className="td-img"
//       alt="not available"
//       style={{ width: "15%" }}
//     />
//   </Form.Group>
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">Aadhaar Back</Form.Label>
//     <img
//       src={`http://localhost:8000/documents/${user?.adharbackendimg}`}
//       alt="not available"
//       width="15%"
//     />
//   </Form.Group>
//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label className="lable-text">PAN Card</Form.Label>
//     <img
//       src={`http://localhost:8000/documents/${user?.panimg}`}
//       alt="not available"
//       width="15%"
//     />
//   </Form.Group>
// </Row>

// <div className="row pt-3 justify-content-center">
//   <div className="col-md-2">
//     <button
//       className="vhs-button"
//       style={{
//         border: "none",
//         backgroundColor: "blue",
//         padding: "8px 26px",
//         borderRadius: "5px",
//         color: "white",
//       }}
//     >
//       Save
//     </button>
//   </div>
// </div> */}

{
  /* <Row className="mb-3">
              {" "}
              <div className="vhs-sub-heading">Change Password</div>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Old Email</Form.Label>
                <Form.Control placeholder="roahngupta34@gmail.com" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control placeholder="rohangupt2343" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control placeholder="rohangupt2346@" />
              </Form.Group>
            </Row> */
}
{
  /* <div className="row pt-3 justify-content-center">
              <div className="col-md-2">
                <button className="vhs-button" style={{ width: "140px" }}>
                  Change Password
                </button>
              </div>
            </div> */
}
{
  /* </Form>
      </div> */
}
