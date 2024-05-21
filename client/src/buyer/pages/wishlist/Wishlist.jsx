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

    //console.log("wishlist", productData[0].product)

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
                    {productData.length !== 0 &&
                        // <h2>{productData[0].product.name}</h2>
                        productData.map((item, index) => (
                            <div className="item" key={index}>
                                {console.log("Item passed down to home product:",item.product)}
                                <HomeProduct item={item.product}/>
                            </div>
                        ))
                    }           
                </div>
            </div>
        </div>
    )
}


export default Wishlist 