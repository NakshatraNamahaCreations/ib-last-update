import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Banner() {
  const [image, setImage] = useState();
  const [content, setcontent] = useState("");
  const [Banner, setBanner] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page
  const pageCount = Math.ceil(Banner.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = Banner.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const addbanner = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("banner", image);
    formdata.append("content", content);
    try {
      const config = {
        url: "/admin/addbanner",
        method: "post",
        baseURL: "http://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          console.log("success");
          alert("Banner Added");
          window.location.reload();
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
    let res = await axios.get("http://api.infinitimart.in/api/admin/getbanner");
    if (res.status === 200) {
      console.log(res);
      setBanner(res.data?.success);
    }
  };

  const deletBanner = async (data) => {
    try {
      axios
        .post(`http://api.infinitimart.in/api/admin/deletebanner/` + data._id)
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  var i = 1;

  return (
    <div>
      <div>
        <div>
          <a href="/contentmanagement">
            <i class="fa-solid fa-angles-left"></i> Go Back
          </a>
        </div>
        <br />
        <div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <button
              type="button"
              class="btn btn-primary _btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Banner Image
            </button>

            <ReactPaginate
              previousLabel={<i class="fa-solid fa-angles-left"></i>}
              nextLabel={<i class="fa-solid fa-angles-right"></i>}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"pagination-active"}
            />
          </div>
          <br />
          <table class="table  table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  S.No
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "12%" }}
                >
                  Images
                </th>
                <th scope="col" className="text-center">
                  Content
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageData?.map((data) => (
                <tr>
                  <td className="text-center">{i++} </td>
                  <td className="text-center">
                    <div>
                      <img
                        src={`http://api.infinitimart.in/banner/${data.bannerImage}`}
                        className="td-img"
                        alt-loading="..."
                        style={{ width: "100%" }}
                      />
                    </div>
                  </td>
                  <td className="text-center">{data.content} </td>
                  <td className="text-center">
                    <i
                      class="fa-solid fa-trash"
                      title="Delete"
                      style={{ color: "#a9042e", cursor: "pointer" }}
                      onClick={() => deletBanner(data)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <label>Enter Content </label>
              <input
                type="text"
                className="mx-1"
                onChange={(e) => setcontent(e.target.value)}
              />
              <br />
              <label style={{ marginTop: "20px" }}>
                Select Banner Image :{" "}
              </label>
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
export default Banner;
