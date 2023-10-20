import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function VendorManagement() {
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [vendorPaymentsData, setVendorPaymentsData] = useState([]);
  const [rowdata, setrowdata] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);
  const navigate = useNavigate();

  // const getvendor = async () => {
  //   try {
  //     let res = await axios.get("http://localhost:8000/api/vendor/getalluser");
  //     if (res.status === 200) {
  //       console.log("data--", data);
  //       const arrayData = res.data?.vendorprofile.slice().reverse();
  //       setdata(arrayData);
  //       console.log("array length--", arrayData);
  //       setfilterdata(res.data?.vendorprofile);
  //     }
  //   } catch (error) {}
  // };

  const getvendorWithPayments = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8000/api/vendor/getuserswithpaymentsdata"
      );
      if (res.status === 200) {
        const vendorsPayments = res.data?.vendorsPayments;
        setVendorPaymentsData(vendorsPayments);
        console.log("vendorPaymentsData", vendorsPayments);
        setfilterdata(res.data?.vendorsPayments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getvendor();
    getvendorWithPayments();
  }, []);

  const approvevendor = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/approvevendor/${rowdata._id}`,
        method: "post",
        baseURL: "http://localhost:8000/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "approved",
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

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Firt Name",
      selector: (row) => row.firstname,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Buisness Type",
      selector: (row) => row.businesstype,
    },
    {
      name: "Buisness Name",
      selector: (row) => row.businessName,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Vendor Code",
      selector: (row) => row.customNumber,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          {row.vendorstatus ? (
            <p
              style={{
                fontSize: "15px",
                color: "#ffc217",
                fontWeight: "bolder",
              }}
            >
              Approved <i class="fa-regular fa-circle-check"></i>{" "}
            </p>
          ) : (
            <button
              className="bt"
              style={{ border: 0, backgroundColor: "green", color: "white" }}
              onClick={() => edit(row)}
            >
              Approve
            </button>
          )}
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setrowdata(data);
    handleShow(true);
  };

  // useEffect(() => {
  //   const result = data.filter((item) => {
  //     console.log(item)
  //     return item.firstname.toLowerCase().match(search.toLowerCase());
  //   });
  //   setfilterdata(result);
  // }, [search]);

  const handleRowClick = (row) => {
    navigate(`/Vendorprofile/${row._id}`);
  };

  return (
    <div className="row me-0">
      {/* {isConnected ? (
        <> */}
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <div className="mt-3 p-2">
          <h4>Vendor Management </h4>
        </div>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search here.."
            className="w-25 form-control"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className="mt-1 border">
          <DataTable
            columns={columns}
            data={vendorPaymentsData?.slice(1)}
            // data={data?.length - 1}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Vendor Approve
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Are you absolutely certain about approving this vendor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={approvevendor}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </>
      ) : (
        <div className="text-center">
          <img
            src="../images/no-internet.png"
            alt=""
            style={{ width: "25%", borderRadius: "50%" }}
          />
          <h1>Please connect to the internet to use this application.</h1>
        </div>
      )} */}
    </div>
  );
}

export default VendorManagement;
