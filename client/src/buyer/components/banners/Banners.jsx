import './banners.css'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'

function Banners({data}){
    const [shopData, setShopData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            // get all data involving the shops 
            const shops = data.map(product => product.shop);
            // Take only the first three items
            setShopData(shops.slice(0, 3)); 
            //setShopData(shops);
            //console.log("Extracted shop data:", shops);
        }
    }, [data]);

    return(
        <div className="bannerSection">
            <div className="container-fluid">
                <div className="row">
                    {shopData.map((shop, index) => (
                        <div className="col" key={index}>
                            <div className="box">
                                <img src={shop.banner_image_url} alt="" className='w-100 transition' />
                                <div className="bannerInfo">
                                    <h3>{shop.name}</h3>
                                    <Button>View Shop</Button>
                                </div>
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
