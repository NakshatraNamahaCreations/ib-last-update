import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

import { useLocation } from "react-router-dom";

function Vendorprofile() {
  const [limitProducts, setLimitProducts] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(false);
  const location = useLocation();
  const { item } = location.state || {};

  console.log("Vendor Data:", item);

  const Approve = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/approvevendor/${item._id}`,
        method: "post",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "approved",
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

  const Disapprove = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/disapprovevendor/${item._id}`,
        method: "post",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "disapproved", // Change the vendorstatus to "disapproved"
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // alert("Vendor registration has been successfully approved");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not approved");
    }
  };

  const productLimits = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/productslimits/${item._id}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          ProductLimits: limitProducts,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert(response.data.Success);
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      // alert(error.);
    }
  };

  console.log(item.PaymentDetails);

  const checkPaymentsLength = () => {
    if (!item || !item.PaymentDetails || item.PaymentDetails.length === 0) {
      return 0;
    } else {
      const sortedPayments = item.PaymentDetails.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const mostRecentSuccessPayment = sortedPayments.filter(
        (payment) => payment.code === "PAYMENT_SUCCESS"
      );
      if (mostRecentSuccessPayment.length > 0) {
        console.log("mostRecentSuccessPayment", mostRecentSuccessPayment);
        return mostRecentSuccessPayment[0].data.amount;
      } else {
        console.log("item", item);
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
            <div className="mx-4">
              <div>
                <p>{item?.firstname}</p>
                <p>{item?.lastname}</p>
              </div>
              <p>
                <b>{item?.phoneNumber}</b>
              </p>
            </div>
            <div>
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
              </span>
            </div>
          </div>
          <div className="row me-0">
            <div className="col-md-4">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`https://api.infinitimart.in/documents/${item?.selfie}`}
                  className="vendorprofile"
                  alt=""
                  style={{ width: "25%", borderRadius: "100%" }}
                />
                <div style={{ marginLeft: "1rem" }}>
                  <div style={{ fontSize: "18px", fontWeight: "500" }}>
                    {item?.firstname} {item?.lastname}
                  </div>
                  <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                    <i>{item?.phoneNumber}</i>
                  </div>
                </div>
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
                      <b>{item?.customNumber}</b>
                    </span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>first Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.firstname}</span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Last Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.lastname}</span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Phone Number</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {item?.phoneNumber}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>DOB</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.dob}</span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Email</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.email}</span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Address</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.address}</span>
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
                      {item?.businessName}
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
                      {item?.businesstype}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness Category</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.category}</span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness website</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {item?.websiteaddress}
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
                      {item?.ProductLimits ? item?.ProductLimits : "0"}
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
            <div>
              <button
                disabled={item?.vendorstatus === "approved"}
                style={{
                  backgroundColor: "rgb(112 112 112)",
                  border: 0,
                  borderRadius: "10px",
                  color: "white",
                  padding: "4px 15px",
                  fontWeight: "700",
                }}
                onClick={() => setViewInvoice(true)}
              >
                View Invoice
              </button>
            </div>
            <div>
              <button
                // disabled={item?.vendorstatus === "approved"}
                style={{
                  backgroundColor: "#01ad3d",
                  border: 0,
                  borderRadius: "10px",
                  color: "white",
                  padding: "4px 15px",
                  fontWeight: "700",
                }}
                onClick={() => setShowTransactions(true)}
              >
                View Payments
              </button>
            </div>
            <div>
              {item?.vendorstatus === "approved" ? (
                <p style={{ color: "#01ad3d" }}>Approved</p>
              ) : (
                <button
                  disabled={item?.vendorstatus === "approved"}
                  style={{
                    backgroundColor: "#01ad3d",
                    border: 0,
                    borderRadius: "10px",
                    color: "white",
                    padding: "4px 15px",
                    fontWeight: "700",
                  }}
                  onClick={Approve}
                >
                  Approve
                </button>
              )}
            </div>
            <div>
              {item?.vendorstatus === "disapproved" ? (
                <p style={{ color: "#01ad3d" }}>Disapproved</p>
              ) : (
                <button
                  dis
                  style={{
                    backgroundColor: "#fbbc05",
                    border: 0,
                    borderRadius: "10px",
                    color: "white",
                    padding: "4px 15px",
                    fontWeight: "700",
                  }}
                  onClick={Disapprove}
                >
                  Disapprove
                </button>
              )}
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#ff4131",
                  border: 0,
                  borderRadius: "10px",
                  color: "white",
                  padding: "4px 15px",
                  fontWeight: "700",
                }}
              >
                Delete
              </button>
            </div>
          </div>
          {/* {object.keys(item).length > 0 (
            <> */}
          {showTransactions && Object.keys(item).length > 0 ? (
            <div className="pb-5">
              <div className="vendor-payment-details">
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
                    {item.PaymentDetails[0]?.data?.transactionId}
                  </p>
                  <p className="total-paid" style={{ color: "#9da1ac" }}>
                    <b>TOTAL PAID</b>
                  </p>
                  {/* <h4
                    className="amount"
                    style={{
                      fontWeight: "bold",
                      fontSize: "55px",
                      color: "#444c66",
                    }}
                  >
                    ₹ {checkPaymentsLength()}.00{" "}
                  </h4> */}
                  <h4>
                    {item.PaymentDetails[0]?.length > 0
                      ? item.PaymentDetails.filter(
                          (detail) => detail.code === "PAYMENT_SUCCESS"
                        )
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )
                          .map((successDetail, index) => (
                            <div key={index}>{successDetail.data.amount}</div>
                          ))
                      : null}
                  </h4>

                  <div className="created-at">
                    {item.PaymentDetails[0]?.createdAt}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* </>
          ):""} */}
        </div>
      </div>
    </div>
  );
}

export default Vendorprofile;
