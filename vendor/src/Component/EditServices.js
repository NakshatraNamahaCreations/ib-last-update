import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import InputRange from "react-input-range";

function EditServices(props) {
  const serviceObj = props.servicesData;
  console.log("servicesData", serviceObj);
  const user = JSON.parse(sessionStorage.getItem("vendor"));

  const [category, setcategory] = useState("");
  const [subcatagory, setSubcatagory] = useState("");
  const [subcatagorydata, setSubCatagorydata] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [changeServiceName, setChangeServiceName] = useState("");
  const [changeServiceBrand, setChangeServiceBrand] = useState("");
  const [changeServiceImage, setChangeServiceImage] = useState("");
  const [changeServiceDescription, setChangeServiceDescription] = useState("");
  const [changeServicePrice, setChangeServicePrice] = useState(0);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100000);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setChangeServiceImage(file);
  };

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [category]);

  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        `http://api.infinitimart.in/api/vendor/services/subcatagory/postsubcatagoryservices/`,
        {
          catagoryName: category,
        }
      );
      if (res.status === 200) {
        console.log("subcatagory", res);
        setSubCatagorydata(res.data?.success);
      }
    } catch (error) {
      console.error(error);
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

  const updateService = async (e) => {
    const serviceId = serviceObj._id;
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("serviceCatagoryName", user.category);
    formdata.append("serviceSubcatagoryName", subcatagory);
    formdata.append("serviceProductName", changeServiceName);
    formdata.append("serviceProductPrice", changeServicePrice);
    formdata.append("serviceProductRange", minValue && minValue);
    formdata.append("serviceProductBrand", changeServiceBrand);
    formdata.append("serviceProductImage", changeServiceImage);
    formdata.append("serviceProductDescription", changeServiceDescription);
    try {
      const config = {
        url: `/vendor/services/productlist/updateservice/${serviceId}`,
        method: "post",
        baseURL: "http://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Service Updated");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to complete the request");
    }
  };

  return (
    <div>
      <div>
        <a href="/services">
          <i class="fa-solid fa-angles-left"></i> Go Back
        </a>
      </div>
      <br />
      <div>
        <h3>Edit Services</h3>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div>
            <label className="pb-2 edit-lable">Choose Catagory:</label> <br />
            <select
              className="edit-pro-select"
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="">Select</option>
              <option key={user.category} value={user.category}>
                {user.category}{" "}
              </option>
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Product Name</label>
            <br />
            <input
              className="edit-input"
              defaultValue={
                serviceObj.serviceProductName
                  ? serviceObj.serviceProductName
                  : ""
              }
              onChange={(e) => setChangeServiceName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Brand</label>
            <br />
            <input
              className="edit-input"
              defaultValue={
                serviceObj.serviceProductBrand
                  ? serviceObj.serviceProductBrand
                  : ""
              }
              onChange={(e) => setChangeServiceBrand(e.target.value)}
            />
          </div>
          <br />{" "}
          <div>
            <label className="pb-2 edit-lable">Service Price</label>
            <br />
            <input
              className="edit-input"
              defaultValue={
                serviceObj.serviceProductPrice
                  ? serviceObj.serviceProductPrice
                  : ""
              }
              onChange={(e) => setChangeServicePrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Description</label>
            <br />
            <textarea
              className="edit-textarea"
              defaultValue={
                serviceObj?.serviceProductDescription
                  ? serviceObj?.serviceProductDescription
                  : ""
              }
              onChange={(e) => setChangeServiceDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <label className="pb-2 edit-lable">Choose SubCatagory:</label>{" "}
            <br />
            <select
              className="edit-pro-select"
              onChange={(e) => setSubcatagory(e.target.value)}
            >
              <option value="">Select</option>
              {subcatagorydata?.map((subcatagory) => (
                <option
                  key={subcatagory.SubcatagoryName}
                  value={subcatagory.SubcatagoryName}
                >
                  {subcatagory.SubcatagoryName}{" "}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="d-flex" style={{ justifyContent: "space-around" }}>
            <div>
              <label className="pb-2 edit-lable">Product Image</label>
              <br />
              {selectedImage && (
                <img
                  className="edit-product-image"
                  src={selectedImage}
                  alt="Uploaded"
                  onChange={(e) => setChangeServiceImage(e.target.files[0])}
                />
              )}
              {!selectedImage && (
                <img
                  src={`http://api.infinitimart.in/ServiceProductList/${
                    serviceObj?.serviceProductImage || ""
                  }`}
                  className="edit-product-image"
                  alt=""
                />
              )}
            </div>
            <div className="ms-2 ">
              <label className="pb-2 edit-lable">Upload Product Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
          <br />
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <Form.Group controlId="formGridZip" className="product-grid">
              <Form.Label className="mb-3">Service Range</Form.Label>
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
            <div></div>
          </div>
          <br />

          {/* <div>
                <label className="pb-2 edit-lable">
                  Price (INR): {price}
                  .00{" "}
                </label>
                <br />
                <input
                  type="range"
                  id="price"
                  min="1"
                  max="1000"
                  step="1"
                  onChange={handlePriceChange}
                  style={{ width: "60%" }}
                  defaultValue={
                    productData.find(
                      (product) => product._id === selectedProduct
                    )?.productPrice || ""
                  }
                />
              </div> */}
          <br />
          <button className="save-prod-search-btn" onClick={updateService}>
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditServices;
{
  /* <input
              type="number"
              step=".01"
              min={0.5}
              max={9999999999999999999}
              defaultValue={3487.2}
            /> */
}
