import React, { useState } from "react";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Paymentsreports() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  return (
    <div className="row">
      <div>
        <div>
          <table class="table table-hover table-bordered ">
            <thead className="">
              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  S.No
                </th>
                <th className="table-head" scope="col">
                  Customer Name
                </th>
                <th className="table-head" scope="col">
                  Order Date
                </th>
                <th scope="col" className="table-head">
                  Price
                </th>

                <th scope="col" className="table-head">
                  Offer
                </th>

                <th scope="col" className="table-head">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="user-tbale-body">
                <td>1</td>
                <td>Salman Blr VV</td>
                <td>14-04-2023</td>
                <td>1000</td>
                <td>10%</td>
                <td>Paid</td>
              </tr>
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Paymentsreports;
