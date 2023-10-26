import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { Form } from "react-bootstrap";
import { Navigate } from "react-big-calendar";

function VendorManagement() {
  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState([]);

  const [vendorPaymentsData, setVendorPaymentsData] = useState([]);
  const [rowdata, setrowdata] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);
  const [filterOption, setFilterOption] = useState("all");
  const navigate = useNavigate();

  const getvendorWithPayments = async () => {
    try {
      let res = await axios.get(
        "https://api.infinitimart.in/api/vendor/getuserswithpaymentsdata"
      );
      if (res.status === 200) {
        const vendorsPayments = res.data?.vendorsPayments;
        setVendorPaymentsData(vendorsPayments);
        console.log("vendorPaymentsData", vendorsPayments);
        setFilterdata(vendorsPayments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getvendorWithPayments();
  }, []);

  const approvevendor = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/approvevendor/${rowdata._id}`,
        method: "post",
        baseURL: "https://api.infinitimart.in/api/vendor",
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "approved",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
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
      name: "SL.NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "Firt Name",
      selector: (row) => row.firstname,
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
      name: "Action",
      cell: (row) => (
        <>
          <Link to="/Vendorprofile" state={{ item: row }}>
            <b className="vendor-mng-view tab-text-a"> View </b>
          </Link>
        </>
      ),
    },
  ];

  const edit = (data) => {
    setrowdata(data);
    handleShow(true);
  };

  useEffect(() => {
    const filteredData = vendorPaymentsData.filter((item) => {
      const searchString = search.toLowerCase();
      const vendorNameMatch = item.firstname
        ?.toLowerCase()
        .includes(searchString);
      const businessNameMatch = item.businessName
        ?.toLowerCase()
        .includes(searchString);
      const vendorIdMatch = item.customNumber
        ?.toLowerCase()
        .includes(searchString);

      // Filter by the selected filter option
      const currentDate = new Date();
      if (filterOption === "new") {
        const createdAtDate = new Date(item.createAt);
        const timeDiff = currentDate - createdAtDate;
        // Filter by vendors created today
        return (
          (vendorNameMatch || businessNameMatch || vendorIdMatch) &&
          timeDiff < 86400000 // Milliseconds in a day
        );
      } else if (filterOption === "old") {
        const createdAtDate = new Date(item.createAt);
        const timeDiff = currentDate - createdAtDate;

        return (
          (vendorNameMatch || businessNameMatch || vendorIdMatch) &&
          timeDiff >= 86400000 &&
          timeDiff < 172800000
        );
      } else {
        return vendorNameMatch || businessNameMatch || vendorIdMatch;
      }
    });

    setFilterdata(filteredData);
  }, [search, vendorPaymentsData, filterOption]);

  const handleFilterChange = (selectedOption) => {
    setFilterOption(selectedOption);
  };

  // const handleRowClick = (row) => {
  //   navigate(`/Vendorprofile/${row._id}`);
  // };

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <div className="" style={{ marginTop: "64px", marginLeft: "30px" }}>
          <h4>Vendor Management </h4>
        </div>
        <div className="mt-3 d-flex" style={{ marginLeft: "30px" }}>
          <Form.Control
            type="text"
            placeholder="Search by vendor name, business, vendor code"
            className="w-25 form-control"
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select mx-3"
            style={{ width: "100px" }}
            aria-label="Default select example"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all" selected>
              All
            </option>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>

        <div className="mt-3">
          <DataTable
            columns={columns}
            data={filterdata}
            // data={filterdata}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
            // onRowClicked={handleRowClick}
          />
        </div>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
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
    </div>
  );
}

export default VendorManagement;
