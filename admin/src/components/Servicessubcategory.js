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
import { Button, Modal } from "react-bootstrap";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";

function ServicessubCategory() {
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubcatagory] = useState([]);
  const [catagoryName, setCatagoryName] = useState("");
  const [subcatagoryName, setSubcatagoryName] = useState("");
  const [subcatagory_image, setSubcatagory_image] = useState();
  //search
  const [searchServiceSubCategory, setServiceSearchSubCategory] = useState("");
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

  const handleEdit = (subcategory) => {
    setEditSubcategory(subcategory);
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
        url: "/vendor/services/subcatagory/addsubcatagoryservices",
        method: "post",
        baseURL: "https://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert(res.data.message);
          getAllSubCatagory();
          // window.location.reload();
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
      "https://api.infinitimart.in/api/vendor/services/catagory/getservicecatagory"
    );
    if (res.status === 200) {
      console.log("catagory===", res);
      setCatagory(res.data?.categoryservices);
    }
  };

  const getAllSubCatagory = async () => {
    let res = await axios.get(
      "https://api.infinitimart.in/api/vendor/services/subcatagory/getsubcatagoryservices"
    );
    if (res.status === 200) {
      console.log("subcatagory===", res);
      setSubcatagory(res.data?.subcategory);
      setfilterdata(res.data?.subcategory);
    }
  };

  const deleteSubCatagory = async (data) => {
    try {
      axios
        .post(
          `https://api.infinitimart.in/api/vendor/services/subcatagory/deletesubcatagoryservices/` +
            data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            alert(res.data.success);
            getAllSubCatagory();
          }
        });
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  const updateSubCategory = async () => {
    try {
      const subCategoryId = editSubcategory._id;
      const formdata = new FormData();
      formdata.append("catagoryName", editCatagoryName);
      formdata.append("SubcatagoryName", editSubcategoryName);
      if (editSubcatagoryImage) {
        formdata.append("SubcatagoryImage", editSubcatagoryImage);
      }

      const config = {
        url: `/vendor/services/subcatagory/updateservicesubcategory/${subCategoryId}`,
        method: "post",
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
      name: "S.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row, index) => row.catagoryName,
    },
    {
      name: "Subcategory",
      selector: (row, index) => row.SubcatagoryName,
    },
    {
      name: "Image",
      selector: (row, index) => (
        <>
          <img
            src={`https://api.infinitimart.in/servicesubcatagory/${row.SubcatagoryImage}`}
            alt=""
            width="50%"
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
              style={{ color: "#a9042e", cursor: "pointer" }}
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
      if (searchServiceSubCategory) {
        results = results.filter(
          (item) =>
            item.SubcatagoryName &&
            item.SubcatagoryName.toLowerCase().includes(
              searchServiceSubCategory.toLowerCase()
            )
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [searchServiceSubCategory]);

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
        url: "/vendor/services/subcatagory/addservicesubcatogoriesviaexcelesheet",
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
              onChange={(e) => setServiceSearchSubCategory(e.target.value)}
            />
            <div className="mt-2">
              <CSVLink data={csvData} filename={"Service Subcategory.csv"}>
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
                Upload Subcategory
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
              Add Subcategory
            </button>
          </div>
        </div>
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

      {/* Modal =================Add=================*/}

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
                      <option value={data?.id}>{data?.categoryname} </option>
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
      {/* Edit Modal ===========================================*/}
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
          <h5>Select Category</h5>
          <select
            className="p-2"
            // defaultValue={editSubcategory?.SubcatagoryName}
            style={{ width: "70%" }}
            onChange={(e) => {
              setEditCatagoryName(e.target.value);
            }}
          >
            {catagory.map((data) => (
              <option value={data.categoryname}>{data.categoryname} </option>
            ))}
          </select>
          <br /> <br />
          <h5>Subcategory Name</h5>
          <input
            className="p-2"
            style={{ width: "70%" }}
            defaultValue={editSubcategory?.SubcatagoryName}
            onChange={(e) => {
              setEditSubcategoryName(e.target.value);
            }}
          />
          <br /> <br />
          <h5>Image</h5>
          {!selectedImage && (
            <img
              src={`https://api.infinitimart.in/servicesubcatagory/${editSubcategory?.SubcatagoryImage}`}
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
            <label className="pb-2 edit-lable">Upload Subcategory Image</label>
            <input type="file" onChange={handleImageChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="update-button" onClick={updateSubCategory}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ServicessubCategory;
