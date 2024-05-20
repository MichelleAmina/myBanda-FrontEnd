import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./shopsetup.css";
import BandaLogo from "../assets/banda.png";

const ShopSetup = () => {
  // State variables to store form input values
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [banner, setBanner] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  // Function to get the current user's ID (this depends on how you manage authentication in your app)
  const getCurrentUserId = () => {
    // Logic to retrieve the current user's ID
    // For example, if you're using context or Redux for authentication, you would get the user ID from there
    // For demonstration purposes, let's assume you have a function called getCurrentUser() that returns the user object
    const currentUser = getCurrentUser();
    return currentUser ? currentUser.id : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shopData = {
      name: shopName,
      description: description,
      logo_image_url: logoUrl,
      banner_image_url: banner,
      contact: contact,
      location: location,
      seller_id: getCurrentUserId(), // Dynamically get the current user's ID
    };

    try {
      const response = await fetch(
        "https://mybanda-backend-88l2.onrender.com/shop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shopData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Shop created successfully:", data);
        // Navigate to themes
        navigate("/shop-dashboard");
      } else {
        console.error("Failed to create shop:", response.statusText);
      }
    } catch (error) {
      console.error("Error during shop creation:", error);
    }
  };

  return (
    <div className="shop-setup-container">
      <div className="background-container"></div>
      <div className="bgcon">
        <div className="form-container">
          <form className="shop-setup-form" onSubmit={handleSubmit}>
            {/* Shop Name */}
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
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Enter shop name"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            {/* Logo URL */}
            <div className="form-group">
              <input
                type="text"
                id="logoUrl"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Enter logo URL"
                required
              />
            </div>

            {/* Banner */}
            <div className="form-group">
              <input
                type="text"
                id="banner"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                placeholder="Enter banner URL"
                required
              />
            </div>

            {/* Contact */}
            <div className="form-group">
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter contact information"
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="setup-shop-button">
              Setup Shop
            </button>
          </form>
        </div>

        {/* Placeholder image */}
        <div className="shop-setup-image">

          <img src="src/assets/top.jpg" alt="Placeholder" />
        </div>
      </div>
    </div>
  );
};

export default ShopSetup;
