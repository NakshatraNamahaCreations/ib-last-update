import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";

function Review() {
  const data = [
    {
      name: "Electronic Gadgets",
      Positive: 129,
      Negative: 15,
    },
    {
      name: "Furniture",
      Positive: 109,
      Negative: 22,
    },
    {
      name: "Home Appliences",
      Positive: 20,
      Negative: 16,
    },
    {
      name: "Stationary stores",
      Positive: 40,
      Negative: 19,
    },
    {
      name: "Fashion",
      Positive: 6,
      Negative: 32,
    },
    {
      name: "Kids",
      Positive: 100,
      Negative: 12,
    },
    {
      name: "Women",
      Positive: 200,
      Negative: 5,
    },
  ];

  return (
    <div className="row">
      <div className="row mt-3 justify-content-center">
        <div
          className="col-md-10 shadow p-3 mb-5 bg-white rounded"
          style={{ marginLeft: "-50px" }}
        >
          <h5>Review Status</h5>

          <div className="d-flex pt-3">
            {/* <div className="d-border" style={{ backgroundColor: "skyblue" }}>
              <span> LAST 90 DAYS</span>
              <span>
                <i
                  class="fa fa-caret-down"
                  style={{ color: "rgb(120 119 119 / 60%)", fontSize: "20px" }}
                ></i>
              </span>
            </div> */}
            <select
              style={{
                borderRadius: "16px",
                padding: "6px",
                backgroundColor: "skyblue",
                borderColor: "skyblue",
              }}
            >
              <option>Last 90 Days</option>
              <option>Last 30 Days</option>
            </select>
            <div
              className="d-border mx-3"
              style={{
                border: "1px solid #d9d1d1",
                padding: "6px 15px",
                borderRadius: "17px",
              }}
            >
              Today
            </div>
          </div>

          <BarChart
            width={730}
            height={250}
            data={data}
            style={{ marginTop: "25px" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Negative" fill="#8884d8" />
            <Bar dataKey="Positive" fill="#82ca9d" />
          </BarChart>

          <div className="row pt-3">
            <h5>Latest Review</h5>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <h6 className="pt-2">I use it everybody</h6>
                  <p>
                    I have been only using this for a short time, but I really
                    love it so far! it's not that it's 100% perfect
                  </p>
                  <div>
                    by BU Sri . <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
