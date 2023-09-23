import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ReactPaginate from "react-paginate";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import DataTable from "react-data-table-component";
import EditServices from "./EditServices";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Services() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const [subcatagory, setSubcatagory] = useState("");
  const [catagory, setcatagory] = useState("");
  const [productData, setproductData] = useState([]);
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Brand, setBrand] = useState("");
  const [Image, setImage] = useState("");
  const [productRange, setProductRange] = useState({ min: 1, max: 100000 });
  const [Description, setDescription] = useState("");
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100000);
  const [subcatagorydata, setSubcatagorydata] = useState([]);

  // edit service
  const [EditService, setEditService] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = (editService) => {
    console.log("service", editService.serviceProductName);

    setEditService(editService);
    setShowEdit(true);
  };

  useEffect(() => {
    getServiceProductListByUserId();
  }, [user._id]);

  const getServiceProductListByUserId = async () => {
    let res = await axios.post(
      `https://api.infinitimart.in/api/vendor/services/productlist/serviceproductbyuserid/`,
      { userId: user._id }
    );
    if (res.status === 200) {
      console.log("getUserProduct===", res);
      setproductData(res.data?.getUserProduct);
    }
  };

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [catagory]);

  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        `https://api.infinitimart.in/api/vendor/services/subcatagory/postsubcatagoryservices/`,
        {
          catagoryName: catagory,
        }
      );
      if (res.status === 200) {
        // console.log("subcatagoryservices--", res);
        setSubcatagorydata(res.data?.success);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addServiceProducts = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("serviceCatagoryName", catagory);
    formdata.append("serviceSubcatagoryName", subcatagory);
    formdata.append("serviceProductName", ProductName);
    formdata.append("serviceProductPrice", ProductPrice);
    formdata.append("serviceProductRange", minValue && minValue);
    formdata.append("serviceProductImage", Image);
    formdata.append("serviceProductDescription", Description);
    formdata.append("serviceProductBrand", Brand);
    try {
      const config = {
        url: "/vendor/services/productlist/addserviceproducts",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Sevice Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
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
      name: "Catagory Name",
      selector: (row) => row.serviceCatagoryName,
    },
    {
      name: "Subcatagory Name",
      selector: (row) => row.serviceSubcatagoryName,
    },
    {
      name: "Services Name",
      selector: (row) => row.serviceProductName,
    },
    {
      name: "Services Price",
      selector: (row) => row.serviceProductPrice,
      width: "100px",
    },

    {
      name: "Services Range",
      selector: (row) => row.serviceProductRange,
      width: "100px",
    },
    {
      name: "Services Brand",
      selector: (row) => row.serviceProductBrand,
      width: "100px",
    },
    {
      name: "Image",
      selector: (row) => (
        <>
          <img
            src={`https://api.infinitimart.in/ServiceProductList/${row.serviceProductImage}`}
            alt=""
            style={{ padding: "7px", width: "100%" }}
          />
        </>
      ),
    },
    {
      name: "Description",
      selector: (row, index) => row.serviceProductDescription,
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.serviceProductStatus === "approved") {
          return <p style={{ color: "#188c19", fontWeight: 600 }}>Approved</p>;
        } else if (row.serviceProductStatus === "disapproved") {
          return (
            <p style={{ color: "#c0352f", fontWeight: 600 }}>Disapproved</p>
          );
        } else {
          return (
            <p style={{ color: "#ffbb00", fontWeight: 600 }}>Under Review</p>
          );
        }
      },
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
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
              onClick={() => deleteService(row)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  const deleteService = async (data) => {
    try {
      axios
        .post(
          `https://api.infinitimart.in/api/vendor/services/productlist/deleteservice/` +
            data._id
        )
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
      <h1> {!showEdit ? "SERVICES" : "EDIT SERVICES"} </h1>

      <div className="d-flex float-end mt-3 mb-3">
        {!showEdit && (
          <>
            <button
              className="btn-primary-button mx-2 addProduct"
              style={selected == 1 ? active : inactive}
              onClick={handleClick(1)}
            >
              Add Service
            </button>

            <button
              style={selected == 0 ? active : inactive}
              onClick={handleClick(0)}
              className="btn-secondary-button AllProduct"
            >
              All Services
            </button>
          </>
        )}
      </div>

      <div>
        <div>
          {selected === 0 && !showEdit ? (
            <DataTable
              columns={columns}
              data={productData}
              pagination
              fixedHeader
              selectableRowsHighlight
              subHeaderAlign="left"
              highlightOnHover
            />
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
                            onChange={(e) => setcatagory(e.target.value)}
                          >
                            <option>Choose...</option>
                            <option key={user?.id} value={user?.category}>
                              {user?.category}{" "}
                            </option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="product-grid">
                          <Form.Label>Services Name</Form.Label>
                          <Form.Control
                            name="Productname"
                            // value={data.ProductName}
                            onChange={(e) => setProductName(e.target.value)}
                            type="text"
                            placeholder="Enter Service"
                          />
                        </Form.Group>
                        <Form.Group className="product-grid">
                          <Form.Label>Services Price</Form.Label>
                          <Form.Control
                            name="Product Price"
                            // value={data.ProductName}
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
                          onClick={addServiceProducts}
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
                          <Form.Label>Service Brand</Form.Label>
                          <Form.Control
                            name="brand"
                            placeholder="Service Brand"
                            // value={data.brand}
                            onChange={(e) => setBrand(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formGridZip"
                          className="product-grid"
                        >
                          <Form.Label className="mb-3">
                            Service Range
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
                  {showEdit ? <EditServices servicesData={EditService} /> : ""}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Services;
