import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminChart from '../../components/charts/AdminChart';
import AdminTable from '../../components/table/AdminTable';
import './single.scss';

function Single() {
    const { sellerId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user details using sellerId
        fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data); // Set the entire user object
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
                setLoading(false);
            });
    }, [sellerId]);

    console.log("from single", user)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    // Extract shop information from the user object
    const shop = user.shop || {};

    return (
        <div className='adminSingle'>
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Shop Information</h1>
                        <div className="item">
                            <img src={shop.banner_image_url} alt="Shop Banner" className="itemImg" />
                            <div className="details">
                                <h2 className="itemTitle">{shop.name}</h2>
                                <div className="itemDescription">
                                    <p>{shop.description}</p>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Email:</span>
                                    <span className='itemValue'>{user.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Phone:</span>
                                    <span className='itemValue'>{shop.contact}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Location:</span>
                                    <span className='itemValue'>{shop.location}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Total Products:</span>
                                    <span className='itemValue'>{shop.products.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <AdminChart aspect={3 / 1} title="Sales (Last 6 Months)" />
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Single;


/*import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminChart from '../../components/charts/AdminChart';
import AdminTable from '../../components/table/AdminTable';
import './single.scss';

function Single() {
    const { sellerId } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user details using sellerId and extract shop information
        fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`)
            .then((response) => response.json())
            .then((data) => {
                const shopData = data.shop || {};
                setShop(shopData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching shop details:', error);
                setLoading(false);
            });
    }, [sellerId]);

    console.log("shop", shop)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!shop) {
        return <div>No shop data found for this seller.</div>;
    }

    return(
        <div className="adminSingle">
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Shop Information</h1>
                        <div className="item">
                            <img src={shop.logo_image_url} alt={shop.name} className="itemImg" />
                            <div className="details">
                                <h2 className="itemTitle">{shop.name}</h2>
                                <div className="itemDescription">
                                    <p>{shop.description}</p>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Email:</span>
                                    <span className='itemValue'></span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Phone:</span>
                                    <span className='itemValue'>{shop.contact}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Location:</span>
                                    <span className='itemValue'>{shop.location}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Total Products:</span>
                                    <span className='itemValue'>{shop.products.length}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <AdminChart aspect={3 / 1} title="Sales (Last 6 Months)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title" style={{ fontSize: "20px" }}>Previous Sales</h1>
                    <AdminTable sales />
                </div>
                
            </div>
        </div>
    )

}

export default Single;*/




