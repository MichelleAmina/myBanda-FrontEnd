import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./shopsetup.css";
import BandaLogo from "../assets/banda.png";
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ["places"];

const ShopSetup = () => {

  const autocompleteRef = useRef(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBQxT3xBni2UvXtvfH4nhqKuUVrY5gte1s",
    libraries: libraries,
  });

  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token');
  const tokenParts = accessToken.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const userId = payload.sub;
  console.log('User ID:', userId);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', shopName)
    formData.append('description', description)
    formData.append('logo_image', logo)
    formData.append('banner_image', banner)
    formData.append('contact', contact)
    formData.append('location', location)
    formData.append('seller_id', userId)

    try {
      const response = await fetch(
        "https://mybanda-backend-88l2.onrender.com/shop",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: formData
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Shop created successfully:", data);
        navigate("/oldsellerdash");
      } else {
        console.error("Failed to create shop:", response.statusText);
      }
    } catch (error) {
      console.error("Error during shop creation:", error);
    }
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
      }
    }
  };

  // Fetch data from backend and log it
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mybanda-backend-88l2.onrender.com/shop");
        if (response.ok) {
          const data = await response.json();
          console.log("Data from backend:", data);
        } else {
          console.error("Failed to fetch data from backend:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="sets-shop-setup-container">
      <div className="sets-background-container"></div>
      <div className="sets-bgcon">
        <div className="sets-form-container">
          <form className="sets-shop-setup-form" onSubmit={handleSubmit}>
            <div className="sets-form-group">
              <div className="sets-logo-container">
                <img src={BandaLogo} alt="Banda Logo" className="sets-banda-logo" />
                <h1 className="sets-shop-name">MY BANDA</h1>
              </div>
              <div className="sets-subheads">
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
                className="sets-custom-input"
              />
            </div>

            <div className="sets-form-group">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="sets-custom-textarea"
              ></textarea>
            </div>

            <div className="sets-form-group">
              <label htmlFor="logo">Upload Logo:</label>
              <input
                type="file"
                id="logoUrl"
                onChange={(e) => setLogo(e.target.files[0])}
                className="sets-custom-input"
              />
            </div>

            {/* Banner */}
            <div className="sets-form-group">
              <label htmlFor="banner">Upload Banner:</label>
              <input
                type="file"
                id="banner"
                onChange={(e) => setBanner(e.target.files[0])}
                className="sets-custom-input"
              />
            </div>

            <div className="sets-form-group">
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter contact information"
                required
                className="sets-custom-input"
              />
            </div>

            <div className="sets-form-group">
              {isLoaded && (
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                  }}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    required
                    className="sets-custom-input"
                  />
                </Autocomplete>
              )}
            </div>

            <button type="submit" className="sets-setup-shop-button">
              Setup Shop
            </button>
          </form>
        </div>

        <div className="sets-shop-setup-image">
          <img src="src/assets/top.jpg" alt="Placeholder" />
        </div>
      </div>
    </div>
  );
};

export default ShopSetup;
