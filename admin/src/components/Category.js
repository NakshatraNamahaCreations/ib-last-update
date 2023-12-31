import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Sidebar from "./layout/Sidebar";
import DataTable from "react-data-table-component";
import SubCategory from "./Subcategory";
import { Modal } from "react-bootstrap";
import ProductApproval from "./ProductApproval";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import Pageloader from "../components/Pageloader";

function Category() {
  const [categoryTab, setCategoryTab] = useState(true);
  const [subCategoryTab, setSubCategoryTab] = useState(false);
  const [productApprovalTab, setProductApprovalTab] = useState(false);
  const [catagory, setCatagory] = useState([]);
  const [catagoryName, setCatagoryName] = useState("");
  const [image, setImage] = useState("");
  const [catagoryNameError, setCatagoryNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [hideUploadButton, setHideUploadButton] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [reload, setReload] = useState(false);

  //search
  const [searchCategory, setSearchCategory] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  // Edit
  const [editCatagoryName, setEditCatagoryName] = useState("");
  const [editCatagoryImage, setEditCatagoryImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showButtonLoader, setShowButtonLoader] = useState(false);

  const [show, setShow] = useState(false);

  // const handleClosemodel = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleClosemodel = () => {
    setShow(false);
    setShowButtonLoader(false);
  };

  const handleShow = () => {
    setShow(true);
    setShowButtonLoader(false);
  };

  const validateForm = () => {
    let hasErrors = false;

    if (!catagoryName) {
      setCatagoryNameError("Please Enter Your Catagory Name");
      hasErrors = true;
    } else {
      setCatagoryNameError("");
    }

    if (!image) {
      setImageError("Please upload a banner image.");
      hasErrors = true;
    } else {
      setImageError("");

      if (!image.type.startsWith("image/")) {
        setImageError("Please upload a valid image file.");
        hasErrors = true;
      }
    }

    return !hasErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowButtonLoader(true);
      setTimeout(() => {
        setShowButtonLoader(false);
      }, 2000);
      await AddCatagory(e);
      // setRefresh(true);
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    handleShowPopUp(true);
  };

  const handleShowPopUp = () => {
    setShowEdit(true);
  };

  const handleClose = () => {
    setShowEdit(false);
  };

  //choose image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setEditCatagoryImage(file);
  };

  const AddCatagory = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("catagoryName", catagoryName);
    formdata.append("catagoryImage", image);
    try {
      const config = {
        url: "/vendor/product/catagory/addcatagory",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          // alert(res.data.success);
          // window.location.reload();
          getAllCatagory();
          handleClosemodel();
          setReload((prev) => !prev);
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  // const getAllCatagory = async () => {
  //   let res = await axios.get(
  //     "https://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
  //   );
  //   if (res.status === 200) {
  //     console.log(res);
  //     setCatagory(res.data?.catagory);
  //     setfilterdata(res.data?.catagory);
  //   }
  // };

  const getAllCatagory = async () => {
    setIsLoading(true);
    try {
      let res = await axios.get(
        "https://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
      );
      if (res.status === 200) {
        console.log(res);
        setCatagory(res.data?.catagory);
        setfilterdata(res.data?.catagory);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Show page loader for 2 seconds
    }
  };

  useEffect(() => {
    getAllCatagory();
  }, [reload]);

  const deleteCatagory = async (data) => {
    try {
      axios
        .post(
          `https://api.infinitimart.in/api/vendor/product/catagory/deletecatagory/` +
            data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);

            getAllCatagory();
          }
        });
      // setRefresh(true);
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  const updateCategory = async () => {
    try {
      const categoryId = editCategory._id;
      const formdata = new FormData();
      formdata.append("catagoryName", editCatagoryName);
      if (editCatagoryImage) {
        formdata.append("catagoryImage", editCatagoryImage);
      }

      const config = {
        url: `/vendor/product/catagory/updateproductcategory/${categoryId}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log("success");
        // alert(response.data.message);
        getAllCatagory();
        setShowEdit(false);
      }
      // setRefresh(true);
    } catch (error) {
      console.log(error);
      alert("Unable to complete the request");
    }
  };

  const columns = [
    {
      name: "SL.NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row, index) =>
        // row.catagoryName.charAt(0).toUpperCase() + row.catagoryName.slice(1),
        row.catagoryName?.charAt(0)?.toUpperCase() +
        (row.catagoryName ? row.catagoryName.slice(1) : ""),
    },
    {
      name: "Image",
      selector: (row, index) => (
        <>
          <img
            src={`https://api.infinitimart.in/catagory/${row.catagoryImage}`}
            alt=""
            style={{ padding: "7px", width: "35%" }}
          />
        </>
      ),
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
              onClick={() => deleteCatagory(row)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    const searchResults = () => {
      let results = catagory;
      if (searchCategory) {
        results = results.filter(
          (item) =>
            item.catagoryName &&
            item.catagoryName
              .toLowerCase()
              .includes(searchCategory.toLowerCase())
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [searchCategory]);

  const [excel, setExcel] = useState(null);
  console.log("excel upload", excel);

  const handleImport = async () => {
    if (excel) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const formData = new FormData();

        for (let i = 0; i < jsonData.length; i++) {
          const imageFile = jsonData[i].imageFile;
          const imageName = jsonData[i].imageName;

          formData.append(imageName, imageFile);
        }
        try {
          const response = await axios.post(
            "https://api.infinitimart.in/api/vendor/product/catagory/addcustomersviaexcelesheet",
            jsonData
          );
          alert(response.data.success);
          setHideUploadButton(false);
          getAllCatagory();
          // window.location.reload();
          console.log("Response from backend:", response.data);
        } catch (error) {
          console.error("Error sending data to backend:", error);
        }
      };
      reader.readAsArrayBuffer(excel);
    }
  };

  // const formData = new FormData();
  // console.log("bulkImages", bulkImages);

  // const uploadImages = async (e) => {
  //   e.preventDefault();

  //   Array.from(bulkImages).forEach((file) => {
  //     formData.append("catagoryImage", file);
  //   });
  //   console.log("bulkImages Inside", bulkImages);
  //   try {
  //     const config = {
  //       url: "/bulkimageuploading",
  //       method: "post",
  //       baseURL: "https://api.infinitimart.in/api/vendor/product/catagory",
  //       headers: { "Content-Type": "multipart/form-data" },
  //       data: formData,
  //     };
  //     let res = await axios(config);
  //     if (res.status === 200) {
  //       console.log(res.data);
  //       alert("Image Uploaded Successfully");
  //       getAllCatagory();
  //       // window.location.reload();
  //       return res;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <h3 style={{ marginTop: "64px", marginLeft: "30px" }}>
          {" "}
          {categoryTab
            ? "CATEGORY"
            : subCategoryTab
            ? "SUBCATEGORY"
            : productApprovalTab
            ? "PRODUCT APPROVAL"
            : ""}{" "}
        </h3>
        <div className="container">
          <div className="pt-2" style={{ marginLeft: "20px" }}>
            <span>
              {" "}
              <input
                type="radio"
                value={categoryTab}
                name="Category"
                checked={categoryTab ? true : false}
                onChange={() => {
                  setCategoryTab(!categoryTab);
                  setSubCategoryTab(false);
                  setProductApprovalTab(false);
                }}
              />{" "}
              <label> CATEGORY</label>
            </span>{" "}
            <span>
              {" "}
              <input
                className="ms-3"
                type="radio"
                name="subCategory"
                value={subCategoryTab}
                checked={subCategoryTab ? true : false}
                onChange={() => {
                  setCategoryTab(false);
                  setSubCategoryTab(!subCategoryTab);
                  setProductApprovalTab(false);
                }}
              />{" "}
              <label> SUBCATEGORY</label>
            </span>
            <span>
              {" "}
              <input
                className="ms-3"
                type="radio"
                name="subCategory"
                value={productApprovalTab}
                checked={productApprovalTab ? true : false}
                onChange={() => {
                  setCategoryTab(false);
                  setSubCategoryTab(false);
                  setProductApprovalTab(!productApprovalTab);
                }}
              />{" "}
              <label> PRODUCT APPROVAL</label>
            </span>
          </div>
        </div>
        {categoryTab && !subCategoryTab && !productApprovalTab ? (
          <>
            <div
              className="pb-3 d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <Form.Control
                  type="search"
                  placeholder="Search by category"
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="buyer-search-input"
                />

                <div className="buyer-search-input pt-2">
                  <CSVLink data={catagory} filename={"Product Category.csv"}>
                    {" "}
                    <Button
                      className="btn btn-danger me-1"
                      style={{ backgroundColor: "#a9042e", border: 0 }}
                    >
                      Download csv
                    </Button>
                  </CSVLink>

                  <input
                    accept=".xlsx,.xls,.csv"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => setExcel(e.target.files[0])}
                  />
                  <label
                    className="btn btn-outline-danger "
                    style={{ borderColor: "#a9042e" }}
                    htmlFor="icon-button-file"
                  >
                    Upload Bulk Category
                  </label>

                  {excel && hideUploadButton ? (
                    <Button
                      className="btn btn-danger ms-1"
                      style={{ backgroundColor: "#a9042e", border: 0 }}
                      onClick={() => {
                        handleImport();
                      }}
                    >
                      Bulk Upload
                    </Button>
                  ) : (
                    ""
                  )}
                  {/* {uploadCategory ? (
                    <>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="icon-button-file1"
                        type="file"
                        multiple
                        onChange={(e) => setBulkImages(e.target.files)}
                      />
                      <label
                        className="btn btn-outline-info "
                        htmlFor="icon-button-file1"
                      >
                        Select Images
                      </label>
                      <Button
                        className="btn btn-danger"
                        style={{ backgroundColor: "#a9042e", border: 0 }}
                        onClick={uploadImages}
                      >
                        Upload Images
                      </Button>
                    </>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary _btn"
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                  onClick={handleShow}
                >
                  Add Category
                </button>
              </div>
            </div>
            <div>
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
          </>
        ) : (
          <>
            {!categoryTab && subCategoryTab && !productApprovalTab ? (
              <SubCategory />
            ) : (
              <>
                {!categoryTab && !subCategoryTab && productApprovalTab ? (
                  <ProductApproval />
                ) : null}
              </>
            )}
          </>
        )}
      </div>

      {/* =======================Add Modal===================== */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Category
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="group pt-1">
                <Form>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        placeholder=" Category"
                        onChange={(e) => setCatagoryName(e.target.value)}
                      />
                      <br />
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="categoryimage"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={AddCatagory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        show={showEdit}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Category Name</h6>
          <input
            className="p-2"
            style={{ width: "70%" }}
            defaultValue={editCategory?.catagoryName}
            onChange={(e) => {
              setEditCatagoryName(e.target.value);
            }}
          />
          <br /> <br />
          <h6>Category Image</h6>
          {!selectedImage && (
            <img
              className="pt-2"
              src={`https://api.infinitimart.in/catagory/${editCategory?.catagoryImage}`}
              alt=""
              width="25%"
            />
          )}
          <div className="ms-2 ">
            {selectedImage && (
              <img
                className="edit-product-image"
                src={selectedImage}
                alt="Uploaded"
                width="25%"
              />
            )}
          </div>{" "}
          <br />
          <div className="ms-2 ">
            <label className="pb-2 edit-lable">
              <h6>Upload Category Image</h6>
            </label>
            <input className="ms-2" type="file" onChange={handleImageChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="update-button" onClick={updateCategory}>
            Update
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal */}
      <Modal show={show} onHide={handleClosemodel}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="group pt-1">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    placeholder=" Category"
                    onChange={(e) => {
                      setCatagoryName(e.target.value);
                      setCatagoryNameError("");
                    }}
                  />
                  {catagoryNameError && (
                    <div style={{ color: "red" }}>{catagoryNameError}</div>
                  )}
                  <br />
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="categoryimage"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setImageError("");
                    }}
                  />
                  {imageError && (
                    <div style={{ color: "red" }}>{imageError}</div>
                  )}
                </Form.Group>
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormSubmit}>
            {/* Save */}
            {showButtonLoader ? "Adding..." : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading && <Pageloader />}
    </div>
  );
}

export default Category;
