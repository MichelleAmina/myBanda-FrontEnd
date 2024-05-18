import React, { useState } from 'react';
import './order.css'

const CheckoutForm = () => {
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    const [error, setError] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCheckoutInput({ ...checkoutInput, [name]: value });
    };

    const placeOrder = () => {
        // Add order placement logic here
        console.log('Order placed:', checkoutInput);
    };

    return (
        <section className="checkoutSection mb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="checkout-card-header">
                                <h4>Delivery Infromation</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>First Name</label>
                                            <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                            <small className="text-danger">{error.lastname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone Number</label>
                                            <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Area</label>
                                            <input type="text" name="area" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Country</label>
                                            <input type="text" name="country" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                            <small className="text-danger">{error.state}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <label>Select Delivery Driver</label>
                                        <select name="deliveryDriver" onChange={handleInput} value={checkoutInput.deliveryDriver} className="form-select">
                                            <option value="">Select...</option>
                                            <option value="driver1">DHL</option>
                                            <option value="driver2">Wells Fargo</option>
                                            <option value="driver3">Western Union</option>
                                            
                                        </select>
                                        <small className="text-danger">{error.deliveryDriver}</small>
                                    </div>
                                </div>

                                    <div className="col-md-12">
                                        <button onClick={placeOrder} className="btn btn-primary float-end">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 cart-rightside">
                        <div className="card p-4">
                            <h3>Cart Summary</h3>
                            <hr />
                            <div className="cart-summary-container">
                                <h5 className="cart-summary-title">Subtotal</h5>
                                <h3 className="cart-summary-details">
                                    <span className="cart-product-price">Ksh 200</span>
                                </h3>
                            </div>
                            
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="cart-summary-title">Shipping</h5>
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
        </section>

        
    );
};

export default CheckoutForm;
