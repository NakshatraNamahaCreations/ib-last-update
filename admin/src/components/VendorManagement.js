import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { Form } from "react-bootstrap";

function VendorManagement() {
  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState([]);
  // const [filteredProducData, setFilteredData] = useState();

  const [vendorPaymentsData, setVendorPaymentsData] = useState([]);
  const [rowdata, setrowdata] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);

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
      name: "Sl  No",
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
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <div>
    //       {row.vendorstatus ? (
    //         <p
    //           style={{
    //             fontSize: "15px",
    //             color: "#ffc217",
    //             fontWeight: "bolder",
    //           }}
    //         >
    //           Approved <i class="fa-regular fa-circle-check"></i>{" "}
    //         </p>
    //       ) : (
    //         <button
    //           className="bt"
    //           style={{ border: 0, backgroundColor: "green", color: "white" }}
    //           onClick={() => edit(row)}
    //         >
    //           Approve
    //         </button>
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to="/Vendorprofile" state={{ item: row }}>
            <b className="vendor-mng-view"> View </b>
          </Link>
        </>
      ),
    },
  ];

  const edit = (data) => {
    setrowdata(data);
    handleShow(true);
  };

  // const searchResults = (searchTerm) => {
  //   const searchWords = searchTerm.toLowerCase();

  //   const filteredData = vendorPaymentsData.filter((item) => {
  //     const itemFirstName = (item.firstname || "").toLowerCase();
  //     return itemFirstName.includes(searchWords);
  //   });
  //   setFilterdata(filteredData);
  // };

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
      return vendorNameMatch || businessNameMatch || vendorIdMatch;
    });
    setFilterdata(filteredData);
  }, [search, vendorPaymentsData]);

  // const handleSearch = () => {
  //   const filteredData = searchResults();
  //   setFilterdata(filteredData);
  // };

  // useEffect(() => {
  //   searchResults();
  // }, [search, vendorPaymentsData]);

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <div className="mt-3 p-2">
          <h4>Vendor Management </h4>
        </div>
        <div className="mt-5">
          <Form.Control
            type="text"
            placeholder="Search by vendor name, business, vendor code"
            className="w-25 form-control"
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-1 border">
          <DataTable
            columns={columns}
            data={filterdata}
            // data={filterdata}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
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
