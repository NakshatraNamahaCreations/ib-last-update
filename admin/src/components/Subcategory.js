import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

function SubCategory() {
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);
  const [catagoryName, setCatagoryName] = useState("");
  const [subcatagoryName, setSubcatagoryName] = useState("");
  const [subcatagory_image, setSubcatagory_image] = useState("");
  const [catagoryNameError, setCatagoryNameError] = useState("");
  const [subcatagoryNameError, setSubcatagoryNameError] = useState("");
  const [subcatagory_imageError, setSubcatagory_imageError] = useState("");
  //search
  const [searchSubCategory, setSearchSubCategory] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [excel, setExcel] = useState();
  const [hideUploadButton, setHideUploadButton] = useState(true);
  const [jsonData, setJsonData] = useState([]);

  // Edit
  const [editCatagoryName, setEditCatagoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");
  const [editSubcatagoryImage, setEditSubcatagoryImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleEdit = (category) => {
    setEditSubcategory(category);
    handleShowPopUp(true);
  };

  const [show, setShow] = useState(false);

  const handleClosemodel = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateForm = () => {
    let hasErrors = false;

    if (!catagoryName) {
      setCatagoryNameError("Please Enter Your Catagory Name");
      hasErrors = true;
    } else {
      setCatagoryNameError("");
    }

    if (!subcatagoryName) {
      setSubcatagoryNameError("Please select Subcatagory Name.");
      hasErrors = true;
    } else {
      setSubcatagoryNameError("");
    }

    if (!subcatagory_image) {
      setSubcatagory_imageError("Please upload a  image.");
      hasErrors = true;
    } else {
      setSubcatagory_imageError("");

      if (!subcatagory_image.type.startsWith("image/")) {
        setSubcatagory_imageError("Please upload a valid image file.");
        hasErrors = true;
      }
    }

    return !hasErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await AddSubCatagory(e);
    }
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
    setEditSubcatagoryImage(file);
  };

  const AddSubCatagory = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("catagoryName", catagoryName);
    formdata.append("SubcatagoryName", subcatagoryName);
    formdata.append("SubcatagoryImage", subcatagory_image);
    try {
      const config = {
        url: "/vendor/product/subcatagory/addsubcatagory",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          // console.log("success");
          // alert(res.data.success);
          handleClosemodel();
          getAllSubCatagory();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  useEffect(() => {
    getAllCatagory();
    getAllSubCatagory();
  }, []);

  const getAllCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
    );
    if (res.status === 200) {
      console.log("catagory===", res);
      setCatagory(res.data?.catagory);
    }
  };

  const getAllSubCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/product/subcatagory/getsubcatagory"
    );
    if (res.status === 200) {
      console.log("subcatagory===", res);
      setSubCatagory(res.data?.subcategory);
      setfilterdata(res.data?.subcategory);
    }
  };

  const deleteSubCatagory = async (data) => {
    try {
      axios
        .post(
          `https://api.infinitimart.in/api/vendor/product/subcatagory/deletesubcatagory/` +
            data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            // alert(res.data.success);
            getAllSubCatagory();
          }
        });
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  const updateCategory = async () => {
    try {
      const subCategoryId = editSubcategory._id;
      const formdata = new FormData();
      formdata.append("catagoryName", editCatagoryName);
      formdata.append("SubcatagoryName", editSubcategoryName);
      if (editSubcatagoryImage) {
        formdata.append("SubcatagoryImage", editSubcatagoryImage);
      }

      const config = {
        url: `/vendor/product/subcatagory/updateproductsubcategory/${subCategoryId}`,
        method: "put",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log("success");
        alert(response.data.message);
        getAllSubCatagory(); // Refresh the subcategory list
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
      // selector: (row, index) => row.catagoryName,
      selector: (row, index) =>
        row.catagoryName.charAt(0).toUpperCase() + row.catagoryName.slice(1),
    },
    {
      name: "Subcategory",
      // selector: (row, index) => row.SubcatagoryName,
      selector: (row, index) =>
        row.SubcatagoryName.charAt(0).toUpperCase() +
        row.SubcatagoryName.slice(1),
    },
    {
      name: "Image",
      selector: (row, index) => (
        <>
          <img
            src={`https://api.infinitimart.in/subcatagory/${row.SubcatagoryImage}`}
            alt=""
            style={{ padding: "7px", width: "50%" }}
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
              onClick={() => deleteSubCatagory(row)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    const searchResults = () => {
      let results = subCatagory;
      if (searchSubCategory) {
        results = results.filter(
          (item) =>
            item.SubcatagoryName &&
            item.SubcatagoryName.toLowerCase().includes(
              searchSubCategory.toLowerCase()
            )
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [searchSubCategory]);

  useEffect(() => {
    if (excel) {
      readFile();
    }
  }, [excel]);

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
      setJsonData(JSON.parse(convertToJson(data)));
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
    return JSON.stringify(result); //JSON
  }

  console.log("subcategory excel upload", excel);

  const handleImport = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/vendor/product/subcatagory/addsubcatogoriesviaexcelesheet",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        headers: { "content-type": "application/json" },
        data: {
          subcategories: jsonData.map((ele) => ({
            SubcatagoryName: ele.SubcatagoryName,
            catagoryName: ele.catagoryName,
          })),
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(jsonData, "jsonData");
        alert(res.data.success);
        setHideUploadButton(false);
        getAllSubCatagory();
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleImport = async () => {
  //   if (excel) {
  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheet = workbook.Sheets[workbook.SheetNames[0]];
  //       const jsonData = XLSX.utils.sheet_to_json(sheet).map((item) => ({
  //         SubcatagoryName: item.SubcatagoryName,
  //         catagoryName: item.catagoryName,
  //       }));

  //       try {
  //         const response = await axios.post(
  //           "https://api.infinitimart.in/api/vendor/product/subcatagory/addsubcatogoriesviaexcelesheet",
  //           { subcategories: jsonData }
  //         );
  //         console.log(jsonData, "jsonData");
  //         alert(response.data.success);
  //         getAllSubCatagory();

  //         // window.location.reload();
  //         console.log("Response from backend:", response.data);
  //       } catch (error) {
  //         console.error("Error sending data to backend:", error);
  //       }
  //     };
  //     reader.readAsArrayBuffer(excel);
  //   }
  // };

  const csvData = [["catagoryName", "SubcatagoryName"]];
  return (
    <div>
      <div>
        <div
          className="d-flex pt-3 pb-3"
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <Form.Control
              type="text"
              placeholder="Search by Subcategory"
              onChange={(e) => setSearchSubCategory(e.target.value)}
            />
            <div className="mt-2">
              <CSVLink data={csvData} filename={"Product Subcategory.csv"}>
                {" "}
                <Button
                  className="btn btn-danger me-1"
                  style={{ backgroundColor: "#a9042e", border: 0 }}
                >
                  Download csv
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
                Upload Bulk Subcategory
              </label>{" "}
              {excel && hideUploadButton ? (
                <Button
                  className="btn btn-danger ms-1"
                  style={{ backgroundColor: "#a9042e", border: 0 }}
                  onClick={handleImport}
                >
                  Bulk Upload
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
              // data-bs-toggle="modal"
              // data-bs-target="#exampleModal"
              onClick={handleShow}
            >
              Add Subcategory
            </button>
          </div>
        </div>
        <div>
          {" "}
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
      </div>

      {/* Modal */}

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
                Subcategory
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mt-1">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    onChange={(e) => setCatagoryName(e.target.value)}
                  >
                    <option>--Select All--</option>
                    {catagory.map((data) => (
                      <option value={data.catagoryName}>
                        {data.catagoryName}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mt-1">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Subcategory Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setSubcatagoryName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="mt-1">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Select Banner Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setSubcatagory_image(e.target.files[0])}
                  />
                </Form.Group>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={AddSubCatagory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal=============================================== */}
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
          <h6>Select Category</h6>
          <select
            className="p-2"
            // defaultValue={editSubcategory?.SubcatagoryName}
            style={{ width: "70%" }}
            onChange={(e) => {
              setEditCatagoryName(e.target.value);
            }}
          >
            {catagory.map((data) => (
              <option value={data.catagoryName}>{data.catagoryName} </option>
            ))}
          </select>
          <br /> <br />
          <h6>Subcategory Name</h6>
          <input
            className="p-2"
            style={{ width: "70%" }}
            defaultValue={editSubcategory?.SubcatagoryName}
            onChange={(e) => {
              setEditSubcategoryName(e.target.value);
            }}
          />
          <br /> <br />
          <h6>Subcategory Image</h6>
          {!selectedImage && (
            <img
              className="pt-2"
              src={`https://api.infinitimart.in/subcatagory/${editSubcategory?.SubcatagoryImage}`}
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
              <h6>Upload Subcategory Image</h6>
            </label>
            <input type="file" onChange={handleImageChange} />
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
          <Modal.Title> Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-1">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Category Name</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                onChange={(e) => {
                  setCatagoryName(e.target.value);
                  setCatagoryNameError("");
                }}
              >
                <option>--Select All--</option>
                {catagory.map((data) => (
                  <option value={data.catagoryName}>
                    {data.catagoryName}{" "}
                  </option>
                ))}
              </Form.Select>
              {catagoryNameError && (
                <div style={{ color: "red" }}>{catagoryNameError}</div>
              )}
            </Form.Group>
          </div>

          <div className="mt-1">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setSubcatagoryName(e.target.value);
                  setSubcatagoryNameError("");
                }}
              />
              {subcatagoryNameError && (
                <div style={{ color: "red" }}>{subcatagoryNameError}</div>
              )}
            </Form.Group>
          </div>
          <div className="mt-1">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Select Banner Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setSubcatagory_image(e.target.files[0]);
                  setSubcatagory_imageError("");
                }}
              />
              {subcatagory_imageError && (
                <div style={{ color: "red" }}>{subcatagory_imageError}</div>
              )}
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SubCategory;
