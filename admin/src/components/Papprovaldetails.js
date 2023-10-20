import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductApproval() {
  const [productData, setproductData] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState();
  const [unifiedSearchTerm, setUnifiedSearchTerm] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("id=====", id);

  const getAllProducts = async () => {
    let res = await axios.get(
      `http://localhost:8000/api/product/getproductswithusersdetails`
    );
    if (res.status === 200) {
      console.log("getAllProduct===", res);
      const productStatus = res.data.productsWithUsers.map((product) => {
        return {
          ...product,
          status: product.productStatus,
        };
      });
      const getReverseArray = productStatus
        .filter((item) => item.userId?._id === id)
        .reverse();
      setproductData(getReverseArray);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/product/productapprove/${productId}`
      );
      // Refresh data after approval
      //   window.location.assign();
      getAllProducts();
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  const handleDisapprove = async (productId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/product/productdisapprove/${productId}`
      );
      // Refresh data after disapproval
      //   window.location.assign();
      getAllProducts();
    } catch (error) {
      console.error("Error disapproving product:", error);
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    // {
    //   name: "Vendor",
    //   selector: (row) => (
    //     <>
    //       <p className="mt-2">Name : {row.userId?.firstname}</p>
    //       <p>Category: {row.userId?.category} </p>
    //       <p className="mb-2">Vendor Code: {row.userId?.customNumber} </p>
    //     </>
    //   ),
    //   width: "200px",
    // },

    {
      name: "Product Name",
      selector: (row) => row.productName,
      width: "200px",
    },
    {
      name: "Product Price",
      selector: (row) => row.productPrice,
      width: "100px",
    },

    {
      name: "Product Range",
      selector: (row) => row.productRange,
      width: "100px",
    },
    {
      name: "Product Brand",
      selector: (row) => row.productBrand,
      width: "100px",
    },
    {
      name: "Image",
      selector: (row) => (
        <>
          <img
            src={`http://localhost:8000/productlist/${row.productImage}`}
            alt=""
            style={{ padding: "7px", width: "76%" }}
          />
        </>
      ),
      width: "200px",
    },
    {
      name: "Description",
      selector: (row, index) => row.productDescription,
      width: "300px",
    },

    {
      name: "Status",
      selector: (row) => (
        <>
          {row.productStatus === "" ? (
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
              </button>
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
              {row.productStatus === "approved" ? (
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
    const filteredData = productData.filter((item) => {
      const searchString = unifiedSearchTerm.toLowerCase();
      const vendorNameMatch = item.userId?.firstname
        ?.toLowerCase()
        .includes(searchString);
      const productNameMatch = item.productName
        ?.toLowerCase()
        .includes(searchString);
      const vendorIdMatch = item.userId?.customNumber
        ?.toLowerCase()
        .includes(searchString);

      return vendorNameMatch || productNameMatch || vendorIdMatch;
    });

    setFilteredProduct(filteredData);
  }, [unifiedSearchTerm, productData]);

  //   const handleRowClick = (row) => {
  //     navigate(`/papprovaldetails/${row.userId._id}`);
  //   };

  return (
    <div>
      <div className="row m-auto">
        <div className="pt-3 pb-3">
          <div>
            <Form.Control
              type="text"
              placeholder="Search by Vendor Name, Product Name, Vendor Id"
              style={{ width: "35%" }}
              onChange={(e) => setUnifiedSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          {" "}
          <DataTable
            columns={columns}
            data={filteredProduct || productData}
            pagination
            fixedHeader
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
            // onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductApproval;
