import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import { Link, useLocation, useParams } from "react-router-dom";
import moment from "moment/moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Vendorprofile() {
  const { id } = useParams();

  const [limitProducts, setLimitProducts] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [message, setMessage] = useState("");
  const [vendorPaymentsData, setVendorPaymentsData] = useState([]);

  // const location = useLocation();

  useEffect(() => {
    getvendorWithPayments();
  }, []);

  const getvendorWithPayments = async () => {
    try {
      let res = await axios.get(
        "https://api.infinitimart.in/api/vendor/getuserswithpaymentsdata"
      );
      if (res.status === 200) {
        const vendorsPayments = res.data?.vendorsPayments;
        setVendorPaymentsData(
          vendorsPayments.filter((data) => data?._id === id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("========", vendorPaymentsData);

  const deleteUserAccount = async () => {
    try {
      const response = await axios.post(
        `https://api.infinitimart.in/api/vendor/delete/${id}`
      );
      if (response.status === 200) {
        console.log("delete successfully");
        window.location.assign("/vendormanagement");
      } else {
        alert("Error", "Account deletion failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error",
        "An error occurred. Please check your internet connection."
      );
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("yeyeyey", id);

  const Approve = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/approvevendor/${id}`,
        method: "post",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "approved",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not approved");
    }
  };

  const Disapprove = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/disapprovevendor/${id}`,
        method: "post",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "disapproved",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not approved");
    }
  };

  // const productLimits = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const config = {
  //       url: `/productslimits/${item._id}`,
  //       method: "put",
  //       baseURL: "https://api.infinitimart.in/api/vendor",
  //       headers: { "content-type": "application/json" },
  //       data: {
  //         ProductLimits: limitProducts,
  //       },
  //     };
  //     await axios(config).then(function (response) {
  //       if (response.status === 200) {
  //         alert(response.data.Success);
  //         window.location.reload("");
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const productLimits = async (e) => {
    e.preventDefault();

    if (!limitProducts) {
      setMessage("Please enter product limit");
      return;
    }

    try {
      const config = {
        url: `/productslimits/${id}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          ProductLimits: limitProducts,
        },
      };

      await axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setMessage(response.data.Success); // Set the success message
            window.location.reload("");
            getvendorWithPayments();
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 400) {
            setMessage("Please enter product limit"); // Set the error message
          } else {
            setMessage(error.response.data.error); // Set other error messages
          }
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(item.PaymentDetails);

  const checkPaymentsLength = () => {
    if (
      !vendorPaymentsData[0] ||
      !vendorPaymentsData[0].PaymentDetails ||
      vendorPaymentsData[0].PaymentDetails.length === 0
    ) {
      return 0;
    } else {
      const sortedPayments = vendorPaymentsData[0].PaymentDetails.sort(
        (a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      );

      const mostRecentSuccessPayment = sortedPayments.filter(
        (payment) => payment.code === "PAYMENT_SUCCESS"
      );
      if (mostRecentSuccessPayment.length > 0) {
        console.log("mostRecentSuccessPayment", mostRecentSuccessPayment);
        return mostRecentSuccessPayment[0].data.amount;
      } else {
        return 0;
      }
    }
  };

  const returnAmount = checkPaymentsLength();
  console.log("returnAmount", returnAmount);

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div>
          <h5 className="p-3 text-center">
            <b>Vendor Profile</b>
          </h5>
          <hr />
          <div className="d-flex">
            {/* <div>
              <img
                src={`https://api.infinitimart.in/documents/${item?.selfie}`}
                className="vendorprofile"
              />
            </div> */}
            {/* <div className="mx-4">
              <div>
                <p>{item?.firstname}</p>
                <p>{item?.lastname}</p>
              </div>
              <p>
                <b>{item?.phoneNumber}</b>
              </p>
            </div> */}
            <div className="mx-4">
              <a href="/vendormanagement">
                <div className="back-icon">
                  <i class="fa-solid fa-arrow-left"></i>
                </div>
              </a>
              <span>
                <b>Products Limited</b>{" "}
              </span>{" "}
              :{" "}
              <span>
                <input
                  type="number"
                  min={1}
                  style={{ width: "35%" }}
                  placeholder="Min 1"
                  onChange={(e) => setLimitProducts(e.target.value)}
                />{" "}
              </span>
              <span>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#afffca",
                    borderRadius: "3px",
                    padding: "3px 12px",
                  }}
                  onClick={productLimits}
                >
                  Add
                </button>
                <div>
                  {message && <p style={{ color: "red" }}>{message}</p>}
                </div>
              </span>
            </div>
          </div>
          <div className="row me-0">
            <div className="col-md-4">
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <img
                  src={`https://api.infinitimart.in/documents/${item?.selfie}`}
                  className="vendorprofile"
                  alt=""
                  style={{ width: "25%", borderRadius: "100%" }}
                /> */}
                {/* <img
                  src="/images/newlogo.png"
                  className="vendorprofile"
                  alt=""
                  style={{ width: "25%", borderRadius: "100%" }}
                /> */}
                {/* <div style={{ marginLeft: "1.5rem", marginTop: "10px" }}>
                  <div style={{ fontSize: "18px", fontWeight: "500" }}>
                    {item?.firstname} {item?.lastname}
                  </div>
                  <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                    <i>{item?.phoneNumber}</i>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className="card p-4 mt-3"
            style={{ borderRadius: "25px", backgroundColor: "#afffca" }}
          >
            <div className="row">
              <div className="col-6">
                <div className="row p-2">
                  <div className="col-4">
                    <b>Vendor Code</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ color: "#009834" }}>
                      <b>{vendorPaymentsData[0]?.customNumber}</b>
                    </span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b> Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.firstname}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Phone Number</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.phoneNumber}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Email</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.email}
                    </span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Address</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.address}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.businessName}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Business Type</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.businesstype}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness Category</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.category}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness website</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.websiteaddress}
                    </span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Product Limits</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {vendorPaymentsData[0]?.ProductLimits
                        ? vendorPaymentsData[0]?.ProductLimits
                        : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex p-5"
            style={{ justifyContent: "space-evenly" }}
          >
            {vendorPaymentsData[0]?.PaymentDetails.length === 0 ? (
              ""
            ) : (
              <div>
                <Link
                  to="/invoice"
                  state={{ invoiceData: vendorPaymentsData[0] }}
                >
                  <button
                    disabled={
                      vendorPaymentsData[0]?.PaymentDetails.length === 0
                    }
                    style={{
                      backgroundColor: "rgb(112 112 112)",
                      border: 0,
                      borderRadius: "10px",
                      color: "white",
                      padding: "4px 15px",
                      fontWeight: "700",
                    }}
                  >
                    View Invoice
                  </button>
                </Link>
              </div>
            )}

            <div onClick={() => setShowTransactions(true)}>
              <button
                style={{
                  backgroundColor: "rgb(36 150 255)",
                  border: 0,
                  borderRadius: "10px",
                  color: "white",
                  padding: "4px 15px",
                  fontWeight: "700",
                }}
                onClick={handleShow}
              >
                View Payments
              </button>
            </div>
          </div>

          <Modal show={show} onHide={handleClose} centered animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showTransactions &&
              vendorPaymentsData[0]?.PaymentDetails.length !== 0 ? (
                <div className="pb-5">
                  <div className="">
                    <div className="svg-container">
                      <p
                        className="transaction-id"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          color: "#0044ff",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        Transaction ID:{" "}
                        {
                          vendorPaymentsData[0]?.PaymentDetails[0]?.data
                            ?.transactionId
                        }
                      </p>
                      <p className="total-paid" style={{ color: "#9da1ac" }}>
                        <b>TOTAL PAID</b>
                      </p>
                      <h4
                        className="amount"
                        style={{
                          fontWeight: "bold",
                          fontSize: "55px",
                          color: "#444c66",
                        }}
                      >
                        <td>₹ {(checkPaymentsLength() / 100).toFixed(2)} </td>
                      </h4>

                      <div className="created-at">
                        {moment(
                          vendorPaymentsData[0]?.PaymentDetails[0]?.createdAt
                        ).format("dddd, MMMM Do YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {showTransactions &&
                  vendorPaymentsData[0]?.PaymentDetails.length === 0 ? (
                    <div className="pb-5">No Payment History</div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Vendorprofile;
