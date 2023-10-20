import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

function ServiceBanner() {
  const [image, setImage] = useState();
  const [content, setcontent] = useState("");
  const [bannerPlacement, setBannerPlacement] = useState("");
  const [Banner, setBanner] = useState([]);

  const addbanner = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("bannerImage", image);
    formdata.append("bannerContent", content);
    formdata.append("bannerPlacement", bannerPlacement);
    // formdata.append("bannerType", bannerType);
    try {
      const config = {
        url: "/service/addservicebanner",
        method: "post",
        baseURL: "http://localhost:8000/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert(res.data.success);
          getAllBanner();
          // window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const getAllBanner = async () => {
    let res = await axios.get(
      "http://localhost:8000/api/service/getservicebanner"
    );
    if (res.status === 200) {
      console.log(res);
      setBanner(res.data?.success);
    }
  };

  const deletBanner = async (data) => {
    try {
      axios
        .post(
          `http://localhost:8000/api/service/deleteservicebanner/` + data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            alert(res.data.success);
            getAllBanner();
          }
        });
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Banner Placement",
      selector: (row, index) => row.bannerPlacement,
    },
    {
      name: "Content",
      selector: (row, index) => row.bannerContent,
    },
    {
      name: "Image",
      selector: (row, index) => (
        <>
          <img
            src={`http://localhost:8000/serviceBanner/${row.bannerImage}`}
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
              class="fa-solid fa-trash delete-icon"
              title="Delete"
              style={{ color: "#a9042e", cursor: "pointer" }}
              onClick={() => deletBanner(row)}
            ></i>
          </span>
        </>
      ),
    },
  ];

  return (
    <div div className="  ">
      <div className="  pt-3">
        <div
          className="d-flex pt-3 pb-3"
          style={{ justifyContent: "space-between" }}
        >
          <button
            type="button"
            class="btn btn-primary _btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Service Banner
          </button>
        </div>
        <DataTable
          columns={columns}
          data={Banner}
          pagination
          fixedHeader
          selectableRowsHighlight
          subHeaderAlign="left"
          highlightOnHover
        />
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
                Banner Images
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                {" "}
                <h6>Enter Content </h6>
              </div>
              <div>
                <input
                  type="text"
                  className="mx-1 p-2"
                  placeholder="Enter Banner"
                  style={{ width: "70%" }}
                  onChange={(e) => setcontent(e.target.value)}
                />
              </div>
              <br />
              <h6>Banner Placement </h6>
              <select
                className="p-2"
                style={{ width: "70%" }}
                onClick={(e) => setBannerPlacement(e.target.value)}
              >
                <option value="">---Select---</option>
                <option value="Home page">Home page</option>
                <option value="Product Category">Product Category</option>
                <option value="Product Subcategory">Product Subcategory</option>
                <option value="Service Category">Service Category</option>
                <option value="Service Subcategory">Service Subcategory</option>
                <option value="Application">Application</option>
                <option value="Industry category">Industry category</option>
                <option value="Keywords search">Keywords search</option>
              </select>
              <br /> <br />
              <h6>Select Banner Image : </h6>
              <input
                type="file"
                className="mx-1"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={addbanner}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ServiceBanner;
