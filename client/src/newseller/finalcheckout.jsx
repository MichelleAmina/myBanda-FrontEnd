import React, { useState } from 'react';
import './finalcheckout.css';

const FinalCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    region: '',
    country: '',
    deliveryDriver: '',
  });

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
                      <textarea
                        rows="3"
                        name="address"
                        className="form-control"
                        value={deliveryInfo.address}
                        onChange={handleChange}
                      ></textarea>
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
                        <option value="DHL">DHL</option>
                        <option value="Wells Fargo">Wells Fargo</option>
                        <option value="Western Union">Western Union</option>
                        
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
                            <p><strong>Delivery Driver:</strong> {deliveryInfo.deliveryDriver}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card p-4">
                            <h3>Cart Summary</h3>
                            <hr />
                            <div className="cart-summary-container">
                              <h5 className="cart-summary-title">Subtotal:</h5>
                              <h3 className="cart-summary-details">
                                <span className="cart-product-price">Ksh 200</span>
                              </h3>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                              <h5 className="cart-summary-title">Shipping:</h5>
                              <h3 className="cart-summary-details">
                                <span className="cart-product-unit-price">Free</span>
                              </h3>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                              <h5 className="cart-summary-title">Total</h5>
                              <h3 className="cart-summary-details">
                                <span className="cart-product-price">Ksh 200</span>
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
                      <input id="card" type="radio" name="payment" />
                      Pay £340.00 with credit card
                    </div>
                  </label>

                  <label
                    htmlFor="mpesa"
                    className={`cht-method mpesa ${selectedMethod === 'mpesa' ? 'cht-blue-border' : ''}`}
                    onClick={() => handleMethodClick('mpesa')}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/2560px-M-PESA_LOGO-01.svg.png" alt="MPesa Logo" />
                    <div className="cht-radio-input">
                      <input id="mpesa" type="radio" name="payment" />
                      Pay £340.00 with MPesa
                    </div>
                  </label>
                </div>

                {showPhoneNumberInput && (
                  <div>
                    <p className="phone-info">* Kindly input your phone number and await a pop up to make your payment</p>
                    <div className="cht-input-fields">
                      <div className="cht-column-1">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" id="phone" />
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
                          <label htmlFor="date">Valid thru</label>
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
                <h4>Finish</h4>
                <p>Thank you for your order!</p>
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
