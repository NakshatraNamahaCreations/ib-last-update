import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CreateToggle } from "./Toggl_provider";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import createNotification from "./reactNotification";

export function Login() {
  const { toggle, handleshow, handlehide } = useContext(CreateToggle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enquiryNumber, setEnquiryNumber] = useState("");
  const user = JSON.parse(sessionStorage.getItem("vendor"));

  const vendor = async (e) => {
    e.preventDefault();
    if (!email || !password || !enquiryNumber) {
      alert("Please fill all fields");
      createNotification("danger", "All Fields are required", 3000)();
    } else {
      try {
        const config = {
          url: "https://api.infinitimart.in/api/vendor/login",
          method: "POST",
          headers: { "content-type": "application/json" },
          data: {
            email: email,
            password: password,
            customNumber: enquiryNumber,
          },
        };
        let res = await axios(config);
        console.log(res.data);
        if (res.status === 200) {
          // alert("Login successful");
          createNotification("success", "Login Success", 3000)();
          sessionStorage.setItem("vendor", JSON.stringify(res.data.user));
          // window.location.assign("/home");
          setTimeout(() => {
            window.location.assign("/home");
          }, 1000); // Redirect after 5 seconds

          return res;
        } else {
          // createNotification("warning", "Email or Mobile Already Exist", 3000);
          // // createNotification(res.data.error);
          alert(res.data.error);
        }
      } catch (error) {
        // console.log(error.response);
        if (error.response) {
          alert(error.response.data.error);
          // createNotification("warning", "error.response.data.error");
          console.log("warning");
        }
      }
    }
  };
  return (
    <div>
      <div
        className="row me-0 justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div className="col-9" style={{ marginTop: "5%" }}>
          <Card style={{ boxShadow: "0px 0px 5px 2px lightgray" }}>
            <Form>
              <div style={{ display: "flex" }}>
                <div className="col-6">
                  <img
                    src="./images/banner.jpg"
                    style={{ width: "100%", height: "500px" }}
                  />
                </div>
                <div className="col-6 ">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 5,
                    }}
                  >
                    <img
                      src="images/Infinitimart_Logo.png"
                      className="img-fluid"
                      style={{ width: "180px" }}
                    />
                  </div>
                  <div className="inputlogin">
                    <div
                      class="input-group mb-4 mt-3"
                      style={{
                        display: "block",
                        width: "90%",
                        marginLeft: "40px",
                      }}
                    >
                      <Row className="mb-3">
                        {" "}
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          {!toggle ? (
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="text"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i
                                class="fa-regular fa-eye "
                                style={{
                                  position: "absolute",
                                  left: "86%",
                                  bottom: "50%",
                                }}
                                onClick={handlehide}
                              ></i>
                            </Form.Group>
                          ) : (
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />

                              <i
                                class="fa-solid fa-eye-slash "
                                style={{
                                  position: "absolute",
                                  left: "86%",
                                  bottom: "50%",
                                }}
                                onClick={handleshow}
                              ></i>
                            </Form.Group>
                          )}
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control
                              type="text"
                              placeholder="Vendor Code"
                              onChange={(e) => setEnquiryNumber(e.target.value)}
                            />
                          </Form.Group>
                        </Row>
                      </Row>
                    </div>
                  </div>
                  <div class="form-check" style={{ marginLeft: "114px" }}>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Remeber me" />
                    </Form.Group>
                  </div>
                  <div className="text-center pt-3">
                    <Button
                      style={{
                        width: "300px",
                        padding: "4px",
                        backgroundColor: "#a9042e",
                        border: "none",
                        fontWeight: "bold",
                      }}
                      onClick={vendor}
                    >
                      Login
                    </Button>

                    {/* <div style={{ margin: "20px" }}>
                      <Link className="link_but" to="/Signup">
                        or sign up
                      </Link>
                    </div> */}
                    <div></div>
                  </div>
                </div>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
