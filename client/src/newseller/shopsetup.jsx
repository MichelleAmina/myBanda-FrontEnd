import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./shopsetup.css";
import BandaLogo from "../assets/banda.png";

const ShopSetup = () => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    setLogoUrl(e.target.value);
  };

  const handleBannerChange = (e) => {
    setBannerUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shopData = {
      name: shopName,
      description: description,
      logo_image_url: logoUrl,
      banner_image_url: bannerUrl,
      contact: contact,
      location: location,
      seller_id: 23, // Hardcoded seller_id
    };

    try {
      const response = await fetch("https://mybanda-backend-88l2.onrender.com/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      });

      if (response.ok) {
        console.log("Shop created successfully:", shopData);
        toast.success("Shop created successfully");
        navigate("/shop-dashboard");
      } else {
        const errorData = await response.json();
        console.error("Failed to create shop:", response.statusText, errorData);
        toast.error(`Failed to create shop: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error during shop creation:", error);
      toast.error("Failed to create shop");
    }
  };

  return (
    <div className="shop-setup-container">
      <div className="background-container"></div>
      <div className="bgcon">
        <div className="form-container">
          <form className="shop-setup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="logo-container">
                <img src={BandaLogo} alt="Banda Logo" className="banda-logo" />
                <h1 className="shop-name">MY BANDA</h1>
              </div>
              <div className="subheads">
                <h2>Tell us a little about your store.</h2>
                <h4>
                  This is initial information about your business. <br />
                  You can change it anytime.
                </h4>
              </div>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Enter shop name"
                required
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="custom-textarea"
              ></textarea>
            </div>

            <div className="form-group">
              <input
                type="text"
                value={logoUrl}
                onChange={handleLogoChange}
                placeholder="Enter logo URL"
                required
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                value={bannerUrl}
                onChange={handleBannerChange}
                placeholder="Enter banner URL"
                required
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter contact information"
                required
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
                className="custom-input"
              />
            </div>

            <button type="submit" className="setup-shop-button">
              Setup Shop
            </button>
          </form>
        </div>

        <div className="shop-setup-image"></div>
      </div>
    </div>
  );
};

export default ShopSetup;
