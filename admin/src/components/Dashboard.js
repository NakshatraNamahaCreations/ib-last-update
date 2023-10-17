import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const [vendor, setVendor] = useState([]);
  const [payment, setPayment] = useState([]);
  const [buyerData, setBuyerData] = useState([]);
  const [sequenceData, setSequenceData] = useState([]);
  const [vendorSequence, setVendorSequence] = useState("");

  const [lastWeekPercentageOfVendor, setLastWeekPercentageOfVendor] =
    useState(0);
  const [lastWeekPercentageOfBuyers, setLastWeekPercentageOfBuyers] =
    useState(0);
  const [lastWeekPercentageOfPayment, setLastWeekPercentageOfPayment] =
    useState(0);

  const getVendor = async () => {
    let res = await axios.get("http://localhost:8000/api/vendor/getalluser");
    if (res.status === 200) {
      setVendor(res.data.vendorprofile);
    } else {
      console.log("error");
    }
  };
  // console.log("vendor", vendor);

  const getPayment = async () => {
    let res = await axios.get("http://localhost:8000/api/payment/getpayments");
    if (res.status === 200) {
      setPayment(res.data.success);
    } else {
      console.log("error");
    }
  };

  const getAllBuyres = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/buyer/getalluser");
      if (res.status === 200) {
        const buyerDetails = res.data?.buyerProfile;
        setBuyerData(buyerDetails);
        console.log("buyerDetails", buyerDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("payment", payment);
  const calculateLastWeekPaymentPercentage = () => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const lastWeekVendors = payment.filter(
      (v) =>
        new Date(v.createdAt) >= oneWeekAgo &&
        new Date(v.createdAt) <= currentDate &&
        v.code === "PAYMENT_SUCCESS"
    );
    const percentage =
      (lastWeekVendors.length /
        payment.filter((v) => v.code === "PAYMENT_SUCCESS").length) *
      100;
    setLastWeekPercentageOfPayment(percentage.toFixed(2));
  };

  const transformDataForPaymentChart = () => {
    // Group payment data by month and count successful payments
    const paymentByMonth = payment.reduce((result, item) => {
      const createdAt = new Date(item.createdAt);
      const month = createdAt.toLocaleString("default", { month: "short" });
      if (item.code === "PAYMENT_SUCCESS") {
        result[month] = (result[month] || 0) + 1;
      }
      return result;
    }, {});

    // Create an array with the transformed data suitable for the chart
    const chartData = Object.keys(paymentByMonth).map((month) => ({
      month,
      // revenue: paymentByMonth[month],
      Payments: paymentByMonth[month],
    }));

    return chartData;
  };

  // const transformDataForVendorChart = () => {
  //   // Group vendor data by week and count the number of vendors registered
  //   const vendorByWeek = vendor.reduce((result, item) => {
  //     const createdAt = new Date(item.createAt);
  //     const weekNumber = Math.floor(
  //       (createdAt - new Date(createdAt.getFullYear(), 0, 1)) /
  //         (7 * 24 * 60 * 60 * 1000)
  //     );
  //     result[weekNumber] = (result[weekNumber] || 0) + 1;
  //     return result;
  //   }, {});

  //   // Create an array with the transformed data suitable for the chart
  //   const chartData = Object.keys(vendorByWeek).map((week) => ({
  //     week: `Week ${parseInt(week) + 1}`,
  //     count: vendorByWeek[week],
  //   }));

  //   return chartData;
  // };

  const transformDataForVendorChart = () => {
    // Group vendor data by month and count the number of vendors registered
    const vendorByMonth = vendor.reduce((result, item) => {
      const createdAt = new Date(item.createAt);
      const yearMonth = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      result[yearMonth] = (result[yearMonth] || 0) + 1;
      return result;
    }, {});

    // Create an array with the transformed data suitable for the chart
    const chartData = Object.keys(vendorByMonth).map((month) => ({
      month,
      count: vendorByMonth[month],
    }));

    return chartData;
  };

  useEffect(() => {
    calculateLastWeekPaymentPercentage();
  }, [payment]);

  const calculateLastWeekVendorPercentage = () => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    const lastWeekVendors = vendor.filter(
      (v) =>
        new Date(v.createAt) >= oneWeekAgo &&
        new Date(v.createAt) <= currentDate
    );

    const percentage = (lastWeekVendors.length / vendor.length) * 100;
    setLastWeekPercentageOfVendor(percentage.toFixed(2));
  };

  const calculateLastWeekBuyerPercentage = () => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    const lastWeekBuyers = buyerData.filter(
      (v) =>
        new Date(v.createAt) >= oneWeekAgo &&
        new Date(v.createAt) <= currentDate
    );

    const percentage = (lastWeekBuyers.length / buyerData.length) * 100;
    setLastWeekPercentageOfBuyers(percentage.toFixed(2));
  };

  useEffect(() => {
    getVendor();
    getPayment();
    getAllBuyres();
    getSequenceNumber();
  }, []);

  useEffect(() => {
    calculateLastWeekVendorPercentage();
  }, [vendor]);

  useEffect(() => {
    calculateLastWeekBuyerPercentage();
  }, [buyerData]);

  // Calculate the total amount for successful payments
  const totalAmount = payment
    .filter((item) => item.code === "PAYMENT_SUCCESS")
    .reduce((total, item) => {
      // console.log("Adding amount:", item.data.amount);
      return total + item.data.amount;
    }, 0);

  const lenht = payment.filter((item) => item.code === "PAYMENT_SUCCESS");
  // console.log("Payment success length", lenht.length);

  const addSequences = async () => {
    try {
      const config = {
        url: "/admin/updatevendorcodesequence",
        method: "post",
        baseURL: "http://localhost:8000/api",
        data: {
          vendorSequenceNumber: vendorSequence,
        },
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  const getSequenceNumber = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8000/api/admin/getsequencecode"
      );
      if (res.status === 200) {
        const theSequence = res.data?.Sequence;
        setSequenceData(theSequence);
        console.log("theSequence", theSequence);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: " #f9f9f9",
        // "#f7f7f7"
      }}
    >
      <div
        className="d-flex p-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Analytics Dashboard</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Vendor Code Sequence"
            style={{
              borderRadius: "7px",
              padding: "5px 7px",
              boxShadow: "0px 1px 3px 0px gray",
              border: 0,
            }}
            onChange={(e) => setVendorSequence(e.target.value)}
          />{" "}
          <button
            style={{
              border: 0,
              borderRadius: "7px",
              padding: "4px 7px",
              backgroundColor: "#b8b5e8",
              boxShadow: "0px 1px 3px 0px gray",
            }}
            onClick={addSequences}
          >
            Add
          </button>{" "}
          <br />
          {sequenceData[0]?.vendorSequenceNumber}
        </div>
      </div>

      <div className="row me-0">
        <div className="col-md-6">
          <div className="d-flex" style={{ justifyContent: "space-around" }}>
            <div className="col-grid">
              <a href="/banner" className="cm-redirect">
                <div className="content-mana-card">
                  <div className="cm-card-bg">
                    <div className="count_content cm-font-awsm">
                      <p>Revenue</p>{" "}
                      <h3 className="count_content-head">
                        ₹{" "}
                        <span class="counter">
                          {(totalAmount / 100).toFixed(2)}{" "}
                        </span>
                      </h3>
                    </div>
                    <a class="notification_btn">
                      <i class="fa-solid fa-indian-rupee-sign"></i>
                    </a>
                    <div>
                      {" "}
                      <span
                        className="dashboard-status"
                        style={{
                          backgroundColor: "rgb(174 174 255 / 57%)",
                          color: "rgb(0 0 255)",
                          fontWeight: 500,
                        }}
                      >
                        {lastWeekPercentageOfPayment} %
                      </span>{" "}
                      <span className="dashboard-status-text">
                        Since last week
                      </span>
                    </div>
                  </div>
                  {/* <div className="cm-text-content">Products</div> */}
                </div>
              </a>
            </div>
            <div className="col-grid">
              <a href="/editproducts" className="cm-redirect">
                <div className="content-mana-card">
                  <div className="cm-card-bg">
                    <div className="count_content cm-font-awsm">
                      <p>Orders</p>{" "}
                      <h3 className="count_content-head">
                        <span class="counter">0</span>
                      </h3>
                    </div>
                    <a
                      class="notification_btn"
                      style={{ backgroundColor: "#055160" }}
                    >
                      <i class="fa-solid fa-cart-shopping"></i>
                    </a>
                    <div>
                      {" "}
                      <span
                        className="dashboard-status"
                        style={{
                          backgroundColor: "rgb(5 81 96 / 29%)",
                          color: "rgb(5 81 96)",
                          fontWeight: 500,
                        }}
                      >
                        0 %
                      </span>{" "}
                      <span className="dashboard-status-text">
                        Since last week
                      </span>
                    </div>
                  </div>
                  {/* <div className="cm-text-content">Products</div> */}
                </div>
              </a>
            </div>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-around" }}>
            <div className=" col-grid">
              <a href="/editproducts" className="cm-redirect">
                <div className="content-mana-card">
                  <div className="cm-card-bg">
                    <div className="count_content cm-font-awsm">
                      <p>Vendor</p>{" "}
                      <h3 className="count_content-head">
                        <span class="counter">{vendor?.length} </span>
                      </h3>
                    </div>
                    <a
                      class="notification_btn"
                      style={{ backgroundColor: "#fe4d3c" }}
                    >
                      <i class="fa-solid fa-user-large"></i>
                    </a>
                    <div>
                      {" "}
                      <span
                        className="dashboard-status"
                        style={{
                          backgroundColor: "#ff281421",
                          color: "#fe4d3c",
                          fontWeight: 500,
                        }}
                      >
                        {lastWeekPercentageOfVendor} %
                      </span>{" "}
                      <span className="dashboard-status-text">
                        Since last week
                      </span>
                    </div>
                  </div>
                  {/* <div className="cm-text-content">Products</div> */}
                </div>
              </a>
            </div>
            <div className="col-grid">
              <a href="/editproducts" className="cm-redirect">
                <div className="content-mana-card">
                  <div className="cm-card-bg">
                    <div className="count_content cm-font-awsm">
                      <p>Buyer</p>{" "}
                      <h3 className="count_content-head">
                        <span class="counter">{buyerData?.length} </span>
                      </h3>
                    </div>
                    <a
                      class="notification_btn"
                      style={{ backgroundColor: "#1eb852" }}
                    >
                      <i class="fa-brands fa-cotton-bureau"></i>
                    </a>
                    <div>
                      {" "}
                      <span
                        className="dashboard-status"
                        style={{
                          backgroundColor: "rgb(30 184 82 / 25%)",
                          color: "rgb(30 184 82)",
                          fontWeight: 500,
                        }}
                      >
                        {lastWeekPercentageOfBuyers} %
                      </span>{" "}
                      <span className="dashboard-status-text">
                        Since last week
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="ms-3 me-3">
            <div className="content-mana-chart p-3">
              <h5 className="pb-3">Vendors Registered by Month</h5>
              {/* <ResponsiveContainer width="100%" height={300}>
                <BarChart data={transformDataForPaymentChart()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Payments" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer> */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={transformDataForVendorChart()}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-mana-chart p-3">
            <h5 className="pb-3">Payments by Month</h5>
            <ResponsiveContainer width="100%" height={213}>
              <AreaChart data={transformDataForPaymentChart()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Payments"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformDataForChart()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Payments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
