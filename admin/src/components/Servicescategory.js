import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Sidebar from "./layout/Sidebar";
import DataTable from "react-data-table-component";
import { Button, Modal } from "react-bootstrap";
import ServicessubCategory from "./Servicessubcategory";
import { WbIncandescentTwoTone } from "@mui/icons-material";
import ServiceApproval from "./ServiceApproval";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

function Servicescategory() {
  const [categoryTab, setCategoryTab] = useState(true);
  const [subCategoryTab, setSubCategoryTab] = useState(false);
  const [serviceApprovalTab, setServiceApprovalTab] = useState(false);
  const [catagory, setCatagory] = useState([]);
  const [catagoryName, setCatagoryName] = useState(true);
  const [image, setImage] = useState();
  //search
  const [searchServiceCategory, setSearchServiceCategory] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [excel, setExcel] = useState();
  const [hideUploadButton, setHideUploadButton] = useState(true);

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
    formdata.append("categoryname", catagoryName);
    formdata.append("categoryimage", image);
    try {
      const config = {
        url: "/vendor/services/catagory/addservicecatagory",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert(res.data.message);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.Error);
    }
  };

  const getAllCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/services/catagory/getservicecatagory"
    );
    if (res.status === 200) {
      console.log(res);
      setCatagory(res.data?.categoryservices);
      setfilterdata(res.data?.categoryservices);
    }
  };
  useEffect(() => {
    getAllCatagory();
  }, []);

  const deleteCatagory = async (data) => {
    try {
      axios
        .post(
          `https://api.infinitimart.in/api/vendor/services/catagory/deleteservicecatagory/` +
            data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            alert(res.data.success);
            getAllCatagory();
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
      formdata.append("categoryname", editCatagoryName);
      if (editCatagoryImage) {
        formdata.append("categoryimage", editCatagoryImage);
      }

      const config = {
        url: `/vendor/services/catagory/updateservicecategory/${categoryId}`,
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
      alert(error.response.data.error);
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row, index) => row.categoryname,
    },

    {
      name: "Image",
      selector: (row, index) => (
        <>
          <img
            src={`https://api.infinitimart.in/ServiceCategory/${row?.categoryimage}`}
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
      if (searchServiceCategory) {
        results = results.filter(
          (item) =>
            item.categoryname &&
            item.categoryname
              .toLowerCase()
              .includes(searchServiceCategory.toLowerCase())
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [searchServiceCategory]);

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
            "https://api.infinitimart.in/api/vendor/services/catagory/addservicecatogoriesviaexcelesheet",
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

  const csvData = [["categoryname"]];

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
            : serviceApprovalTab
            ? "SERVICE APPROVAL"
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
                  setServiceApprovalTab(false);
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
                  setServiceApprovalTab(false);
                }}
              />{" "}
              <label> SUBCATEGORY</label>
            </span>
            <span>
              {" "}
              <input
                className="ms-3"
                type="radio"
                name="SERVICE APPROVAL"
                value={serviceApprovalTab}
                checked={serviceApprovalTab ? true : false}
                onChange={() => {
                  setCategoryTab(false);
                  setSubCategoryTab(false);
                  setServiceApprovalTab(!serviceApprovalTab);
                }}
              />{" "}
              <label> SERVICE APPROVAL</label>
            </span>
          </div>
        </div>
        {categoryTab && !subCategoryTab && !serviceApprovalTab ? (
          <>
            <div
              className=" d-flex pt-4 pb-3"
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <Form.Control
                  type="text"
                  placeholder="Search by category"
                  onChange={(e) => setSearchServiceCategory(e.target.value)}
                />
                <div className="mt-2">
                  <CSVLink data={csvData} filename={"Service Category.csv"}>
                    {" "}
                    <Button
                      className="btn btn-danger me-1"
                      style={{ backgroundColor: "#a9042e", border: 0 }}
                    >
                      Download
                    </Button>
                  </CSVLink>
                  <input
                    accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => setExcel(e.target.files[0])}
                  />{" "}
                  <label
                    className="btn btn-outline-danger "
                    style={{ borderColor: "#a9042e" }}
                    htmlFor="icon-button-file"
                  >
                    {" "}
                    Upload Category
                  </label>{" "}
                  {excel && hideUploadButton ? (
                    <Button
                      className="btn btn-danger ms-1"
                      style={{ backgroundColor: "#a9042e", border: 0 }}
                      onClick={handleImport}
                    >
                      Upload
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-primary _btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
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
            {!categoryTab && subCategoryTab && !serviceApprovalTab ? (
              <>
                <ServicessubCategory />
              </>
            ) : (
              <>
                {!categoryTab && !subCategoryTab && serviceApprovalTab ? (
                  <ServiceApproval />
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
                <div className="pb-2">Category</div>
                <input
                  className="p-1"
                  placeholder="Category"
                  style={{ width: "70%" }}
                  onChange={(e) => setCatagoryName(e.target.value)}
                />
                <br /> <br />
                <div className="pb-2">Image</div>
                <input
                  type="file"
                  name="categoryImage"
                  onChange={(e) => setImage(e.target.files[0])}
                />
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
          <h5>Category Name</h5>
          <input
            className="p-2"
            defaultValue={editCategory?.categoryname}
            style={{ width: "70%" }}
            onChange={(e) => {
              setEditCatagoryName(e.target.value);
            }}
          />
          <br /> <br />
          <h5>Image</h5>
          {!selectedImage && (
            <img
              src={`https://api.infinitimart.in/ServiceCategory/${editCategory?.categoryimage}`}
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
            <label className="pb-2 edit-lable">Upload Category Image</label>
            <input type="file" onChange={handleImageChange} />
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

export default Servicescategory;
