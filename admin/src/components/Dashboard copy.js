import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { ResponsiveAreaBump } from "@nivo/bump";
// import { ResponsiveBar } from "nivo/lib/components/charts/bar";

function Dashboard() {
  const adminData = JSON.parse(sessionStorage.getItem("adminData"));
  const [data, setdata] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [Subcatagory, setSubcatagory] = useState([]);

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

  return (
    <div>
      <div className="row pt-3 me-0">
        <div className="pt-4 pb-4" style={{ display: "flex" }}>
          <div className="ms-2">
            <h5>Hi, {adminData.name ? adminData.name : ""}</h5>
            <h2>Welcome back!</h2>
          </div>
        </div>
        <div className="col col-grid">
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
        <div className="col col-grid">
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
              {/* <div className="cm-text-content">Products</div> */}
            </Card>
          </a>
        </div>
        {/* <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Catagory</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">{catagory?.length} </span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#a9042e" }}
              >
                Total
              </a>
            </div>
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Catagory</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">{catagory?.length} </span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#a9042e" }}
              >
                Total
              </a>
            </div>
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Subcategory</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">{Subcatagory?.length} </span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#664d03" }}
              >
                Total
              </a>
            </div>
          </Card>
        </a>
      </div> */}
      </div>
      <div>
        <ResponsiveAreaBump
          data={data}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={8}
          colors={{ scheme: "nivo" }}
          blendMode="multiply"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "CoffeeScript",
              },
              id: "dots",
            },
            {
              match: {
                id: "TypeScript",
              },
              id: "lines",
            },
          ]}
          startLabel="id"
          endLabel="id"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -36,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
