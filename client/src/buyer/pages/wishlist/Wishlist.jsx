import './wishlist.css'
import React, { useState, useEffect } from 'react';
// import HomeProduct from '../../components/product/HomeProduct';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";


function Wishlist(){
    // store product data
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item)); 
    };

    function handleDeleteFromWishlist(id) {
        fetch("https://mybanda-backend-88l2.onrender.com/like", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        }),
        })
        .then(setDeleted(!deleted))
    }
    

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/like")
            .then(resp => resp.json())
            .then((data) => {
                setProductData(data)
                setLoading(false)
                //console.log('Fetched wishlist:',data);
                // console.log("wishlist data",data);

            })
            .catch(error => {
                console.error('Error fetching liked products:', error);
                setError(error)
                setLoading(falase)
            });
    }, [deleted]);

    

    // Render loading GIF if loading
    if (loading) {
        return (
            <div className="loader">
                <img src="https://i.pinimg.com/originals/c1/bc/d8/c1bcd8a8c945b53da6b29f10a2a553c0.gif" alt="Loading..." />
            </div>
        );
    }

    if (error){
        return <div>Error loading likes</div>
    }

    if (productData.length == 0 && loading == false){
        return <div>No Likes So Far</div>
    }

    return(
        <div className="wishlistWrapper">
            <div className="container-fluid">
                <div className="wishlist">
                    <div className="wishlistTitle">
                        <h1>You have {productData.length} item/s in your Wishlist</h1>
                    </div>

                    <div className="wishlistProducts ps-4">
                        {/* {productData.length !== 0 &
                            // <h2>{productData[0].product.name}</h2>
                            productData.map((item, index) => (
                                <div className="item" key={index}>
                                    {console.log("Item passed down to home product:",item.product)}
                                    <HomeProduct item={item.product}/>
                                </div>
                            ))
                        }            */}
                        <div className="wishlist-container">
                            <ul className="wishlist-items">
                                {
                                productData.length !== 0 &&
                                productData.map((item, index) => (
                                    <li key={item.id} className="wishlist-item">
                                        <img src={item.product.images[0].image_url} alt={item.name} className="wishlist-item-image" />
                                        <div className="wishlist-item-details">
                                            <NavLink to={`/my_banda/products/${item.product.id}`} style={{textDecoration:"none", color:"#000"}}><h2>{item.product.name}</h2></NavLink>
                                            <h4>{item.product.description}</h4>
                                            <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly/>
                                            <div className="wishlist-item-price">
                                                <span>$ {item.product.price}</span>
                                            </div>
                                            <div className='wishlist-item-description'>

                                            </div>
                                        </div>
                                        <div className='wishlist-clicks'>
                                            <button onClick={() => handleDeleteFromWishlist(item.id)} className='delete-button'><DeleteIcon/></button>
                                            <button className="wishlist-item-button" onClick={()=> handleAddToCart(item.product)}><ShoppingCartOutlinedIcon />Add To Cart</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
                            
            </div>
        </div>
    )
}


export default Wishlist 