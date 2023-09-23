import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Voucher() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  return (
    <div className="row">
      <div className="d-flex float-end mt-3 mb-3">
        <button
          className="btn-primary-button mx-2 addProduct"
          style={selected === 1 ? active : inactive}
          onClick={handleClick(1)}
        >
          Add Voucher
        </button>

        <button
          style={selected === 0 ? active : inactive}
          onClick={handleClick(0)}
          className="btn-secondary-button AllProduct"
        >
          All Voucher
        </button>
      </div>

      <div>
        <div>
          {selected === 0 ? (
            <>
              {" "}
              <table class="table table-hover table-bordered mt-5">
                <thead className="">
                  <tr className="table-secondary">
                    <th>S.No</th>
                    <th>Voucher Code</th>
                    <th>Description</th>
                    <th>Discount Percentage</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="user-tbale-body">
                    <td className="text-center">1</td>
                    <td className="text-center">JDJ3832</td>
                    <td className="text-center">Hospital Cleaning</td>
                    <td className="text-center">10%</td>
                    <td>Home Cleaning</td>
                  </tr>
                </tbody>
              </table>{" "}
            </>
          ) : (
            <>
              {" "}
              <div className="card mt-4">
                <div className="card-body p-3">
                  {/* <div className="vhs-sub-heading pb-2">Add New Record</div> */}

                  <Form>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label> Voucher Code</Form.Label>
                        <Form.Control placeholder=" Service Type " />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label> Description</Form.Label>
                        {/* <Form.Control placeholder=" Service Type " /> */}
                        <textarea style={{ width: "100%" }} />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label> Discount Percentage</Form.Label>
                        <Form.Control placeholder=" Service Type " />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label> Category</Form.Label>
                        <Form.Control placeholder=" Service Type " />
                      </Form.Group>
                    </Row>
                    <div className="row pt-3 justify-content-center">
                      <div className="col-md-1">
                        <button className="vhs-button">Save</button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Voucher;
