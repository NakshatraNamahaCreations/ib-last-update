import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function ServiceApproval() {
  const [serviceData, setserviceData] = useState([]);
  const [filteredService, setFilteredService] = useState();
  const [unifiedSearchTerm, setUnifiedSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllservices = async () => {
    let res = await axios.get(
      `http://localhost:8000/api/vendor/services/productlist/getserviceswithusersdetails`
    );
    if (res.status === 200) {
      console.log("getAllServices==", res);
      const serviceStatus = res.data.serviceWithUsers.map((service) => {
        return {
          ...service,
          status: service.serviceStatus,
        };
      });
      const getReverseArray = serviceStatus.reverse();
      setserviceData(getReverseArray);
    }
  };

  useEffect(() => {
    getAllservices();
  }, []);

  const handleApprove = async (serviceId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/vendor/services/productlist/serviceapprove/${serviceId}`
      );
      // Refresh data after approval
      //   window.location.assign();
      getAllservices();
    } catch (error) {
      console.error("Error approving service:", error);
    }
  };

  const handleDisapprove = async (serviceId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/vendor/services/productlist/servicedisapprove/${serviceId}`
      );
      // Refresh data after disapproval
      //   window.location.assign();
      getAllservices();
    } catch (error) {
      console.error("Error disapproving service:", error);
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Vendor",
      selector: (row) => (
        <>
          <p className="mt-2">Name : {row.userId?.firstname}</p>
          <p>Category: {row.userId?.category} </p>
          <p className="mb-2">Vendor Code: {row.userId?.customNumber} </p>
        </>
      ),
      width: "200px",
    },
    {
      name: "Catagory",
      selector: (row) => row.serviceCatagoryName,
      width: "200px",
    },
    {
      name: "Subcatagory",
      selector: (row) => row.serviceSubcatagoryName,
      width: "200px",
    },
    {
      name: "Service Name",
      selector: (row) => row.serviceProductName,
      width: "200px",
    },
    {
      name: " Price",
      selector: (row) => row.serviceProductPrice,
      width: "100px",
    },

    {
      name: " Range",
      selector: (row) => row.serviceProductRange,
      width: "100px",
    },
    {
      name: " Brand",
      selector: (row) => row.serviceProductBrand,
      width: "100px",
    },
    {
      name: "Image",
      selector: (row) => (
        <>
          <img
            src={`http://localhost:8000/ServiceProductList/${row.serviceProductImage}`}
            alt=""
            style={{ padding: "7px", width: "76%" }}
          />
        </>
      ),
      width: "200px",
    },
    {
      name: "Description",
      selector: (row, index) => row.serviceProductDescription,
      width: "300px",
    },

    {
      name: "Status",
      selector: (row) => (
        <>
          {row.serviceProductStatus === "" ? (
            <>
              <button
                style={{
                  fontSize: "12px",
                  border: 0,
                  padding: "6px",
                  borderRadius: "5px",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() => handleApprove(row._id)}
              >
                Approve
              </button>{" "}
              <button
                style={{
                  fontSize: "12px",
                  border: 0,
                  padding: "6px",
                  borderRadius: "5px",
                  backgroundColor: "#c0352f",
                  color: "white",
                }}
                onClick={() => handleDisapprove(row._id)}
              >
                {" "}
                Disapprove
              </button>
            </>
          ) : (
            <>
              {row.serviceProductStatus === "approved" ? (
                <p style={{ color: "green" }}> Approved</p>
              ) : (
                <p style={{ color: "#c0352f" }}>Dispproved</p>
              )}
            </>
          )}
        </>
      ),
      width: "200px",
    },
  ];

  //search
  useEffect(() => {
    const filteredData = serviceData.filter((item) => {
      const searchString = unifiedSearchTerm.toLowerCase();
      const vendorNameMatch = item.userId?.firstname
        ?.toLowerCase()
        .includes(searchString);
      const serviceNameMatch = item.serviceProductName
        ?.toLowerCase()
        .includes(searchString);
      const vendorIdMatch = item.userId?.customNumber
        ?.toLowerCase()
        .includes(searchString);
      const serviceCatagoryNameMatch = item.serviceCatagoryName
        ?.toLowerCase()
        .includes(searchString);
      const serviceSubCatagoryNameMatch = item.serviceSubcatagoryName
        ?.toLowerCase()
        .includes(searchString);

      return (
        vendorNameMatch ||
        serviceNameMatch ||
        vendorIdMatch ||
        serviceCatagoryNameMatch ||
        serviceSubCatagoryNameMatch
      );
    });

    setFilteredService(filteredData);
  }, [unifiedSearchTerm, serviceData]);

  const handleRowClick = (row) => {
    navigate(`/sapprovaldetails/${row.userId._id}`);
  };

  const [commonUserIds, setCommonUserIds] = useState([]);
  const [commonUserData, setCommonUserData] = useState([]);

  const columns1 = [
    {
      name: "User ID",
      selector: "userId._id",
      width: "100px",
    },
    {
      name: "First Name",
      selector: "userId.firstname",
      width: "100px",
    },
  ];
  const commonUserData1 = commonUserIds.map((userId) => {
    const commonItem = serviceData.find((item) => item.userId?._id === userId);
    return commonItem;
  });

  useEffect(() => {
    const userIdCount = new Map();
    const commonIds = [];

    serviceData.forEach((item) => {
      const userId = item.userId?._id;

      if (userId) {
        userIdCount.set(userId, (userIdCount.get(userId) || 0) + 1);

        // If it's the second occurrence of a user ID, add it to the commonIds array
        if (userIdCount.get(userId) === 2) {
          commonIds.push(userId);
        }
      }
    });

    setCommonUserIds(commonIds);

    // Filter the productData to include only common user IDs
    const commonData = serviceData.filter((item) =>
      commonIds.includes(item.userId?._id)
    );
    setCommonUserData(commonData);
  }, [serviceData]);

  return (
    <div>
      <div>
        <div className="pt-3 pb-3">
          <div>
            <Form.Control
              type="text"
              placeholder="Search by Vendor Name, Service Name, Vendor Id"
              style={{ width: "35%" }}
              onChange={(e) => setUnifiedSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          {" "}
          <DataTable
            columns={columns}
            data={commonUserData1}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceApproval;
