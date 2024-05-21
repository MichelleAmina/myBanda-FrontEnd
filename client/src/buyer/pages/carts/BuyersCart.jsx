import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './buyersCart.css';
import { Link, NavLink } from "react-router-dom";
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, setShippingFee } from "../../../redux/cartSlice";

const BuyersCart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const shippingFee = 50; 

    useEffect(() => {
        dispatch(setShippingFee(shippingFee)); 
        dispatch(getTotals());
    }, [cart, dispatch, shippingFee]);

    const handleRemoveItem = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    };

    const handleAddToCart = (cartItem) => {
        dispatch(addToCart(cartItem));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <section className="cartSection mb-5">
            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <img src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/media/99db7af8c3d839dd65017f76ae434785.gif" alt="EMPTY" />
                    <div className="start-shopping">
                    <NavLink to="/my_banda/products">
                        <button>Start Shopping</button>
                    </NavLink>
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="d-flex align-items-center w-100">
                                <div className="left">
                                    <h1 className="hd mb-0">Your Cart</h1>
                                    <p>There is <span className="cart-quantity">{cart.cartTotalQuantity}</span> products in your cart</p>
                                </div>
                                <span className="clear-cart" onClick={handleClearCart}><DeleteOutlinedIcon />Clear Cart</span>
                            </div>
                            <div className="cartWrapper mt-4">
                                <div className="table-responsive">
                                    <table className="cart-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.cartItems.map((cartItem) => (
                                                <tr key={cartItem.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="img">
                                                                <img src={cartItem.images[0]?.image_url} alt={cartItem.name} className="w-100"/>
                                                            </div>
                                                            <div className="product-name">
                                                                <Link><h4>{cartItem.name}</h4></Link>
                                                                <span className="cursor" onClick={() => handleRemoveItem(cartItem)}>Remove</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="cart-product-unit-price">Ksh. {cartItem.price}</span>
                                                    </td>
                                                    <td>
                                                        <div className="cart-product-quantity">
                                                            <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                                                            <div className="count">{cartItem.cartQuantity}</div>
                                                            <button onClick={() => handleAddToCart(cartItem)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="cart-product-price">Ksh. {cartItem.price * cartItem.cartQuantity}</span>
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="continue-shopping">
                                    <NavLink to="/my_banda/products">
                                        <button>Continue Shopping</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 cart-rightside">
                            <div className="card p-4">
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
                                <div className="d-flex align-items-center mb-4">
                                    <h5 className="cart-summary-title">Total</h5>
                                    <h3 className="cart-summary-details">
                                        <span className="cart-product-price">Ksh. {cart.cartTotalAmount + shippingFee}</span>
                                    </h3>
                                </div>
                                <br />
                                <NavLink to="/my_banda/checkout">
                                    <button className="checkout-button">Proceed to Checkout</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default BuyersCart;
