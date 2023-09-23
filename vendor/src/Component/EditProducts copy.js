import React, { useEffect, useState } from "react";
import axios from "axios";

function EditProducts() {
  const [catagorydata, setCatagorydata] = useState([]);
  const [selectedCatagoryId, setSelectedCatagoryId] = useState(null);
  const [subcatagorydata, setSubCatagorydata] = useState([]);
  //   const [SelectedSubCatagoryId, setSelectedSubCatagoryId] = useState(null);
  const [productData, setproductData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState(50); // Initial price value

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const getAllCatagory = async () => {
    try {
      const res = await axios.get(
        "http://api.infinitimart.in/api/vendor/product/catagory/getcatagory"
      );
      if (res.status === 200) {
        console.log("catagory===", res);
        setCatagorydata(res.data?.catagory);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCatagory();
  }, []);

  const getAllProduct = async () => {
    let res = await axios.get(
      "http://api.infinitimart.in/api/product/getproduct"
    );
    if (res.status === 200) {
      console.log("productList===", res);
      setproductData(res.data?.productData);
    }
  };

  const getAllSubCatagory = async (categoryId) => {
    try {
      let res = await axios.get(
        `http://api.infinitimart.in/api/vendor/product/subcatagory/getSubcategoriesByCategory/${categoryId}`
      );
      if (res.status === 200) {
        console.log("subcatagory===", res);
        setSubCatagorydata(res.data?.subcategories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelection = (e) => {
    const catagoryId = e.target.value;
    console.log("Selected Catagory Option===>", catagoryId);
    setSelectedCatagoryId(catagoryId);
    getAllSubCatagory(catagoryId);
  };

  const handleSubCategorySelection = (e) => {
    const subcategoryId = e.target.value;
    console.log("Selected Subcategory Option===>", subcategoryId);
  };

  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value);
    setPrice(newPrice);
  };

  return (
    <div>
      <div>
        <a href="/contentmanagement">
          <i class="fa-solid fa-angles-left"></i> Go Back
        </a>
      </div>
      <br />
      <div>
        <h3>Edit Products</h3>
      </div>
      <div className="d-flex" style={{ justifyContent: "space-around" }}>
        <div>
          <label>Choose Catagory:</label>{" "}
          <select
            className="edit-pro-select"
            onChange={handleCategorySelection}
            value={selectedCatagoryId}
          >
            <option value="">Select</option>
            {catagorydata?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.catagoryName}{" "}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Choose SubCatagory:</label>{" "}
          <select
            className="edit-pro-select"
            onChange={handleSubCategorySelection}
          >
            <option value="">Select</option>
            {subcatagorydata?.map((subcatagory) => (
              <option key={subcatagory.id} value={subcatagory.id}>
                {subcatagory.SubcatagoryName}{" "}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Product:</label>{" "}
          <select className="edit-pro-select">
            <option>Select</option>
          </select>
        </div>
        <div>
          <button className="edit-prod-search-btn">Search</button>
        </div>
      </div>
      <br />
      {/* <div>
        <button>Enable to edit</button>
      </div>{" "} */}
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div>
            <label className="pb-2 edit-lable">Product Name</label>
            <br />
            <input className="edit-input" placeholder="Enter Product" />
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Brand</label>
            <br />
            <input className="edit-input" placeholder="Enter Brand" />
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Description</label>
            <br />
            <textarea
              className="edit-textarea"
              placeholder="Enter Description"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex" style={{ justifyContent: "space-around" }}>
            <div>
              <label className="pb-2 edit-lable">Product Image</label>
              <br />
              {selectedImage && (
                <img
                  className="edit-product-image"
                  src={selectedImage}
                  alt="Uploaded"
                />
              )}
              {!selectedImage && (
                <img
                  src="images/infrinitymart.jpg"
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
            <div>
              <label className="pb-2 edit-lable">Quantity Available</label>
              <br />
              <input className="edit-input" type="number" min="1" />
            </div>
            <div>
              <label className="pb-2 edit-lable">Size</label>
              <br />
              <input className="edit-input" />
            </div>
          </div>
          <br />
          <div>
            <label className="pb-2 edit-lable">Price (INR): {price}.00 </label>
            <br />
            <input
              type="range"
              id="price"
              min="1"
              max="1000"
              step="1"
              value={price}
              onChange={handlePriceChange}
              style={{ width: "60%" }}
            />
          </div>
          <button className="save-prod-search-btn">UPDATE</button>
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
