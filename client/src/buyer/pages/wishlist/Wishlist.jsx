import './wishlist.css'
import React, { useState, useEffect } from 'react';
import HomeProduct from '../../components/product/HomeProduct';

function Wishlist(){
    // store product data
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/like")
            .then(resp => resp.json())
            .then((data) => {
                setProductData(data)
                console.log(data);;
            })
            .catch(error => {
                console.error('Error fetching liked products:', error);
            });
    }, []);

    return(
        <div className="wishlist">
            <div className="container-fluid">
                Wishlist
                <div className="productRow ps-4">
                    {productData.length !== 0 ? productData.map((item, index) => (
                        <div className="item" key={index}>
                            <HomeProduct item={item}/> 
                        </div>
                    )):
                    <p>Loading...</p>}
                </div>
            </div>
        </div>
    )
}


export default Wishlist 