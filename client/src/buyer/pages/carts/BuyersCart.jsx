import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './buyersCart.css';
import { Link, NavLink } from "react-router-dom";
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, setShippingFee } from "../../../redux/cartSlice";

const BuyersCart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const shippingFee = 200; 

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
        <section className="cartSection">
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
                <div className="cart-container">
                    <div className="cart-content">
                        <div className="cart-left">
                            <div className="cart-header">
                                <div className="cart-title-container">
                                    <h1 className="cart-title">Your Cart</h1>
                                    <p>There are <span className="cart-quantity">{cart.cartTotalQuantity}</span> products in your cart</p>
                                </div>
                                <span className="clear-cart" onClick={handleClearCart}><DeleteOutlinedIcon />Clear Cart</span>
                            </div>
                            <div className="cart-wrapper">
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
                                                    <div className="Product-Info">
                                                        <div className="product-img">
                                                            <img src={cartItem.images[0]?.image_url} alt={cartItem.name}/>
                                                        </div>
                                                        <div className="product-name">
                                                            <Link><h4>{cartItem.name}</h4></Link>
                                                            <span className="remove-product" onClick={() => handleRemoveItem(cartItem)}>Remove</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="product-unit-price">Ksh. {cartItem.price}</span>
                                                </td>
                                                <td>
                                                    <div className="product-quantity">
                                                        <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                                                        <div className="quantity-count">{cartItem.cartQuantity}</div>
                                                        <button onClick={() => handleAddToCart(cartItem)}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="product-price">Ksh. {cartItem.price * cartItem.cartQuantity}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="continue-shopping">
                                    <NavLink to="/my_banda/products">
                                        <button>Continue Shopping</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className=" cart-right">
                            <div className="summary-card">
                                <div className="summary-item">
                                    <h5 className="summary-title">Subtotal</h5>
                                    <h3 className="summary-value">Ksh. {cart.cartTotalAmount}</h3>
                                </div>
                                <div className="summary-item">
                                    <h5 className="summary-title">Shipping</h5>
                                    <h3 className="summary-value">Ksh. {shippingFee}</h3>
                                </div>
                                <div className="summary-item">
                                    <h5 className="summary-title">Total</h5>
                                    <h3 className="summary-value">Ksh. {cart.cartTotalAmount + shippingFee}</h3>
                                </div>
                                <NavLink to="/my_banda/finalcheckout">
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
