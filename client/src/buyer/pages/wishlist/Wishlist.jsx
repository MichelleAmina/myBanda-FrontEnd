import './wishlist.css'
import React, { useState, useEffect } from 'react';
import HomeProduct from '../../components/product/HomeProduct';

function Wishlist(){
    // store product data
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/like")
            .then(resp => resp.json())
            .then((data) => {
                setProductData(data)
                setLoading(false)
                console.log("wishlist data",data);
            })
            .catch(error => {
                console.error('Error fetching liked products:', error);
                setError(error)
                setLoading(falase)
            });
    }, []);

    

    if (loading){
        return <div>Loading...</div>
    }

    if (error){
        return <div>Error loading likes</div>
    }



    return(
        <div className="wishlist">
            <div className="container-fluid">
                Wishlist
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
                    {console.log("wishlist", productData[0].product)}
                    <div className="wishlist-container">
                        <ul className="wishlist-items">
                            {productData.length !== 0 &&
                            productData.map((item, index) => (
                                <li key={item.id} className="wishlist-item">
                                    <img src={item.product.images[0].image_url} alt={item.name} className="wishlist-item-image" />
                                    <div className="wishlist-item-details">
                                        <h2>{item.name}</h2>
                                        <div className="wishlist-item-price">
                                            <span>{item.product.price}</span>
                                        </div>
                                    </div>
                                    <button className="wishlist-item-button">Add To Cart</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <h1>{productData[0].product.name}</h1> */}
                </div>
            </div>
        </div>
    )
}


export default Wishlist 