import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Tooltip from '@mui/material/Tooltip';

import './homeProduct.css';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';

function HomeProduct({ item }) {
    //console.log("homeProduct", item)
    const [products, setProducts] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setProducts(item);
    }, [item]);
    //console.log("homeProducts products", products.reviews)
    
    // Shortened length of product description
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    const imageUrl = item.images[0]?.image_url;

    // const reviews = products.reviews
    // console.log("reviews", reviews)

    // const calculateAverageRating = () => {
    //     if (reviews.length === 0) {
    //         return 0
    //     }

    //     const totalStars = reviews.reduce((acc, review) => acc + review.rating, 0)
    //     return totalStars / reviews.length; 
    // }

    // const averageRating = calculateAverageRating()
    // console.log("average rating",averageRating)
    

    const handleAddToCart = (item) => {
        dispatch(addToCart(item)); 
    };

    const handleAddToWishlist = (id) => {
        fetch("https://mybanda-backend-88l2.onrender.com/like", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: id
        }),
        })
        .then((r) => console.log(r))
        // .then(setDeleted(updateDelete))
    }

    return (
        <div className='productContainer'>
            <div className="productThumb">
                {
                    products !== undefined &&
                    <>
                  
                        <NavLink to={`/my_banda/products/${item.id}`} state={{ product: item }}>
                            <div className="imgWrapper">
                                <img src={imageUrl} alt="" className='w-100' />
                                <div className="overlay transition">
                                    <ul className='list list-inline mb-0'>
                                        <li className='list-inline-item'>
                                            <NavLink className='cursor' tooltip="Add to Wishlist!" onClick={()=> handleAddToWishlist(item.id)}><FavoriteBorderOutlinedIcon /></NavLink>
                                        </li>
                                        <li className='list-inline-item'>
                                            <NavLink className='cursor' tooltip="Compare"><CompareArrowsOutlinedIcon /></NavLink>
                                        </li>
                                        <li className='list-inline-item'>
                                            <NavLink to={`/my_banda/products/${item.id}`} className='cursor' tooltip="Quick View"><RemoveRedEyeOutlinedIcon /></NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </NavLink>
                        
                        <div className="info">
                            <span className='d-block catName'>{item.category}</span>
                            <h4 className='title'>{truncateText(item.name, 40)}</h4>
                            <Rating name="half-rating-read" value={3.5} precision={0.5} readOnly />
                            {/* <Rating name="half-rating-read" defaultValue={averageRating} precision={0.5} readOnly /> */}
                            <span className='d-block brand'>By <NavLink href="">{item.shop.name}</NavLink></span>
                            <div className="d-flex align-items-center mt-2">
                                <div className="d-flex align-items-center">
                                    <span className='price'>${item.price}</span>
                                </div>
                                <Button className='ms-auto transition' onClick={()=> handleAddToCart(item)}>
                                    <ShoppingCartOutlinedIcon />Add</Button>
                            </div>
                        </div>
                
                    </>
                }
            </div>
        </div>
    );
}

export default HomeProduct;
