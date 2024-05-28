import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, clearCart } from '../../../redux/cartSlice';
import './finalcheckout.css';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ["places"];

const FinalCheckout = () => {

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBQxT3xBni2UvXtvfH4nhqKuUVrY5gte1s",
    libraries: libraries,
  })

  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);
  
  // Same as ndanu's checkoutData
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    region: '',
    country: '',
    deliveryDriver: '',
    mpesa_contact: '',
  });

  const cart = useSelector((state) => state.cart);  
  console.log("these are the items in the cart",cart)
  const shippingFee = 200;  

  useEffect(() => {
      dispatch(getTotals());
  }, [cart, dispatch]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGif, setShowGif] = useState(false); // State for GIF visibility

  const placeOrder = async () => {
    console.log("placing order ")
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const res = await fetch('https://mybanda-backend-88l2.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          total_price: cart.cartTotalAmount + shippingFee,
          name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
          status: "pending",
          delivery_fee: shippingFee,
          delivery_address: deliveryInfo.address,
          contact: deliveryInfo.phone,
          country: deliveryInfo.country,
          city: deliveryInfo.city,
          delivery_persons: deliveryInfo.deliveryDriver, 
          mpesa_contact: deliveryInfo.mpesa_contact,
          items: cart.cartItems.map((item => ({ id: item.id, quantity: item.cartQuantity })))
          
        }),
      
      })

      if (res.ok) {
        setSuccess(true);
        setShowGif(true);
        dispatch(clearCart()); // Clear the cart
        console.log("Success");
      } else {
        const errorData = await res.json();
        setError("Error placing order in else statement: " + errorData.message);
        setSuccess(null);
        console.error('Error placing order:', errorData);
      }
    } catch (error) {
      setError("Error placing order in catch error: " + error.message);
      setSuccess(null);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }

  }

  const [deliveryData, setDeliveryData] = useState([]);

  useEffect(() => {
    fetch("https://mybanda-backend-88l2.onrender.com/users")
        .then(resp => resp.json())
        .then((data) => {
            const filteredData = data.filter(user => user.role === 'delivery');
            setDeliveryData(filteredData);
        
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setError(error);
          
        });
  }, []);

  console.log("delivery data", deliveryData)



  // const placeOrder = async (e) => {
  //   e.preventDefault();
  //   console.log('Placing order...');

  //   const data = {
  //       total_price: cart.cartTotalAmount + shippingFee,
  //       name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
  //       status: "pending",
  //       delivery_fee: shippingFee,
  //       delivery_address: deliveryInfo.address,
  //       contact: deliveryInfo.phone,
  //       country: deliveryInfo.country,
  //       city: deliveryInfo.city,
  //       delivery_persons: deliveryInfo.deliveryDriver,
  //   };

  //   console.log("this is the data", data)

  //   const accessToken = localStorage.getItem('access_token');
  //   console.log('Access Token:', accessToken);

  //   if (!accessToken) {
  //       setError("This User is not logged in");
  //       return;
  //   }

  //   // Decoding the JWT token to get the payload
  //   const tokenParts = accessToken.split('.');
  //   const payload = JSON.parse(atob(tokenParts[1]));

  //   // Extracting the user ID from the payload
  //   const userId = payload.sub;
  //   console.log('User ID:', userId);


  //   try {
  //       const response = await fetch('https://mybanda-backend-88l2.onrender.com/order', {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': `Bearer ${accessToken}`,
  //               'X-User-ID': userId, 
  //           },
  //           body: JSON.stringify(data),
  //       });

  //       if (response.ok) {
  //           const result = await response.json();
  //           setSuccess("Order placed successfully!");
  //           setError(null);
  //           console.log('Success:', result);
  //       } else {
  //           const errorData = await response.json();
  //           setError("Error placing order: " + errorData.message);
  //           setSuccess(null);
  //           console.error('Error:', errorData);
  //       }
  //   } catch (error) {
  //       setError("Error placing order: " + error.message);
  //       setSuccess(null);
  //       console.error('Error:', error);
  //   }
  // }


  // KINSI CODE 
  const handleMethodClick = (method) => {
    setSelectedMethod(method);
    if (method === 'mpesa') {
      setShowPhoneNumberInput(true);
    } else {
      setShowPhoneNumberInput(false);
    }
  };

  const handleNextClick = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const addressRef = useRef();

  useEffect(() => {
    if (isLoaded && addressRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setDeliveryInfo(prevInfo => ({
            ...prevInfo,
            address: place.formatted_address,
          }));
        }
      });
    }
  }, [isLoaded]);

  return (
    <div className="finalcheckout-html">
      <div className="finalcheckout-body">
        <div className="cht-checkout-panel">
          <div className="cht-panel-body">
          <div className="cht-progress-bar">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`cht-step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            ></div>
          ))}
        </div>

            {currentStep === 1 && (
              <div>
                <h4>Delivery Information</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={deliveryInfo.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={deliveryInfo.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone Number</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        value={deliveryInfo.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={deliveryInfo.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                    <label>Full Address</label>
                      {isLoaded && (
                        <Autocomplete>
                          <textarea
                            rows="3"
                            name="address"
                            className="form-control"
                            ref={addressRef}
                            value={deliveryInfo.address}
                            onChange={handleChange}
                          ></textarea>
                        </Autocomplete>
                      )}
                      
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Region</label>
                      <input
                        type="text"
                        name="region"
                        className="form-control"
                        value={deliveryInfo.region}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={deliveryInfo.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Select Delivery Driver</label>
                      <select
                        name="deliveryDriver"
                        className="form-select"
                        value={deliveryInfo.deliveryDriver}
                        onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        {deliveryData.map((driver) => (
                          <option key={driver.id} value={driver.id}>{capitalizeFirstLetter(driver.username)} - {driver.location}</option>
                        ))}
                        
                        
                        
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="card p-4">
                      <h4>Confirmation</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card p-4">
                            <h5>Delivery Details</h5>
                            <hr />
                            <p><strong>Name:</strong> {deliveryInfo.firstName} {deliveryInfo.lastName}</p>
                            <p><strong>Phone Number:</strong> {deliveryInfo.phone}</p>
                            <p><strong>Email:</strong> {deliveryInfo.email}</p>
                            <p><strong>Address:</strong> {deliveryInfo.address}</p>
                            <p><strong>Region:</strong> {deliveryInfo.region}</p>
                            <p><strong>Country:</strong> {deliveryInfo.country}</p>
                            {/* Find a way to show the drivers name instead of their Id */}
                            <p><strong>Delivery Driver:</strong> {deliveryInfo.deliveryDriver}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card p-4">
                            <h5>Cart Summary</h5>
                            <hr />
                            <div className="cart-summary-container">
                              <h5 className="cart-summary-title">Subtotal:</h5>
                              <h3 className="cart-summary-details">
                                <span className="cart-product-price">Ksh {cart.cartTotalAmount}</span>
                              </h3>
                            </div>
                            <div className="cart-summary-container">
                              <h5 className="cart-summary-title">Shipping:</h5>
                              <h3 className="cart-summary-details">
                                <span className="cart-product-unit-price">Ksh {shippingFee}</span>
                              </h3>
                            </div>
                            <hr />
                            <div className="cart-summary-container">
                              <h5 className="cart-summary-title">Total:</h5>
                              <h3 className="cart-summary-details">
                                <span className="cart-product-price">Ksh {cart.cartTotalAmount + shippingFee}</span>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
            {currentStep === 3 && (
              <div>
                <h4>Payment</h4>
                <div className="cht-payment-method">
                  <label
                    htmlFor="card"
                    className={`cht-method card ${selectedMethod === 'card' ? 'cht-blue-border' : ''}`}
                    onClick={() => handleMethodClick('card')}
                  >
                    <div className="cht-card-logos">
                      <img src="https://www.careersinafrica.com/wp-content/uploads/2020/05/VISA-logo-square.png" alt="Visa Logo" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="MasterCard Logo" />
                    </div>
                    <div className="cht-radio-input">
                      <input id="card" type="radio" name="payment" className='me-2'/>
                       Pay Ksh.{cart.cartTotalAmount + shippingFee} with credit card
                    </div>
                  </label>

                  <label
                    htmlFor="mpesa"
                    className={`cht-method mpesa ${selectedMethod === 'mpesa' ? 'cht-blue-border' : ''}`}
                    onClick={() => handleMethodClick('mpesa')}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/2560px-M-PESA_LOGO-01.svg.png" alt="MPesa Logo" />
                    <div className="cht-radio-input">
                      <input id="mpesa" type="radio" name="payment" className='me-2'/>
                      Pay Ksh.{cart.cartTotalAmount + shippingFee} with MPesa
                    </div>
                  </label>
                </div>

                {showPhoneNumberInput && (
                  <div>
                    <p className="phone-info">* Kindly input your phone number and await a pop up to make your payment</p>
                    <div className="cht-input-fields">
                      <div className="cht-column-1">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                        type="text" 
                        name="mpesa_contact"
                        id="phone" 
                        value={deliveryInfo.mpesa_contact} 
                        onChange={handleChange}/>
                      </div>
                    </div>
                  </div>
                )}

                {!showPhoneNumberInput && (
                  <div className="cht-input-fields">
                    <div className="cht-column-1">
                      <label htmlFor="cardholder">Cardholder's Name</label>
                      <input type="text" id="cardholder" />

                      <div className="cht-small-inputs">
                        <div>
                          <label htmlFor="date">Valid through</label>
                          <input type="text" id="date" placeholder="MM / YY" />
                        </div>

                        <div>
                          <label htmlFor="verification">CVV / CVC *</label>
                          <input type="password" id="verification" />
                        </div>
                      </div>
                    </div>
                    <div className="cht-column-2">
                      <label htmlFor="cardnumber">Card Number</label>
                      <input type="password" id="cardnumber" />

                      <span className="cht-info">* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <br />
                {!loading && !success && (
                    <button className="order-checkout-button float-end" onClick={placeOrder}>
                      Place Order
                    </button>
                )}
                {loading && 
                  <div className='finalCheckout-2'>
                    <h4>Your order is being processed...</h4>
                    {/* <div className="finalCheckout-gif1">
                      <img src="https://i.pinimg.com/originals/93/e3/3d/93e33d89a8cbe54ec945235d25af5607.gif" alt="" />

                    </div> */}
                  </div> 
                }
                {error && <h4 className="error">Error placing order, please try again later....</h4>}
                {success && (
                  <div className='finalCheckout-2'>
                    <h4>Thank you for shopping with us!</h4>
                    {showGif && (
                      <div className="finalCheckout-gif2">
                        <img
                          src="https://i.pinimg.com/originals/c4/9a/20/c49a207e0f89c9290d98fd43a87a8cb0.gif"
                          alt="Loading..."
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="cht-panel-footer">
            {currentStep > 1 && (
              <button className="cht-btn cht-back-btn" onClick={handleBackClick}>Back</button>
            )}
            {currentStep < 4 && (
              <button className="cht-btn cht-next-btn" onClick={handleNextClick}>Next Step</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCheckout;
