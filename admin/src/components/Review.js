import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import DataTable from "react-data-table-component";
import { Button, Modal } from "react-bootstrap";

function Review() {
  const [smShow, setSmShow] = useState(false);
  const [reviews, setReviews] = useState("");
  const [writeReview, setWriteReview] = useState({});
  // const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);
  const handleReview = (comments) => {
    setWriteReview(comments);
    handleShow(true);
  };
  const filterdata = [
    {
      vendorId: "64a3b0c6c032ea2457897439",
      buyerId: "64d5bf5c576d66d984d4f3a9",
      vendorName: "Jimmy Neesham",
      BuyerName: "Bonsai Morphy",
      reviewDate: "2021-08-20T12:00",
      rating: 5,
      comment: "Great Vendor",
      status: "Pending",
      SAdminComments: "Thank you",
      vendorProduct:
        "Indian Ramarajyam Purple - Steam Sonamasoori Ponni Rice, Packaging Type: PP Bag, Packaging Size: 25 Kg",
    },
    {
      vendorId: "64d5c7b62920caa0038e50a0",
      buyerId: "64c399f41a8ae4c37fdfe4c0",
      vendorName: "Navarasam",
      BuyerName: "Nayakan",
      reviewDate: "2021-08-20T12:00",
      rating: 4.5,
      comment:
        "Navarasam, is a very good and friendly person who will help you to get the best price for your product.",
      status: "Approved",
      SAdminComments: "🤝 Thanks for your valuable feedback!",
      vendorProduct: "Malai Ghee, Food Grade Bottel & Tin",
    },
  ];

  const columns = [
    {
      name: "Sr.No",
      selector: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Vendor",
      selector: (row) => (
        <>
          <div>
            <p>
              <b>Vendor Id</b> : {row.vendorId}{" "}
            </p>
            <p>
              <b>Vendor Name</b> : {row.vendorName}{" "}
            </p>
          </div>
        </>
      ),
      width: "330px",
    },
    {
      name: "Buyer",
      selector: (row) => (
        <>
          <div>
            <p>
              <b>Buyer Id</b> : {row.buyerId}{" "}
            </p>
            <p>
              <b>Buyer Name</b> : {row.BuyerName}{" "}
            </p>
          </div>
        </>
      ),
      width: "330px",
    },
    {
      name: "Prodcut",
      selector: (row) => row.vendorProduct,
      width: "220px",
    },
    {
      name: "Review",
      selector: (row) => row.comment,
      width: "200px",
    },
    {
      name: "Super Admin Comments",
      selector: (row) => row.SAdminComments,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Button variant="warning" onClick={() => handleReview()}>
            Reply
          </Button>{" "}
          <Button variant="danger">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <div className="mt-3 p-2">
          <h4 style={{ marginTop: "54px", marginLeft: "15px" }}>
            Review Management{" "}
          </h4>
        </div>
        <div className="mt-1" style={{ marginLeft: "30px" }}>
          <input
            type="text"
            placeholder="Search here.."
            className="w-25 form-control"
          />
        </div>

        <div className="mt-1 border">
          <DataTable
            columns={columns}
            data={filterdata}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
          />
        </div>
        <h3 className="text-center">temporarily static data</h3>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        {/* {writeReview && writeReview.vendorName && (
          <h5>Vendor: {writeReview.vendorName}</h5>
        )} */}
        <Modal.Body>
          <h5>Comments:</h5>
          <textarea
            className="p-2"
            onChange={(e) => setReviews(e.target.value)}
            // value={reviews}
            placeholder="What's on your thought's"
            style={{ width: "100%", height: "190px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">POST</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Review;
