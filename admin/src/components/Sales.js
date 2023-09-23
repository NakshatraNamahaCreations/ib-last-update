import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import React, { useState } from "react";
import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Sidebar from "../components/layout/Sidebar";

function Sales() {
  const headerSortingStyle = { backgroundColor: "#c8e6c9" };
  const [toggle, setToggel] = useState(true);
  const handelsavebtn = () => {
    setToggel(true);
  };
  const handelAddbtn = () => {
    setToggel(false);
  };
  const columns = [
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "name1",
      text: "Customer name",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "Business1",
      text: "Business name",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "Category1",
      text: "Category",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "Paid1",
      text: "Paid",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "Status1",
      text: "Status",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "Tax1",
      text: "Tax",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "Action1",
      text: "Action",
      sort: true,
      headerSortingStyle,
    },
  ];
  const products = [
    {
      id: 1,
      date: "01 jan 2020",
      name1: "Ajay",
      Business1: "Corportaion",
      Category1: "Realestate",
      Paid1: 32000,
      Status1: "paid",
      Tax1: "20%",
      Action1: ["edit", "delete"],
    },
    {
      id: 2,
      date: "04 jan 2020",
      name1: "Ajay1",
      Business1: "Corportaion1",
      Category1: "Realestate1",
      Paid1: 13200,
      Status1: "unpaid",
      Tax1: "10%",
      Action1: ["edit", "delete"],
    },
    {
      id: 3,
      date: "01 jan 2020",
      name1: "Ajay",
      Business1: "Corportaion",
      Category1: "Realestate",
      Paid1: 32000,
      Status1: "paid",
      Tax1: "20%",
      Action1: ["edit", "delete"],
    },
    {
      id: 4,
      date: "01 jan 2020",
      name1: "Ajay",
      Business1: "Corportaion",
      Category1: "Realestate",
      Paid1: 32000,
      Status1: "paid",
      Tax1: "20%",
      Action1: ["edit", "delete"],
    },
    {
      id: 5,
      date: "01 jan 2020",
      name1: "Ajay",
      Business1: "Corportaion",
      Category1: "Realestate",
      Paid1: 32000,
      Status1: "paid",
      Tax1: "20%",
      Action1: ["edit", "delete"],
    },
    {
      id: 6,
      date: "01 jan 2020",
      name1: "Ajay",
      Business1: "Corportaion",
      Category1: "Realestate",
      Paid1: 32000,
      Status1: "paid",
      Tax1: "20%",
      Action1: ["edit", "delete"],
    },
    {
      id: 7,
      date: "01 jan 2020",
      name1: "Ajay",
      Business1: "Corportaion",
      Category1: "Realestate",
      Paid1: 32000,
      Status1: "paid",
      Tax1: "20%",
      Action1: ["edit", "delete"],
    },
  ];
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <div className="mt-3 p-2">
          <h4>Sales </h4>
        </div>

        <BootstrapTable
          keyField="id"
          data={products}
          columns={columns}
          selectRow={{ mode: "checkbox" }}
          tabIndexCell
        />
      </div>
    </div>
  );
}

export default Sales;
