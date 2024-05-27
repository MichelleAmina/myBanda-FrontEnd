import './vendors.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeProduct from '../../components/product/HomeProduct';

function Vendors() {
    const { sellerId } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchinput, setsearchinput] = useState('');


    useEffect(() => {
        // Fetch vendor data based on sellerId
        fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`)
            .then(resp => resp.json())
            .then(data => {
                setVendor(data);
                setTimeout(() => setLoading(false), 1000);
            })
            .catch(error => {
                console.error('Error fetching vendor data:', error);
                setError(error);
                setLoading(false);
            });
    }, [sellerId]);

    if (loading) {
        return (
            <div className="loader">
                <img src="https://i.pinimg.com/originals/c1/bc/d8/c1bcd8a8c945b53da6b29f10a2a553c0.gif" alt="" />
            </div>
        );
    }

    if (error) {
        return <div>Error loading vendor data</div>;
    }

    if (!vendor) {
        return <div>No vendor data available</div>;
    }

    const handleSearchChange = (e) => {
        setsearchinput(e.target.value);
    };

    const filteredProducts = vendor.shop.products.filter((product) =>
        product.name.toLowerCase().includes(searchinput.toLowerCase())
    );

    return (
        <div className="vendors mb-5">
            <div className="vendorWrapper">
                <div className="container-fluid">
                    <div className="vendorBanner">
                        <img src={vendor.shop.banner_image_url} alt="" className='w-100' />
                        <div className="vendorLogo">
                            <img src={vendor.shop.logo_image_url} alt="" />
                        </div>
                    </div>
                </div>
                <br />
            </div>

            <div className="container-fluid pt-3">
                <div className="vendorDetails">
                    <div className="vendorInfo">
                        <h4>{vendor.shop.name}</h4>
                        <p>{vendor.shop.description}</p>
                        <p><strong>Phone / Email :</strong> {vendor.shop.contact}, {vendor.email}</p>
                    </div>
                    <div className="vendorFollow">
                        <Button>Follow</Button>
                    </div>
                </div>
                <hr />

                <div className="vendorSearch">
                    <div className="vendorSearchInput">
                        <input
                            type="text"
                            placeholder='Search for products...'
                            value={searchinput}
                            onChange={handleSearchChange}
                        />
                        <SearchOutlinedIcon />
                    </div>
                </div>

                <div className="vendorProducts">
                    {filteredProducts.map((item, index) => {
                        item.shop = vendor.shop;
                        return (
                            <div className="item" key={index}>
                                <HomeProduct item={item} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Vendors;
