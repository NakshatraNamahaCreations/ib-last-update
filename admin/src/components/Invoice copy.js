import React from "react";
import Header from "./layout/Header";

function Invoice() {
  return (
    <div>
      <Header />
      <h1 style={{ color: "#3498db" }}>Invoice</h1>
      <div className="mt-3 p-2">
        <div className="row me-0 ">
          <div className="col-md-6 invoiceBorder">
            <img src="./images/newlogo.png" style={{ width: "20%" }} alt="" />
          </div>
          <div className="col-md-6 invoiceBorder">
            <p>GST INVOICE</p>
            <p>Original For Recipient</p>
            <p>
              <b>Invoice# , Date :</b> 08/14/2023
            </p>
          </div>
        </div>
        <div className=" shadow  " style={{ border: "none" }}>
          <div className="row m-auto">
            <div className="mt-3 text-center" style={{ color: "#a9042e" }}>
              website : www.vijayhomeservices | mail :
              support@vijayhomeservices.com
            </div>

            <div className="mt-2 text-center" style={{ color: "black" }}>
              BANGALORE - HYDERABAD - CHENNAI - PUNE - MUMBAI - AHMEDABAD -
              VADODARA - SURAT - LUCKNOW - NCR - INDIA - GURGAON - FARIDABAD -
              GHAZIABAD - BHUVANESHWAR - KOCHI
            </div>

            <div className="mt-2 text-center pb-2" style={{ color: "#a9042e" }}>
              Customer Care : +91 845 374 8478
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
