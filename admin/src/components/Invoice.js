import React, { useState } from "react";
import Header from "./layout/Header";
import { Button, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import moment from "moment/moment";
import * as html2pdf from "html2pdf.js";

function Invoice() {
  const location = useLocation();
  const { invoiceData } = location.state || {};
  console.log("invoiceData", invoiceData);

  const exportData = () => {
    window.print();
  };

  return (
    <div>
      <Header />
      <div
        className="ps-5 pe-3 pt-5 d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <div>
          <h2>Invoice</h2>
        </div>
        <div>
          <Button variant="primary" onClick={exportData}>
            Print Invoice
          </Button>
        </div>
      </div>
      <div className="ps-5 pe-3" id="invoiceContent">
        <div className="row me-0 invoiceBorder">
          <div className="col-md-6 invoiceBorder text-center">
            <img src="./images/newlogo.png" style={{ width: "50%" }} alt="" />
          </div>
          <div
            className="col-md-6 invoiceBorder"
            style={{ borderTopRightRadius: "1px solid rgb(173, 173, 173)" }}
          >
            <h3 className="text-center mt-5" style={{ fontSize: "70px" }}>
              Invoice
            </h3>
          </div>
          <div className="col-md-6 invoiceBorder pt-2 ps-1 pb-2">
            <h6 style={{ fontSize: "20px" }}>Infinity Business Ventures</h6>
            <div>GST NO: 29CIYPA9033R2Z5</div>
            <div>Contact: 9108819955/ 9108817722</div>
            <div>Email ID: info@infinitymart.in</div>
          </div>
          <div className="col-md-6 invoiceBorder  pt-2 ps-1 pb-2">
            <h6> </h6>
            <div className="row">
              <div className="col-md-3">
                <b>Date:</b>
              </div>
              <div className="col-md-9">{moment().format("DD-MM-YYYY")}</div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <b>Invoice #:</b>
              </div>
              <div className="col-md-9">No</div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <b>Vendor Code:</b>
              </div>
              <div className="col-md-9">{invoiceData?.customNumber} </div>
            </div>
          </div>
          <div className="col-md-6 invoiceBorder  pt-2 ps-1 pb-2">
            <h5>To:</h5>
            <div className="ms-4">
              <div>{invoiceData?.firstname} </div>
              <div>{invoiceData?.businessName} </div>
              <div>{invoiceData?.gst} </div>
              {/* <div>{invoiceData?.firstname} </div>
              <div>{invoiceData?.firstname} </div> */}
              <div>+91-{invoiceData?.phoneNumber} </div>
            </div>
          </div>
          <div className="col-md-6 invoiceBorder  pt-2 ps-1 pb-2">
            <h6> </h6>
            <div className="row">
              <div className="col-md-3">
                <b>Referral Code:</b>
              </div>
              <div className="col-md-9">{/* referral code */}</div>
            </div>
          </div>
        </div>
        <div>
          <Table
            bordered
            // responsive
            style={{
              borderColor: "rgb(173, 173, 173)",
              marginLft: -"12px",
              width: "81rem",
              marginLeft: "-12px",
              borderLeft: "2px solid rgb(173, 173, 173)",
              borderBottom: "2px solid rgb(173, 173, 173)",
              borderRight: "2px solid rgb(173, 173, 173)",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid rgb(173, 173, 173)",
                  borderRight: "3px solid rgb(173, 173, 173)",
                }}
              >
                <th className="text-center">
                  <b> SL.No</b>
                </th>
                <th className="text-center" style={{ width: "332px" }}>
                  <b>Description</b>
                </th>
                <th className="text-center">
                  <b> Qty</b>
                </th>
                <th className="text-center">
                  <b>Unit Price</b>
                </th>
                <th className="text-center">
                  <b>Total Price</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>1</td>
                <td>Subscription Fee for infinitimart</td>
                <td> 1</td>

                <td>
                  ₹
                  {(invoiceData?.PaymentDetails[0]?.data?.amount / 100).toFixed(
                    2
                  )}
                </td>
                <td>
                  {" "}
                  ₹{" "}
                  {(invoiceData?.PaymentDetails[0]?.data?.amount / 100).toFixed(
                    2
                  )}{" "}
                </td>
              </tr>
              <tr className="text-center" style={{ height: "36px" }}>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr className="text-center">
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <b>Total Amount</b>{" "}
                </td>
                <td>
                  <b>
                    {" "}
                    ₹
                    {(
                      invoiceData?.PaymentDetails[0]?.data?.amount / 100
                    ).toFixed(2) - 180}
                  </b>{" "}
                </td>
              </tr>
              <tr className="text-center">
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <b>GST @ 18%</b>{" "}
                </td>
                <td>
                  <b>
                    ₹{" "}
                    {(
                      invoiceData?.PaymentDetails[0]?.data?.amount / 100
                    ).toFixed(2) - 999}{" "}
                  </b>{" "}
                </td>
              </tr>
              <tr className="text-center">
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <b>Grand Total</b>{" "}
                </td>
                <td>
                  <b>
                    ₹
                    {Math.round(
                      (
                        invoiceData?.PaymentDetails[0]?.data?.amount / 100
                      ).toFixed(2)
                    )}
                  </b>
                </td>
              </tr>
              <tr>
                <td className="text-center" colSpan={7}>
                  Make all cheques payable to Infinity Business Ventures
                </td>
              </tr>
              <tr>
                <td className="text-center" colSpan={7}>
                  <b>Thank you for your business</b>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="pb-3 text-center">
            infinitimart,154, 1st Floor, Padmashree building, Mariyappanapalya,
            Bengaluru, Karnataka 560056
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
