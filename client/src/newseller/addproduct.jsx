import React, { useState } from "react";
import "./addproduct.css";
import NewSellerSidebar from "./sellersidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import storeIcon from '../assets/store-2.png';
import {
  faPlus,
  faFileImport,
  faSearch,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", "", ""]); // Initialize with 5 empty strings
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = e.target.result;
        setImageUrls(newImageUrls);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSwap = (index) => {
    const newImageUrls = [...imageUrls];
    [newImageUrls[0], newImageUrls[index]] = [newImageUrls[index], newImageUrls[0]];
    setImageUrls(newImageUrls);
  };

  const getSizesForCategory = (category) => {
    switch (category) {
      case "Shoes":
        return ["EU-44", "EU-38.5", "EU-40", "EU-41.5", "EU-42", "EU-43"];
      case "Clothing":
        return ["XS", "S", "M", "L", "XL", "XXL"];
      default:
        return [];
    }
  };

  const handleSizeClick = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleSubmit = () => {
    // Handle the product submission
    console.log("Product submitted", {
      productName,
      description,
      price,
      imageUrls,
      quantity,
      category,
      sizes,
    });
  };

  return (
    <div className="add-product-container">
      <div className="prodheader">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={storeIcon} alt="Store Icon" style={{ width: '20px', height: 'auto' }} />
          <h1 style={{ fontSize: '24px', marginLeft: '10px', verticalAlign: 'middle' }}>Add a New Product</h1>
        </div>
      </div>

      <div className="form-sections-container">
        <div className="left-column">
          <div className="header-icons">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
          <div className="form-section gray-container">
            <h2>General Information</h2>
            <div className="add-form-group">
              <label> Product Name </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                maxLength="20"
              />
            </div>

            <div className="add-form-group">
              <label>Product Description </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="100"
              />
            </div>
          </div>
          <div className="form-section gray-container">
            <h2>Pricing and Stock</h2>
            <div className="add-form-group">
              <label>Base Pricing</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="add-form-group">
              <label>Stock</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="add-form-group">
              <label>Category</label>
              <p>Select a category</p>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Home Decor">Home Decor</option>
                <option value="Appliances">Appliances</option>
                <option value="Tools & Hardware">Tools & Hardware</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Beauty & Skincare">Beauty & Skincare</option>
              </select>
            </div>
            {["Clothing", "Shoes"].includes(category) && (
              <div className="add-form-group">
                <label>Sizes</label>
                <p>Pick available sizes</p>
                <div className="sizes-container">
                  {getSizesForCategory(category).map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`size-button ${
                        sizes.includes(size) ? "selected" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right-column">
          <div className="form-section gray-container">
            <h2>Upload Image</h2>
            <div className="image-upload-container">
              <div className="image-preview centered">
                {imageUrls[0] && <img src={imageUrls[0]} alt={`Preview 0`} />}
              </div>
              <div className="carousel">
                {imageUrls.slice(1).map((url, index) => (
                  url && (
                    <div key={index + 1} className="small-image-preview">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        onClick={() => handleImageSwap(index + 1)}
                      />
                    </div>
                  )
                ))}
                {imageUrls.length < 5 && (
                  <div className="small-image-preview plus-icon" onClick={() => setImageUrls([...imageUrls, ""])}>
                    +
                  </div>
                )}
              </div>

              {/* Input fields for all the images */}
              {imageUrls.map((url, index) => (
                <div key={index} className="image-preview">
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(index, e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button className="add-new-product-button" onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </div>
      <NewSellerSidebar />
    </div>
  );
};

export default AddProduct;
