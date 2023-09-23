import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function VendorManagement() {
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
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
        setfilterdata(vendorsPayments);
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
  // const handleSearch = () => {
  //   console.log("search:", search);
  //   const filterResults = vendorPaymentsData.filter((item) => {
  //     console.log("item:", item)
  //     const itemFirstName = item.firstname
  //       .toLowerCase()
  //       .includes(search?.toLowerCase() ) ?? true;
  //     return itemFirstName;
  //   });
  //   setfilterdata(filterResults);
  // };

  // useEffect(() => {
  //   const handleSearch = () => {
  //     console.log("search:", search);
  //     const filterResults = vendorPaymentsData
  //     const filterResults = vendorPaymentsData.filter((item) => {
  //       console.log("item:", item);
  //       const itemFirstName =
  //         item.firstname.toLowerCase().includes(search?.toLowerCase() ?? "") ??
  //         true;
  //       return itemFirstName;
  //     });
  //     console.log("filterResults:", filterResults);
  //     setfilterdata(filterResults);
  //   };
  //   handleSearch();
  // }, [third])

  useEffect(() => {
    const searchResults = () => {
      let results = vendorPaymentsData;
      if (search) {
        results = results.filter(
          (item) =>
            item.firstname &&
            item.firstname.toLowerCase().includes(search.toLowerCase())
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [search]);
  // useEffect(() => {
  //   handleSearch();
  // }, [search]);

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
            data={filterdata?.slice(1)}
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
