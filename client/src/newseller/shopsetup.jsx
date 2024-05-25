import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./shopsetup.css";
import BandaLogo from "../assets/banda.png";

const ShopSetup = () => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setBannerFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload logo image to Cloudinary
    const logoFormData = new FormData();
    logoFormData.append("file", logoFile);
    logoFormData.append("upload_preset", "e1gpxxqh"); // Your Cloudinary upload preset name

    try {
      const logoResponse = await fetch(
        "https://api.cloudinary.com/v1_1/mybanda/image/upload",
        {
          method: "POST",
          body: logoFormData,
        }
      );

      if (!logoResponse.ok) {
        console.error("Failed to upload logo:", logoResponse.statusText);
        return;
      }

      const logoData = await logoResponse.json();
      const logoUrl = logoData.secure_url;

      // Upload banner image to Cloudinary
      const bannerFormData = new FormData();
      bannerFormData.append("file", bannerFile);
      bannerFormData.append("upload_preset", "e1gpxxqh"); // Your Cloudinary upload preset name

      const bannerResponse = await fetch(
        "https://api.cloudinary.com/v1_1/mybanda/image/upload",
        {
          method: "POST",
          body: bannerFormData,
        }
      );

      if (!bannerResponse.ok) {
        console.error("Failed to upload banner:", bannerResponse.statusText);
        return;
      }

      const bannerData = await bannerResponse.json();
      const bannerUrl = bannerData.secure_url;

      // Save shop details including image URLs to the database
      const shopData = {
        name: shopName,
        description: description,
        logo_image_url: logoUrl,
        banner_image_url: bannerUrl,
        contact: contact,
        location: location,
      };

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
        console.log("Shop created successfully:", shopData);
        toast.success("Shop created successfully");
        navigate("/shop-dashboard");
      } else {
        console.error("Failed to create shop:", response.statusText);
        toast.error("Failed to create shop");
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
                <img
                  src={BandaLogo}
                  alt="Banda Logo"
                  className="banda-logo"
                />
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
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                required
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

        <div className="shop-setup-image">
        </div>
      </div>
    </div>
  );
};

export default ShopSetup;
