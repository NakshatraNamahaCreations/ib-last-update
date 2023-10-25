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

function Category() {
  const [categoryTab, setCategoryTab] = useState(true);
  const [subCategoryTab, setSubCategoryTab] = useState(false);
  const [productApprovalTab, setProductApprovalTab] = useState(false);
  const [catagory, setCatagory] = useState([]);
  const [catagoryName, setCatagoryName] = useState(true);
  const [image, setImage] = useState(false);
  const [bulkImages, setBulkImages] = useState();
  const [uploadCategory, setUploadCategory] = useState(false);
  const [hideUploadCatagory, setHideUploadCatagory] = useState(true);
  const [excel, setExcel] = useState();
  const [excelData, setExcelData] = useState([]);

  //search
  const [searchCategory, setSearchCategory] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  // Edit
  const [editCatagoryName, setEditCatagoryName] = useState("");
  const [editCatagoryImage, setEditCatagoryImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleEdit = (category) => {
    setEditCategory(category);
    handleShowPopUp(true);
  };

  const handleShowPopUp = () => {
    setShowEdit(true);
  };
  const handleClose = () => {
    setShowEdit(false); // Hide the edit form after submitting it or canceling it by pressing
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
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  const getAllCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
    );
    if (res.status === 200) {
      console.log(res);
      setCatagory(res.data?.catagory);
      setfilterdata(res.data?.catagory);
    }
  };

  useEffect(() => {
    getAllCatagory();
  }, []);

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
            alert(res.data.success);
            window.location.assign("/category");
          }
        });
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
        alert(response.data.message);
        getAllCatagory(); // Refresh the category list
        setShowEdit(false); // Close the modal
      }
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
      selector: (row, index) => row.catagoryName,
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

  const csvData = [["catagoryName", "catagoryImage"]];

  if (excel && excelData.length === 0) {
    readFile();
  }

  function readFile() {
    var name = excel.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data); // shows that excel data is read
      console.log(convertToJson(data)); // shows data in json format
      setExcelData(JSON.parse(convertToJson(data)));
    };
    reader.readAsBinaryString(excel);
  }

  function convertToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  const postorders = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/vendor/product/catagory/addcustomersviaexcelesheet",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        headers: { "content-type": "application/json" },
        data: {
          product: excelData.map((datas) => ({
            catagoryName: datas.Product_Name,
            catagoryImage: datas.catagoryImage,
          })),
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data);
        alert("Products Added Successfully");
        window.location.reload("");
        // localStorage.setItem("signupdata",JSON.stringify(res.data.user));
        // localStorage.setItem("token",res.data.token);
        // window.location.assign("/verify-otp");
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postimage = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    Array.from(image).forEach((file) => {
      formdata.append("catagoryImage", file);
    });
    try {
      const config = {
        url: "/vendor/product/catagory/bulkimageuploading",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data);
        alert("Image Uploaded Successfully");
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 pt-3">
        <h3>
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
          <div className="pt-4">
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
            <CSVLink data={csvData}>
              <Button>Download me</Button>
            </CSVLink>{" "}
            <input
              accept=".xlsx,.xls,.csv"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={(e) => setExcel(e.target.files[0])}
            />
            <label className="btn btn-outline-info " htmlFor="icon-button-file">
              {" "}
              Import Excel
            </label>
            <button
              className="btn btn-outline-success ms-2 me-2"
              onClick={postorders}
            >
              Upload
            </button>
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
              {" "}
              Select Images
            </label>
            <button
              className="btn btn-outline-success ms-2 me-2"
              onClick={postimage}
            >
              Upload Images
            </button>
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
    </div>
  );
}

export default Category;
