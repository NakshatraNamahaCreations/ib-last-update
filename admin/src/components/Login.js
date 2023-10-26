import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";
import { toast } from "react-toastify";

export function Login() {
  const { toggle, handleshow, handlehide } = useContext(CreateToggle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  // const handleLogin = async () => {
  //   try {
  //     // Make the API request
  //     const response = await fetch(
  //       "https://api.infinitimart.in/api/superadmin/superadminlogin",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (response.ok) {
  //       // alert(data.success);
  //       toast.success("Login successful", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 6000, // milliseconds
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         draggable: true,
  //         theme: "colored",
  //       });
  //       console.log(data.success);
  //       // Store admin data in session storage
  //       sessionStorage.setItem("adminData", JSON.stringify(data.user));

  //       // Redirect to dashboard or wherever you need to go
  //       // For example, you can use React Router to navigate to the dashboard
  //       window.location.assign("/home");
  //     } else {
  //       // Handle error messages or invalid login
  //       console.log(data.error);
  //       alert(data.error);
  //       // alert("Try again");
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  const handleLogin = async () => {
    setEmailError(""); // Reset email error
    setPasswordError(""); // Reset password error
    setError(""); // Reset general error

    try {
      const response = await fetch(
        "https://api.infinitimart.in/api/superadmin/superadminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            password: password.toLowerCase(),
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });

        sessionStorage.setItem("adminData", JSON.stringify(data.user));
        window.location.assign("/home");
      } else if (data.error) {
        setError(data.error);
      } else if (data.field) {
        if (data.field === "email") {
          setEmailError(data.message);
        } else if (data.field === "password") {
          setPasswordError(data.message);
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="row justify-content-center me-0"
        style={{ alignItems: "center" }}
      >
        <div className="col-9" style={{ marginTop: "5%" }}>
          <Card style={{ boxShadow: "0px 0px 5px 2px lightgray" }}>
            <Form>
              <div style={{ display: "flex" }}>
                <div className="col-6">
                  <img
                    src="./images/frontimage.jpg"
                    alt=""
                    style={{ width: "100%", height: "500px" }}
                  />
                </div>
                <div className="col-6">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 5,
                    }}
                  >
                    <img
                      src="./images/newlogo.png"
                      className="img-fluid"
                      style={{ width: "300px" }}
                      alt=""
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
                              isInvalid={emailError !== ""}
                            />
                          </Form.Group>
                          {emailError && (
                            <div style={{ color: "red" }}>{emailError}</div>
                          )}
                        </Row>
                        {/* <Row className="mb-3">
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
                                  bottom: "26%",
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
                                  position: "absolute ",
                                  left: "86%",
                                  bottom: "26%",
                                }}
                                onClick={handleshow}
                              ></i>
                            </Form.Group>
                          )}
                        </Row> */}
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control
                              type={passwordVisible ? "text" : "password"}
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              isInvalid={passwordError !== ""}
                            />
                            <i
                              className={`fa-regular fa-eye${
                                passwordVisible ? "" : "-slash"
                              }`}
                              style={{
                                position: "absolute",
                                left: "86%",
                                bottom: "26%",
                                cursor: "pointer",
                              }}
                              onClick={togglePasswordVisibility}
                            ></i>
                          </Form.Group>
                        </Row>
                        {passwordError && (
                          <div style={{ color: "red" }}>{passwordError}</div>
                        )}
                      </Row>
                    </div>
                    {error && (
                      <p
                        style={{
                          color: "red",
                          marginTop: -30,
                          textAlign: "center",
                        }}
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  {/* <div class="form-check" style={{ marginLeft: "114px" }}>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Remeber me" />
                    </Form.Group>
                  </div> */}
                  <div className="text-center pt-3">
                    {/* <Link to="/home"> */}
                    <Button
                      style={{
                        width: "300px",
                        padding: "4px",
                        backgroundColor: "#a9042e",
                        border: "none",
                        fontWeight: "bold",
                      }}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                    {/* </Link> */}
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
