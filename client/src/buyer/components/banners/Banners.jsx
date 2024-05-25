import './banners.css'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Banners({data}){
    const [shopData, setShopData] = useState([]);
    
    
    useEffect(() => {
        if (data && data.length > 0) {
            // Get all data involving the shops
            const shops = data.map(product => product.shop);
            const uniqueShops = Array.from(new Set(shops.map(shop => JSON.stringify(shop))))
                                    .map(shop => JSON.parse(shop));
            setShopData(uniqueShops.slice(0, 3)); 
        }
    }, [data]);

    /*
    useEffect(() => {
        if (data.length !== 0) {
            // Extract unique shops
            const uniqueShops = Array.from(new Set(data.map(item => item.shop.id)))  // Get unique shop IDs
                .map(id => data.find(item => item.shop.id === id).shop);  // Find the corresponding shop for each unique ID
            setShopData(uniqueShops.slice(0, 3));  // Set unique shops and limit to 3
        }
    }, [data]);*/

    console.log("shop", shopData)

    return(
        <div className="bannerSection">
            <div className="container-fluid">
                <div className="row">
                    {shopData.map((shop, index) => (
                        <div className="col" key={index}>
                            <div className="Box">
                                <NavLink to={`/my_banda/vendors/${shop.seller_id}`}>
                                    <img src={shop.banner_image_url} alt="" className='w-100 transition' /> 
                                </NavLink>
                                
                                
                            </div>
                        </div>
                    ))}
                    {/*
                    <div className="col">
                        <div className="box">
                            <img src="/banner2.jpeg" alt="" className='w-100 transition'/>
                            <div className="bannerInfo">
                                <h3>Dolor sit</h3>
                                <Button>View Shop</Button>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="box">
                            <img src="/banner1.jpeg" alt="" className='w-100 transition'/>
                            <div className="bannerInfo">
                                <h3>Amet consectetur.</h3>
                                <Button>View Shop</Button>
                            </div>
                        </div>
                        
                    </div>
                */}


                 
                </div>
            </div>
        </div>
    )
}

export default Banners
