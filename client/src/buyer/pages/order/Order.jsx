import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals } from "../../../redux/cartSlice";  
import './order.css';

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);  
    const shippingFee = 200;  

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const [checkoutData, setCheckoutData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        delivery_address: "",
        contact: "",
        country: "",
        city: "",
        deliveryPerson: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        e.persist();
        setCheckoutData({...checkoutData, [e.target.name]: e.target.value });
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        console.log('Placing order...');

        const data = {
            total_price: cart.cartTotalAmount + shippingFee,
            name: `${checkoutData.firstname} ${checkoutData.lastname}`,
            status: "pending",
            delivery_fee: shippingFee,
            delivery_address: checkoutData.delivery_address,
            contact: checkoutData.contact,
            country: checkoutData.country,
            city: checkoutData.city,
            delivery_persons: checkoutData.deliveryPerson,
        };

        const accessToken = localStorage.getItem('access_token');
        console.log('Access Token:', accessToken);

        if (!accessToken) {
            setError("User not logged in");
            return;
        }

        // Decoding the JWT token to get the payload
        const tokenParts = accessToken.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));

        // Extracting the user ID from the payload
        const userId = payload.sub;
        console.log('User ID:', userId);


        try {
            const response = await fetch('https://mybanda-backend-3.onrender.com/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-User-ID': userId, 
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccess("Order placed successfully!");
                setError(null);
                console.log('Success:', result);
            } else {
                const errorData = await response.json();
                setError("Error placing order: " + errorData.message);
                setSuccess(null);
                console.error('Error:', errorData);
            }
        } catch (error) {
            setError("Error placing order: " + error.message);
            setSuccess(null);
            console.error('Error:', error);
        }
    }

    return (
        <section className="checkoutSection mb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">
                                <h4>Delivery Information</h4>
                            </div>
                            <div className="card-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>First Name</label>
                                            <input 
                                                type="text" 
                                                name="firstname" 
                                                className="form-control" 
                                                onChange={handleChange}
                                                value={checkoutData.firstname} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input 
                                                type="text" 
                                                name="lastname" 
                                                className="form-control" 
                                                onChange={handleChange}
                                                value={checkoutData.lastname} 
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
                                                onChange={handleChange}
                                                value={checkoutData.email}  
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Contact</label>
                                            <input 
                                                type="text" 
                                                name="contact" 
                                                className="form-control"
                                                onChange={handleChange}
                                                value={checkoutData.contact}  
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <textarea rows="3" 
                                                name="delivery_address" 
                                                className="form-control"
                                                onChange={handleChange}
                                                value={checkoutData.delivery_address} 
                                            >    
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>City</label>
                                            <input 
                                                type="text" 
                                                name="city" 
                                                className="form-control"
                                                onChange={handleChange}
                                                value={checkoutData.city}  
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
                                                onChange={handleChange}
                                                value={checkoutData.country} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Select Delivery Driver</label>
                                            <select name="delivery_persons" className="form-select" onChange={handleChange} value={checkoutData.delivery_persons} >
                                                <option value="">Select...</option>
                                                <option value="DHL">DHL</option>
                                                <option value="Wells Fargo">Wells Fargo</option>
                                                <option value="Western Union">Western Union</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="order-checkout-button float-end" onClick={placeOrder}>Place Order</button>
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
                                    <span className="cart-product-price">Ksh. {cart.cartTotalAmount}</span>
                                </h3>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="cart-summary-title">Shipping</h5>
                                <h3 className="cart-summary-details">
                                    <span className="cart-product-shipping-price">Ksh. {shippingFee}</span>
                                </h3>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                                <h5 className="cart-summary-title">Total</h5>
                                <h3 className="cart-summary-details">
                                    <span className="cart-product-price">Ksh. {cart.cartTotalAmount + shippingFee}</span>
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
