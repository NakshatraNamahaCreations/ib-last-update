import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/layout/Sidebar";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Legend,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

function Wallets() {
  const data = [
    {
      name: 1,
      today: 4000,
      yesterday: 2400,
    },
    {
      name: 2,
      today: 3000,
      yesterday: 1398,
    },
    {
      name: 3,
      today: 2000,
      yesterday: 9800,
    },
    {
      name: 4,
      today: 2780,
      yesterday: 3908,
    },
    {
      name: 5,
      today: 1890,
      yesterday: 4800,
    },
    {
      name: 6,
      today: 2390,
      yesterday: 3800,
    },
    {
      name: 7,
      today: 3490,
      yesterday: 4300,
    },
    {
      name: 8,
      today: 4000,
      yesterday: 2400,
    },
    {
      name: 9,
      today: 3000,
      yesterday: 1398,
    },
    {
      name: 10,
      today: 2000,
      yesterday: 9800,
    },
  ];

  const data1 = [
    {
      name1: "this-week",
      lastweek: 4000,
      thisweek: 2400,
    },
    {
      name1: "last-week",
      lastweek: 3000,
      thisweek: 1398,
    },
    {
      name1: "Corporation3",
      lastweek: 2000,
      thisweek: 9800,
    },
    {
      name1: "Corporation4",
      lastweek: 2780,
      thisweek: 3908,
    },
    {
      name1: "Corporation5",
      lastweek: 1890,
      thisweek: 4800,
    },
    {
      name1: "Corporation6",
      lastweek: 2390,
      thisweek: 3800,
    },
    {
      name1: "Corporation7",
      lastweek: 3490,
      thisweek: 4300,
    },
  ];
  const data2 = [
    {
      name1: "Entertainment",
      lastmonth: 4000,
      thismonth: 2400,
    },
    {
      name1: "games",
      lastmonth: 3000,
      thismonth: 1398,
    },
    {
      name1: "Corporation3",
      lastmonth: 2000,
      thismonth: 9800,
    },
    {
      name1: "Corporation4",
      lastmonth: 2780,
      thismonth: 3908,
    },
    {
      name1: "Corporation5",
      lastmonth: 1890,
      thismonth: 4800,
    },
    {
      name1: "Corporation6",
      lastmonth: 2390,
      thismonth: 3800,
    },
    {
      name1: "Corporation7",
      lastmonth: 3490,
      thismonth: 4300,
    },
  ];

  const [daily, setDaily] = useState(false);
  const handledaily = () => {
    setDaily(true);
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Wallets </h2>
            <p>$85.250.000</p>
          </div>
          <div className="col-md-4 d-flex ">
            <div className="m-auto">
              <Button variant="danger" onClick={handledaily}>
                Daily
              </Button>
            </div>
            <div className="m-auto">
              <Button variant="success">Weekly</Button>
            </div>
            <div className="m-auto">
              <Button variant="warning">Monthly</Button>
            </div>
          </div>
        </div>

        <div className="row d-flex">
          {!daily ? (
            <BarChart width={430} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="today" fill="#8884d8" />

              <Bar dataKey="yesterday" fill="#82ca9d" />
            </BarChart>
          ) : (
            <table class="table table-hover table-bordered ">
              <thead>
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    SL.NO
                  </th>
                  <th className="table-head" scope="col">
                    Date
                  </th>
                  <th className="table-head" scope="col">
                    Business Name
                  </th>

                  <th scope="col" className="table-head">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="user-tbale-body text-center">
                  <td>1</td>
                  <td>1 june 2023</td>
                  <td>Corporation</td>
                  <td>
                    <Button variant="success">Edit</Button>{" "}
                    <Button variant="danger">Delete</Button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <BarChart width={430} height={250} data={data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name1" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="lastweek" fill="#8884d8" />

            <Bar dataKey="thisweek" fill="#82ca9d" />
          </BarChart>
          <BarChart width={430} height={250} data={data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name1" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="lastmonth" fill="#8884d8" />

            <Bar dataKey="thismonth" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="row">
          <h2>Latest Transaction</h2>
          <div className="container col-md-12">
            <div className="col-md-12 d_box">
              <div>
                <img
                  src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                />
              </div>
              <p>Entertainment</p>
              <p>8 nov</p>
              <p>Football game</p>
              <p>300</p>
            </div>
          </div>
          <div className="col-md-12 d_box ">
            <div>
              <img
                src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </div>
            <p>Entertainment</p>
            <p>9 nov</p>
            <p>Football game</p>
            <p>9000</p>
          </div>
          <div className="col-md-12 d_box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </div>
            <p>Entertainment</p>
            <p>10 nov</p>
            <p>Football game</p>
            <p>3090</p>
          </div>
          <div className="col-md-12 d_box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </div>
            <p>Entertainment</p>
            <p>12 nov</p>
            <p>Football game</p>
            <p>300</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
