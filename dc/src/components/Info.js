import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import Footer from "./Footer";
import MailTo from "./MailTo";
import imageicon from "./icon.png";
import About from "./About";
import Interest from "./Interest";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Info() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [allVendor, setAllVendor] = useState([]);

  console.log("id========", id);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    let res = await axios.get(
      `https://api.infinitimart.in/api/vendor/getalluser`
    );
    if (res.status === 200) {
      setAllVendor(res.data.vendorprofile);
    }
  };
  const getUrlId = allVendor.filter((item) => item._id === id);
  console.log("getUrlId", getUrlId);
  return (
    <>
      <img src={imageicon} alt="Teri Eyenike" lazy="true" />

      <section className="section-info">
        <section
          className="section-info1"
          style={{ marginTop: "0px !important" }}
        >
          <h2
            className="name1"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            {getUrlId[0]?.firstname}
          </h2>
          <p
            className="stack1"
            style={{ marginRight: "22px", color: "cadetblue" }}
          >
            {getUrlId[0]?.businessName}
          </p>
          <p
            className="stack1"
            style={{ marginRight: "22px", color: "cadetblue" }}
          >
            {getUrlId[0]?.email}
          </p>
          <p
            className="stack1"
            style={{ marginRight: "22px", color: "cadetblue" }}
          >
            {getUrlId[0]?.phoneNumber}
          </p>
        </section>
        <h2 className="name" style={{ marginTop: "4px", textAlign: "center" }}>
          INFINITIMART
        </h2>
        <p className="stack" style={{ textAlign: "center" }}>
          World's first AI powered Marketplace.
        </p>
        <button
          style={{
            fontSize: "10px",
            marginLeft: "139px",
            color: "dodgerblue",
          }}
          className="btn"
          onClick={() => window.open("https://infinitimart.in/")}
        >
          <u> Know more</u>
        </button>

        {/* <small>
          <a href="https://iamteri.tech/" target="_" rel="noopener noreferrer">
            Know more
          </a>
        </small> */}

        <div
          style={{
            paddingTop: "5px",
            display: "flex",
            "justify-content": "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: "#193256",
              display: "flex",
              justifyContent: "space-around space-between",
              alignContent: "space-around",
              paddingTop: "9px",
              flexDirection: "column",
              borderRadius: "5px",
              flexWrap: "wrap",
              height: "34px",
              paddingBottom: "3px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <a
              href="#"
              onClick={() => {
                // Replace '1234567890' with the desired phone number
                const phoneNumber = getUrlId[0]?.phoneNumber;
                window.location.href = `tel:${phoneNumber}`;
              }}
            >
              <svg
                style={{ color: "white !important" }}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-phone-call"
              >
                <path
                  d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <h4 style={{ paddingLeft: 4 }}>call</h4>
          </div>

          <div
            style={{
              backgroundColor: "#193256",
              display: "flex",
              justifyContent: "space-around space-between",
              alignContent: "space-around",
              paddingTop: "9px",
              flexDirection: "column",
              borderRadius: "5px",
              flexWrap: "wrap",
              height: "34px",
              paddingBottom: "3px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <a
              href={`https://www.google.com/maps/dir//${getUrlId[0]?.location}`}
              target="_"
              rel="noopener noreferrer"
            >
              <svg
                style={{ color: "white" }}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                class="bi bi-globe"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                  fill="white"
                ></path>{" "}
              </svg>
            </a>
            <h4 style={{ paddingLeft: 4 }}>Direction</h4>
          </div>

          <div
            style={{
              backgroundColor: "#193256",
              display: "flex",
              justifyContent: "space-around space-between",
              alignContent: "space-around",
              paddingTop: "9px",
              flexDirection: "column",
              borderRadius: "5px",
              flexWrap: "wrap",
              height: "34px",
              paddingBottom: "3px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <a
              href={`sms:${getUrlId[0]?.phoneNumber}`} // Replace +123456789 with the desired phone number
              target="_"
              rel="noopener noreferrer"
            >
              <svg
                style={{ color: "white" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chat-text"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                  fill="white"
                ></path>
                <path
                  d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <h4 style={{ paddingLeft: 4 }}>SMS</h4>
          </div>

          <MailTo
            email={getUrlId[0]?.email}
            subject="Exploring Partnership Opportunities with InfinitiMart - Your Gateway to Innovative Solutions"
            body={`Hi,\n\nI hope this email finds you well. I am reaching out to explore potential collaboration and partnership opportunities with InfinitiMart, a company renowned for its innovative solutions. Let's discuss how our organizations can mutually benefit from a strategic alliance.\n\nBest regards,\n[Your Name]`}
            className="mailto"
            style={{
              backgroundColor: "#193256",
              display: "flex",
              justifyContent: "space-around space-between",
              alignContent: "space-around",
              paddingTop: "9px",
              flexDirection: "column",
              borderRadius: "5px",
              flexWrap: "wrap",
              height: "34px",
              paddingBottom: "3px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <AiOutlineMail className="icon" style={{ color: "white" }} />
            <span style={{ color: "white", marginRight: "7px" }}>Email</span>
          </MailTo>
        </div>
      </section>
      <About />
      <Footer />
      {/* <About /> */}
    </>
  );
}
