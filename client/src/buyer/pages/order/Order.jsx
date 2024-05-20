import React, { useState } from 'react';
import './order.css'

const CheckoutForm = () => {

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
                                            <input type="text" name="firstname" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input type="text" name="lastname" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone Number</label>
                                            <input type="number" name="phone" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" name="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <textarea rows="3" name="address" className="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Area</label>
                                            <input type="text" name="area" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Country</label>
                                            <input type="text" name="country" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <label>Select Delivery Driver</label>
                                        <select name="deliveryDriver" className="form-select">
                                            <option value="">Select...</option>
                                            <option value="driver1">DHL</option>
                                            <option value="driver2">Wells Fargo</option>
                                            <option value="driver3">Western Union</option>
                                            
                                        </select>
                                    </div>
                                </div>

                                    <div className="col-md-12">
                                        <button className="btn btn-primary float-end">Place Order</button>
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
