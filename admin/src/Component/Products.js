import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ReactPaginate from "react-paginate";
import InputRange from "react-input-range";
import DataTable from "react-data-table-component";
import EditProducts from "./EditProducts";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Products() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const [data, setData] = useState({});
  const [storeData, setStoreData] = useState([]);
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const [subcatagory, setSubcatagory] = useState("");
  const [category, setCategory] = useState("");
  const [productData, setproductData] = useState([]);
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Brand, setBrand] = useState("");
  const [Size, setSize] = useState("");
  const [Image, setImage] = useState("");
  const [Discount, setDiscount] = useState("");
  const [Volume, setVolume] = useState("");
  const [Description, setDescription] = useState("");
  const [subcatagorydata, setSubCatagorydata] = useState([]);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100000);

  const getProductsByUserId = async () => {
    let res = await axios.post(
      `http://localhost:8000/api/product/productsbyuserid/`,
      { userId: user._id }
    );
    if (res.status === 200) {
      console.log("getUserProduct===", res);
      setproductData(res.data?.getUserProduct);
    }
  };

  useEffect(() => {
    getProductsByUserId();
  }, [user._id]);

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [category]);
  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        `http://localhost:8000/api/vendor/product/subcatagory/postsubcatagory/`,
        {
          catagoryName: category,
        }
      );
      if (res.status === 200) {
        // console.log(res);
        setSubCatagorydata(res.data?.success);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // edit
  const [EditProduct, setEditProduct] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = (editProduct) => {
    setEditProduct(editProduct);
    setShowEdit(true);
  };

  const addproduct = async (e) => {
    e.preventDefault();
    if (
      !category ||
      !subcatagory ||
      !ProductName ||
      !ProductPrice ||
      !Image ||
      !Description
    ) {
      alert("All fields must be filled.");
      return; // Stop execution if any mandatory field is empty
    }

    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("catagoryName", category);
    formdata.append("SubcatagoryName", subcatagory);
    formdata.append("productName", ProductName);
    formdata.append("productPrice", ProductPrice);
    formdata.append("productBrand", Brand);
    // formdata.append("productSize", Size);
    formdata.append("productImage", Image);
    formdata.append("productStatus", "");
    formdata.append("productMaximumRange", maxValue);
    formdata.append("productMinimumRange", minValue);
    // formdata.append("productDiscount", Discount);
    // formdata.append("productQuantity", Volume);
    formdata.append("productDescription", Description);
    formdata.append("productRange", minValue && minValue);

    try {
      const config = {
        url: "/product/addproduct",
        method: "post",
        baseURL: "http://localhost:8000/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Product Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to complete the request");
    }
  };

  const handleMinInputChange = (e) => {
    const newMinValue = parseInt(e.target.value, 10);
    if (newMinValue < 1) {
      setMinValue(1);
    } else if (newMinValue > maxValue) {
      setMinValue(maxValue);
    } else {
      setMinValue(newMinValue);
    }
  };

  const handleMaxInputChange = (e) => {
    const newMaxValue = parseInt(e.target.value, 10);
    if (newMaxValue > 100000) {
      setMaxValue(100000);
    } else if (newMaxValue < minValue) {
      setMaxValue(minValue);
    } else {
      setMaxValue(newMaxValue);
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
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
      selector: (row) => (
        <>
          {" "}
          {row.productMinimumRange} - {row.productMaximumRange}{" "}
        </>
      ),
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
            style={{ padding: "7px", width: "100%" }}
          />
        </>
      ),
    },
    {
      name: "Description",
      selector: (row, index) => row.productDescription,
      width: "300px",
    },

    {
      name: "Status",
      selector: (row, index) => (
        <>
          {row.productStatus === "approved" ? (
            <p style={{ color: " #188c19", fontWeight: 600 }}>Approved</p>
          ) : (
            ""
          )}
          {row.productStatus === "disapproved" ? (
            <p style={{ color: "#c0352f", fontWeight: 600 }}>Disapproved</p>
          ) : (
            ""
          )}

          {row.productStatus === "" ? (
            <>
              <p style={{ color: "#ffbb00", fontWeight: 600 }}>Under Review </p>
            </>
          ) : (
            ""
          )}
        </>
      ),
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <span>
            <i
              class="fa-solid fa-pen-to-square edit-icon"
              title="Edit"
              onClick={() => handleEdit(row)}
            ></i>
          </span>{" "}
          /{" "}
          <span>
            <i
              class="fa-solid fa-trash delete-icon"
              title="Delete"
              onClick={() => deleteProduct(row)}
            ></i>
          </span>
        </div>
      ),
    },
  ];

  const deleteProduct = async (data) => {
    try {
      axios
        .post(`http://localhost:8000/api/product/deleteproduct/` + data._id)
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            alert(res.data.Success);
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  return (
    <div className="row">
      <h1 className="mt-3 mb-3">PRODUCTS</h1>
      <div className="d-flex float-end mt-3 mb-3">
        <button
          className="btn-primary-button mx-2 addProduct"
          style={selected == 1 ? active : inactive}
          onClick={handleClick(1)}
        >
          Add Product
        </button>

        <button
          style={selected == 0 ? active : inactive}
          onClick={handleClick(0)}
          className="btn-secondary-button AllProduct"
        >
          All Products
        </button>
      </div>

      <div>
        <div>
          {selected == 0 && !showEdit ? (
            <>
              <DataTable
                columns={columns}
                data={productData}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </>
          ) : (
            <>
              {selected === 1 && !showEdit ? (
                <div className="card mt-4">
                  <div className="card-body p-3">
                    {/* <div className="vhs-sub-heading pb-2">Add New Record</div> */}

                    {/* <Form> */}
                    <Row className="mb-3">
                      <Col md={1}></Col>
                      <Col md={5}>
                        <Form.Group className="product-grid">
                          <Form.Label>Select Catagory</Form.Label>
                          <Form.Select
                            defaultValue="Choose..."
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option key={user.id} value={user?.category}>
                              {user?.category}{" "}
                            </option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="product-grid">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                            name="Productname"
                            // value={data.ProductName}
                            onChange={(e) => setProductName(e.target.value)}
                            type="text"
                            placeholder="Enter Product"
                          />
                        </Form.Group>
                        <Form.Group className="product-grid">
                          <Form.Label>Product Price</Form.Label>
                          <Form.Control
                            name="productPrice"
                            // value={data.ProductPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            type="number"
                            placeholder="Enter Price"
                          />
                        </Form.Group>

                        <Form.Group className="product-grid">
                          <Form.Label>Choose Image</Form.Label>
                          <Form.Control
                            name="image"
                            type="file"
                            // multiple
                            // value={data.image}
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </Form.Group>
                        <br />
                        <Button
                          onClick={addproduct}
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Save
                        </Button>
                      </Col>
                      <Col md={5}>
                        <Form.Group className="product-grid">
                          <Form.Label>Select Subcatagory</Form.Label>
                          <Form.Select
                            defaultValue="Choose..."
                            onChange={(e) => setSubcatagory(e.target.value)}
                          >
                            <option>Choose...</option>
                            {subcatagorydata?.map((e) => (
                              <option key={e.id} value={e.id}>
                                {e.SubcatagoryName}{" "}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="product-grid">
                          <Form.Label>Product Brand</Form.Label>
                          <Form.Control
                            name="brand"
                            placeholder="Product Brand"
                            // value={data.brand}
                            onChange={(e) => setBrand(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          controlId="formGridZip"
                          className="product-grid"
                        >
                          <Form.Label className="mb-3">
                            Product Range
                          </Form.Label>
                          <div className="d-flex mb-4 ">
                            <div>
                              <label
                                style={{
                                  color: "#a9042e",
                                  fontSize: "11px",
                                  fontWeight: 500,
                                }}
                              >
                                Min Value:
                              </label>{" "}
                              <input
                                type="number"
                                placeholder="1"
                                style={{ width: "50%" }}
                                value={minValue}
                                onChange={handleMinInputChange}
                              />
                            </div>
                            <div>
                              <label
                                style={{
                                  color: "#a9042e",
                                  fontSize: "11px",
                                  fontWeight: 500,
                                }}
                              >
                                Max Value:
                              </label>{" "}
                              <input
                                type="number"
                                placeholder="100000"
                                style={{ width: "50%" }}
                                value={maxValue}
                                onChange={handleMaxInputChange}
                              />
                            </div>
                          </div>
                          <InputRange
                            maxValue={100000}
                            minValue={1}
                            value={{ min: minValue, max: maxValue }}
                            onChange={(newRange) => {
                              setMinValue(newRange.min);
                              setMaxValue(newRange.max);
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 product-grid">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            className="product-grid"
                            name="discription"
                            as="textarea"
                            rows={3}
                            // value={data.discription}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    {/* </Form> */}
                  </div>
                </div>
              ) : (
                <>
                  {showEdit ? <EditProducts productData={EditProduct} /> : ""}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Products;
