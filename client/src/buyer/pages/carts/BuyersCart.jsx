import React, {useState, useContext} from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Rating from '@mui/material/Rating';
import './buyersCart.css'
import { Link, NavLink } from "react-router-dom";
import QuatityBox from "../../components/quantity/QuantityBox";


const BuyersCart = () => {

      
    return ( 

        <section className="cartSection mb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                        <div className="d-flex align-items-center w-100">
                            <div className="left">
                                <h1 className="hd mb-0">Your Cart</h1>
                                <p>There is <span className="cart-quantity">3</span> products in your cart</p>
                            </div>

                            <span className="clear-cart"><DeleteOutlinedIcon />Clear Cart</span>
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
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="img">
                                                        <img src="https://i.pinimg.com/564x/1d/86/2e/1d862e6b44e3f157f9f3b5f9a439c3b4.jpg" alt="a bottle" className="w-100"/>
                                                    </div>
                                                    <div className="product-name">
                                                        <Link><h4>Thermal Water bottle</h4></Link>
                                                        <Rating name="half-rating-read"
                                                            value={4.5} precision={0.5} readOnly/>
                                                            <span className="rating-text">(4.5)</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="cart-product-unit-price">Ksh. 200</span>
                                            </td>
                                            
                                            <td>
                                                <QuatityBox />
                                            </td>
                                            <td>
                                                <span className="cart-product-price">Ksh. 200</span>
                                            </td>
                                            <td>
                                                <span className="cursor"><DeleteOutlinedIcon /></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="img">
                                                        <img src="https://i.pinimg.com/564x/1d/86/2e/1d862e6b44e3f157f9f3b5f9a439c3b4.jpg" alt="a bottle" className="w-100"/>
                                                    </div>
                                                    <div className="product-name">
                                                        <Link><h4>Thermal Water bottle</h4></Link>
                                                        <Rating name="half-rating-read"
                                                            value={4.5} precision={0.5} readOnly/>
                                                            <span className="rating-text">(4.5)</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="cart-product-unit-price">Ksh. 200</span>
                                            </td>
                                            <td>
                                                <QuatityBox />
                                            </td>

                                            <td>
                                                <span className="cart-product-price">Ksh. 200</span>
                                            </td>
                                            <td>
                                                <span className="cursor"><DeleteOutlinedIcon /></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="img">
                                                        <img src="https://i.pinimg.com/564x/1d/86/2e/1d862e6b44e3f157f9f3b5f9a439c3b4.jpg" alt="a bottle" className="w-100"/>
                                                    </div>
                                                    <div className="product-name">
                                                        <Link><h4>Thermal Water bottle</h4></Link>
                                                        <Rating name="half-rating-read"
                                                            value={4.5} precision={0.5} readOnly/>
                                                            <span className="rating-text">(4.5)</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="cart-product-unit-price">Ksh. 200</span>
                                            </td>
                                            <td>
                                                <QuatityBox />
                                            </td>

                                            <td>
                                                <span className="cart-product-price">Ksh. 200</span>
                                            </td>
                                            <td>
                                                <span className="cursor"><DeleteOutlinedIcon /></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 cart-rightside">
                        <div className="card p-4">
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
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="cart-summary-title">Total</h5>
                                <h3 className="cart-summary-details">
                                    <span className="cart-product-price">Ksh 200</span>
                                </h3>
                            </div>
                            <br />

                            <NavLink to="/checkout"><button className="checkout-button">Proceed to Checkout</button></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default BuyersCart;