import './vendors.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Vendors(){

    /*const { sellerId } = useParams();
    const [vendor, setVendor] = useState(null);

    useEffect(() => {
        // Fetch vendor data based on sellerId
        fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`)
            .then(resp => resp.json())
            .then(data => setVendor(data))
            .catch(error => console.error('Error fetching vendor data:', error));
    }, [sellerId]);

    console.log("seller id", vendor)*/

    const { sellerId } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch vendor data based on sellerId
        fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`)
            .then(resp => resp.json())
            .then(data => {
                setVendor(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching vendor data:', error);
                setError(error);
                setLoading(false);
            });
    }, [sellerId]);

    console.log("seller id", vendor)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading vendor data</div>;
    }

    if (!vendor) {
        return <div>No vendor data available</div>;
    }

    return(
        <div className="vendors mb-5">
            <div className="vendorWrapper" >
                <div className="container-fluid">
                        <div className="vendorBanner"  >
                            <img src={vendor.shop.banner_image_url} alt="" className='w-100'/>
                            <div className="vendorLogo">
                                <img src={vendor.shop.logo_image_url}alt="" />
                            </div>
                        </div>
                </div> 
                <br />      
            </div>

            <div className="container-fluid pt-3">
                <div className="vendorDetails">
                    <div className="vendorInfo">
                        <h4>{vendor.shop.name}</h4>
                        <p>{vendor.shop.description}.</p>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                    <div className="vendorFollow">
                        <Button>Follow</Button>
                    </div>
                </div>
                <hr />

                <div className="vendorSearch">
                    <div className="vendorSearchInput">
                        <input type="text"  placeholder='Search for products...'/>
                        <SearchOutlinedIcon/>   
                    </div>
                    <div className="vendorFilter">
                        Filter By 

                    </div>
                </div>   

            </div>
            

            
    </div>
        
        
    )
}


export default Vendors


{/*<div className="vendors mb-5">
            <div className="vendorWrapper" >
                <div className="container-fluid">
                        <div className="vendorBanner"  >
                            <img src={vendor.shop.banner_image_url} alt="" className='w-100'/>
                            <div className="vendorLogo">
                                <img src={vendor.shop.logo_image_url}alt="" />
                            </div>
                        </div>


                </div> 
                <br />
               
            </div>

            <div className="container-fluid pt-3">
                <div className="vendorDetails">
                    <div className="vendorInfo">
                        <h4>{vendor.shop.name}</h4>
                        <p>{vendor.shop.description}.</p>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                    <div className="vendorFollow">
                        <button>Follow</button>
                    </div>
                </div>
                <hr />

                <div className="vendoProducts">
                    Products
                </div>   

            </div>
            
            
                

            

            
    </div>*/}