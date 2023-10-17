import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const adminData = JSON.parse(sessionStorage.getItem("adminData"));
  const [data, setdata] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [Subcatagory, setSubcatagory] = useState([]);
  const [revenueData, setRevenueData] = useState({});

  const getvendor = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/getalluser"
    );
    if (res.status === 200) {
      setdata(res.data.vendorprofile);
    } else {
      console.log("error");
    }
  };

  const getAllCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
    );
    if (res.status === 200) {
      console.log(res);
      setCatagory(res.data?.catagory);
    }
  };

  const getAllSubCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/product/subcatagory/getsubcatagory"
    );
    if (res.status === 200) {
      console.log("subcatagory===", res);
      setSubcatagory(res.data?.subcatagory);
    }
  };

  useEffect(() => {
    getvendor();
    getAllCatagory();
    getAllSubCatagory();
  }, []);

  const chartData = [
    { month: "Jan", revenue: 100 },
    { month: "Feb", revenue: 200 },
    { month: "Mar", revenue: 150 },
    { month: "Apr", revenue: 300 },
    { month: "May", revenue: 250 },
    { month: "Jun", revenue: 400 },
  ];

  return (
    <div>
      <div className="pt-4 pb-4" style={{ display: "flex" }}>
        <div className="ms-2">
          <h2>Analytics Dashboard</h2>
        </div>
      </div>
      <div className="row pt-3 me-0">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6 col-grid">
              <a href="/banner" className="cm-redirect">
                <Card className="content-mana-card">
                  <div className="cm-card-bg">
                    <div className="count_content cm-font-awsm">
                      <p>Revenue</p>{" "}
                      <h3 className="count_content-head">
                        ₹ <span class="counter">0</span>
                      </h3>
                    </div>
                    <a href="#" class="notification_btn">
                      Today
                    </a>
                  </div>
                  {/* <div className="cm-text-content">Products</div> */}
                </Card>
              </a>
            </div>
            <div className="col-md-6 col-grid">
              <a href="/editproducts" className="cm-redirect">
                <Card className="content-mana-card">
                  <div className="cm-card-bg">
                    <div className="count_content cm-font-awsm">
                      <p>Orders</p>{" "}
                      <h3 className="count_content-head">
                        <span class="counter">0</span>
                      </h3>
                    </div>
                    <a
                      href="#"
                      class="notification_btn"
                      style={{ backgroundColor: "#055160" }}
                    >
                      Today
                    </a>
                  </div>
                  {/* <div className="cm-text-content">Products</div> */}
                </Card>
              </a>
            </div>
          </div>
        </div>
        <div className="col col-grid">
          <a href="/editproducts" className="cm-redirect">
            <Card className="content-mana-card">
              <div className="cm-card-bg">
                <div className="count_content cm-font-awsm">
                  <p>Vendor</p>{" "}
                  <h3 className="count_content-head">
                    <span class="counter">{data?.length} </span>
                  </h3>
                </div>
                <a
                  href="#"
                  class="notification_btn"
                  style={{ backgroundColor: "#fe4d3c" }}
                >
                  Total
                </a>
              </div>
              {/* <div className="cm-text-content">Products</div> */}
            </Card>
          </a>
        </div>
        <div className="col col-grid">
          <a href="/editproducts" className="cm-redirect">
            <Card className="content-mana-card">
              <div className="cm-card-bg">
                <div className="count_content cm-font-awsm">
                  <p>Buyer</p>{" "}
                  <h3 className="count_content-head">
                    <span class="counter">300</span>
                  </h3>
                </div>
                <a
                  href="#"
                  class="notification_btn"
                  style={{ backgroundColor: "#1eb852" }}
                >
                  Total
                </a>
              </div>
            </Card>
          </a>
        </div>

        <div className="col-md-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
