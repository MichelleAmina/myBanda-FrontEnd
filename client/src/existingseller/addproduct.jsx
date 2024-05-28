import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addproduct.css";
import OldSidebar from './oldside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import storeIcon from '../assets/store-2.png';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState([""]); 
  const [image, setImage] = useState(undefined);
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    setImage(file);
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

  const addMoreImages = () => {
    if (imageUrls.length < 5) {
      setImageUrls([...imageUrls, ""]);
    }
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
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('imageUrls', image);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('sizes', sizes);

    fetch("https://mybanda-backend-88l2.onrender.com/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData
    })
    .then((r) => r.json())
    .then(data => {
      toast.success("Product has been successfully added!");
      setTimeout(() => {
        navigate("/producthome");
      }, 2000); // Adjust the delay as needed
    })
    .catch(error => {
      console.error(error);
      toast.error("Failed to add product. Please try again.");
    });
  };

  return (
    <div className="add-product-container">
      <OldSidebar />
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
              <label>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                maxLength="20"
              />
            </div>
            <div className="add-form-group">
              <label>Product Description</label>
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
            <h2>Upload Images</h2>
            <div className="image-upload-container">
              {imageUrls.map((url, index) => (
                <div key={index} className="image-preview">
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(index, e)}
                  />
                  {url && (
                    <div className="image-thumb">
                      <img src={url} alt={`Preview ${index}`} />
                    </div>
                  )}
                </div>
              ))}
              {imageUrls.length < 5 && (
                <button
                  type="button"
                  className="add-more-button"
                  onClick={addMoreImages}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add More
                </button>
              )}
            </div>
          </div>
          <div className="form-actions">
            <button className="add-new-product-button" onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
