import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CreateToggle } from "./Toggl_provider";
import axios from "axios";
import { toast } from "react-toastify";

export function Login() {
  const { toggle, handleshow, handlehide } = useContext(CreateToggle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enquiryNumber, setEnquiryNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const user = JSON.parse(sessionStorage.getItem("vendor"));

  const [loginWithEmail, setLoginWithEmail] = useState(true);
  const [loginWithMobile, setLoginWithMobile] = useState(false);
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  const startTimer = () => {
    setTimer(60);
    setIsTimerActive(true);
  };

  const sendOTP = () => {
    // Here you would typically make an API call to send OTP to the provided mobile number
    setShowOTPSection(true);
    startTimer();
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const vendor = async (e) => {
    e.preventDefault();
    if (!email || !password || !enquiryNumber) {
      alert("Please fill all fields");
    } else {
      try {
        const config = {
          url: "http://localhost:8000/api/vendor/login",
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
          toast.success("Login successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 6000, // milliseconds
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          });
          sessionStorage.setItem("vendor", JSON.stringify(res.data.user));
          window.location.assign("/home");
          return res;
        } else {
          alert("Email or Mobile Already Exist");
          alert(res.data.error);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          // alert(error.response.data.message);
          alert(error.response.data.error);
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
                    {!showOTPSection ? (
                      <div className="ms-5">
                        <h5 className="mb-3">CHOOSE LOGIN TYPE</h5>
                        <div>
                          <span>
                            {" "}
                            <input
                              type="radio"
                              value={loginWithEmail}
                              name="Email"
                              checked={loginWithEmail ? true : false}
                              onChange={() => {
                                setLoginWithEmail(!loginWithEmail);
                                setLoginWithMobile(false);
                              }}
                            />
                            <label> Email</label>
                          </span>
                          <span>
                            {" "}
                            <input
                              className="ms-3"
                              type="radio"
                              name="Mobile"
                              value={loginWithMobile}
                              checked={loginWithMobile ? true : false}
                              onChange={() => {
                                setLoginWithMobile(!loginWithMobile);
                                setLoginWithEmail(false);
                              }}
                            />{" "}
                            <label> Mobile</label>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>{/* <h4 className="ms-3">Enter OTP</h4> */}</>
                    )}

                    {/* email login */}
                    {loginWithEmail && !loginWithMobile && !showOTPSection ? (
                      <div className="email-type">
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
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
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
                                  onChange={(e) =>
                                    setEnquiryNumber(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Row>
                          </Row>
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
                    ) : (
                      ""
                    )}
                    {!loginWithEmail && loginWithMobile && !showOTPSection ? (
                      <>
                        <div className="mobile-type">
                          <div
                            class="input-group mb-2 mt-3"
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
                                    type="tel"
                                    placeholder="Mobile Number"
                                    maxLength={10}
                                    onChange={(e) =>
                                      setMobileNumber(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                            </Row>
                          </div>
                        </div>
                        <div className="text-center">
                          <Button
                            style={{
                              padding: "7px 14px",
                              backgroundColor: "#a9042e",
                              border: "none",
                              fontWeight: "bold",
                            }}
                            onClick={sendOTP}
                          >
                            Send OTP
                          </Button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {showOTPSection ? (
                      <>
                        <div
                          className="otp-section ms-3"
                          style={{ textAlign: "center" }}
                        >
                          <h5> Enter the OTP sent to your mobile number</h5>
                          <br />
                          <div className="otp-input-container">
                            <input
                              className="otp-input-box"
                              placeholder="Enter 4 Digits"
                            />
                          </div>

                          <br />
                          <p>
                            {timer === 0 ? (
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "#0066c7",
                                }}
                              >
                                <u
                                // onClick={() => setLoginWithMobile(true)}
                                >
                                  {" "}
                                  Resend OTP
                                </u>
                              </div>
                            ) : (
                              <div style={{ textAlign: "center" }}>
                                <p>Resend OTP in {timer} seconds</p>
                                <br />
                                <Button
                                  style={{
                                    padding: "7px 14px",
                                    backgroundColor: "#a9042e",
                                    border: "none",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                  // onClick={sendOTP}
                                >
                                  Verify
                                </Button>
                              </div>
                            )}
                          </p>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
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
