import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import InputRange from "react-input-range";

function EditProducts(props) {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const productObj = props.productData;
  console.log("productData", productObj);
  const [category, setcategory] = useState("");
  const [subcatagory, setSubcatagory] = useState("");
  const [subcatagorydata, setSubCatagorydata] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [changeProductName, setChangeProductName] = useState("");
  const [changeProductBrand, setChangeProductBrand] = useState("");
  const [changeProductImage, setChangeProductImage] = useState("");
  const [changeProductPrice, setChangeProductPrice] = useState("");
  const [changeProductDescription, setChangeProductDescription] = useState("");
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100000);

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [category]);
  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        `http://api.infinitimart.in/api/vendor/product/subcatagory/postsubcatagory/`,
        {
          catagoryName: category,
        }
      );
      if (res.status === 200) {
        // console.log("subcatagory", res);
        setSubCatagorydata(res.data?.success);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setChangeProductImage(file);
  };

  const updateProduct = async (e) => {
    const productId = productObj._id;
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("catagoryName", user.category);
    formdata.append("SubcatagoryName", subcatagory);
    formdata.append("productName", changeProductName);
    formdata.append("productPrice", changeProductPrice);
    formdata.append("productBrand", changeProductBrand);
    formdata.append("productImage", changeProductImage);
    formdata.append("productDescription", changeProductDescription);
    formdata.append("productRange", minValue && minValue);
    try {
      const config = {
        url: `/product/updateproduct/${productId}`,
        method: "post",
        baseURL: "http://api.infinitimart.in/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Product Updated");
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

  return (
    <div>
      <div>
        <a href="/Products">
          <i class="fa-solid fa-angles-left"></i> Go Back
        </a>
      </div>
      <br />
      <div>
        <h3>Edit Product</h3>
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
          <br />
          <div>
            <label className="pb-2 edit-lable">Product Name</label>
            <br />
            <input
              className="edit-input"
              defaultValue={
                productObj.productName
                  ? productObj?.productName
                  : "Enter Product Name"
              }
              onChange={(e) => setChangeProductName(e.target.value)}
            />
          </div>
          <br />{" "}
          <div>
            <label className="pb-2 edit-lable">Product Price</label>
            <br />
            <input
              className="edit-input"
              defaultValue={
                productObj.productPrice ? productObj.productPrice : ""
              }
              onChange={(e) => setChangeProductPrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Brand</label>
            <br />
            <input
              className="edit-input"
              defaultValue={
                productObj.productBrand
                  ? productObj.productBrand
                  : "Enter Brand Name"
              }
              onChange={(e) => setChangeProductBrand(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Description</label>
            <br />
            <textarea
              className="edit-textarea"
              defaultValue={
                productObj.productDescription
                  ? productObj.productDescription
                  : "Enter Descriptions"
              }
              onChange={(e) => setChangeProductDescription(e.target.value)}
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
                  onChange={(e) => setChangeProductImage(e.target.files[0])}
                />
              )}
              {!selectedImage && (
                <img
                  src={`http://api.infinitimart.in/productlist/${
                    productObj.productImage ? productObj.productImage : ""
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
          <button className="save-prod-search-btn" onClick={updateProduct}>
            UPDATE
          </button>
          <br /> <br />
        </div>
      </div>
    </div>
  );
}

export default EditProducts;
{
  /* <input
              type="number"
              step=".01"
              min={0.5}
              max={9999999999999999999}
              defaultValue={3487.2}
            /> */
}
