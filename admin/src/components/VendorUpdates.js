import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

function VendorUpdates() {
  const [vendorUpdate, setVendorUpdate] = useState([]);

  const getvendorWithPayments = async () => {
    try {
      let res = await axios.get(
        "https://api.infinitimart.in/api/getallupdatedvendor"
      );
      if (res.status === 200) {
        const vendors = res.data?.vendorprofile;
        setVendorUpdate(vendors);
        console.log("vendors", vendors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getvendorWithPayments();
  }, []);

  const approveVendor = async (row) => {
    try {
      const config = {
        url: `/vendor/updateapprove/${row.userId}`,
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        headers: { "content-type": "application/json" },
        data: {
          firstname: row?.firstname,
          lastname: row?.lastname,
          email: row?.email,
          phoneNumber: row?.phoneNumber,
          dob: row?.dob,
          businessName: row?.businessName,
          businesstype: row?.businesstype,
          category: row?.category,
          vendorstatus: "approved",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert(`Approved Successfully`);
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
      name: "First Name",
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
              onClick={() => approveVendor(row)}
            >
              Approve
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <div className="mt-3 p-2">
          <h4>Vendor Approve </h4>
        </div>
        <div className="mt-1 border">
          <DataTable
            columns={columns}
            data={vendorUpdate}
            // data={filterdata}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default VendorUpdates;
