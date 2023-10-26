import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Sidebar from "../components/layout/Sidebar";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";
import DataTable from "react-data-table-component";

function Buyer() {
  const [buyerData, setBuyerData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const handleactive1 = () => {
    setSelected(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [toggle, setToggel] = useState(true);
  const [toggle1, setToggel1] = useState(false);
  const handelgeneralbtn = () => {
    setToggel1(true);
  };
  const handeladvancebtn = () => {
    setToggel1(false);
  };
  const handelsavebtn = () => {
    setToggel(true);
  };
  const handelAddbtn = () => {
    setToggel(false);
  };

  const getAllBuyres = async () => {
    try {
      let res = await axios.get(
        "https://api.infinitimart.in/api/buyer/getalluser"
      );
      if (res.status === 200) {
        const buyerDetails = res.data?.buyerProfile;
        setBuyerData(buyerDetails);
        setfilterdata(buyerDetails);
        console.log("vendorPaymentsData", buyerDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBuyres();
  }, []);

  const columns = [
    {
      name: "SL.NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "Customer Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];

  useEffect(() => {
    const searchResults = () => {
      let results = buyerData;
      if (name) {
        results = results.filter(
          (item) =>
            item.name && item.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [name]);

  return (
    <div div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        {toggle ? (
          <div>
            <div className="" style={{ marginTop: "70px", marginLeft: "30px" }}>
              <h4>Buyer Management</h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Form.Control
                  type="search"
                  placeholder="Search by Name"
                  className="buyer-search-input"
                  onChange={(e) => setName(e.target.value)}

                  // style={{ width: "25%" }}
                />
                {/* <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ position: "relative", left: "90%", bottom: "45%" }}
                ></i> */}
              </div>
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
              />
            </div>
          </div>
        ) : (
          <div className="shadow p-3 mb-5 bg-body rounded">
            <div>
              <Form>
                <h2>Buyers</h2>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      placeholder="Please enter the name"
                      name="Customer name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Customer Contact no</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Please enter the  contact"
                      name="contact"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      placeholder="Please enter the business name"
                      name="businessname"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      placeholder="Please enter the Category"
                      name="category"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Place of business</Form.Label>
                    <Form.Control
                      placeholder="Please enter the  place"
                      name="place"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>upload piture</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Please enter the  email"
                      name="profile"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      placeholder="Please enter the  city"
                      name="city"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      placeholder="Please enter the  state"
                      name="state"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Registration date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Please enter the  date"
                      name="date"
                    />
                  </Form.Group>
                </Row>
              </Form>
            </div>

            <Button type="button" variant="outline-primary">
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              className="btn btn-secondary float-end"
              onClick={handelsavebtn}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buyer;
