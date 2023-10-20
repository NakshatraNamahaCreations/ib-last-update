import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Sidebar from "./layout/Sidebar";

function SubAdminAccess() {
  const location = useLocation();
  const { assignRights } = location.state || {};
  console.log("data", assignRights);

  // give rights
  const [banner, setBanner] = useState(assignRights?.bannerAccess || false);
  const [vendorManagement, setVendorManagement] = useState(
    assignRights?.vendorManagementAccess || false
  );
  const [buyerManagement, setBuyerManagement] = useState(
    assignRights?.buyerManagementAccess || false
  );
  const [product, setProduct] = useState(assignRights?.productAccess || false);
  const [service, setService] = useState(assignRights?.serviceAccess || false);
  const [reviewManagements, setReviewManagements] = useState(
    assignRights?.reviewManagementsAccess || false
  );

  // giving access
  const givenRights = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/giverightsforsubadmin/${assignRights._id}`,
        method: "put",
        baseURL: "http://localhost:8000/api/subadmin",
        headers: { "content-type": "application/json" },
        data: {
          bannerAccess: banner,
          vendorManagementAccess: vendorManagement,
          buyerManagementAccess: buyerManagement,
          productAccess: product,
          serviceAccess: service,
          reviewManagementsAccess: reviewManagements,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert("Assigned");
          window.location.assign("/settings");
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };

  return (
    <div>
      <div className="row me-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 mt-5">
          <div className="m-5">
            <h6 style={{ fontSize: "20px" }}>
              Assign Rights for {assignRights?.name}{" "}
            </h6>
            <br />
            <div className="row">
              <div className="col-md-6">
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={banner}
                      onChange={(e) => setBanner(e.target.checked)}
                    />
                    <label for="vehicle1"> Banner</label>
                    <br />
                  </li>
                  <br />
                  <li>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={vendorManagement}
                      onChange={(e) => setVendorManagement(e.target.checked)}
                    />
                    <label for="vehicle1"> Vendor Management</label>
                    <br />
                  </li>
                  <br />
                  <li>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={buyerManagement}
                      onChange={(e) => setBuyerManagement(e.target.checked)}
                    />
                    <label for="vehicle1"> Buyer Management</label>
                    <br />
                  </li>
                  <br />
                  <li>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={product}
                      onChange={(e) => setProduct(e.target.checked)}
                    />
                    <label for="vehicle1"> Product</label>
                    <br />
                  </li>
                  <br />
                  <li>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={service}
                      onChange={(e) => setService(e.target.checked)}
                    />
                    <label for="vehicle1"> Service</label>
                    <br />
                  </li>
                  <br />
                  <li>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={reviewManagements}
                      onChange={(e) => setReviewManagements(e.target.checked)}
                    />
                    <label for="vehicle1"> Review Management</label>
                    <br />
                  </li>
                </ul>
              </div>
              <div className="col-md-6"></div>
            </div>
            <div>
              <Button onClick={() => window.location.assign("/settings")}>
                Close
              </Button>{" "}
              <Button onClick={givenRights}>Assign</Button>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default SubAdminAccess;
