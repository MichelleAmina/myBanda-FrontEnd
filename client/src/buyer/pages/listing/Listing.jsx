import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import HomeProduct from '../../components/product/HomeProduct';
import { Button } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

function Listing() {
    // store product data
    const [productData, setProductData] = useState([]);
    // store category
    const [categories, setCategories] = useState([])
    // price 
    const [priceRange, setPriceRange] = useState([0, 1000]);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(null);
    
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Fetch data 
    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/products")
            .then(resp => resp.json())
            .then((data) => {
                setProductData(data);
                const maxPrice = Math.max(...data.map(item => item.price));
                setPriceRange([0, maxPrice]);
                setFilteredProducts(data);
                setLoading(false);
                //setTimeout(() => setLoading(false), 1000);
            })
            .catch(error => {
                console.error('Error fetching products data:', error);
            });
    }, []);
    //console.log("price Range",priceRange)
    

    // Store list of categories without repetition
    useEffect(() => {
        if (productData.length !== 0) {
            const uniqueCategories = new Set(productData.map(item => item.category));
            setCategories([...uniqueCategories]);
           
        }
    }, [productData]);

    
    useEffect(() => {
        if (categoryFilter === null && priceRange[0] === 0 && priceRange[1] === 1000) {
            setFilteredProducts(productData);
        } else {
            const filtered = productData.filter(product => {
                const inCategory = categoryFilter === null || product.category === categoryFilter;
                const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
                return inCategory && inPriceRange;
            });
            setFilteredProducts(filtered);
        }
    }, [categoryFilter, priceRange, productData]);


    const totalProducts = useMemo(() => filteredProducts.length, [filteredProducts]);

    // Render loading GIF if loading
    if (loading) {
        return (
            <div className="loader">
                <img src="https://i.pinimg.com/originals/c1/bc/d8/c1bcd8a8c945b53da6b29f10a2a553c0.gif" alt="Loading..." />
            </div>
        );
    }
    

    return (
        <div>
            <section className='listingPage'>
                <div className="container-fluid">
                    <div className="breadcrumb flex-column">
                        <h1>Product Listing</h1>
                        <ul className='list list-inline'>
                            <li className='list-inline-item'>
                                <NavLink to='/my_banda'>Home</NavLink>
                            </li>
                            <li className='list-inline-item'>
                                <NavLink to='/my_banda/products'>Products</NavLink>  
                            </li>
                        </ul>
                    </div>

                    <div className="listingData">
                        <div className="row">
                            <div className="col-md-3 sidebarWrapper">
                                <Sidebar 
                                categories={categories} 
                                setCategoryFilter={setCategoryFilter} 
                                setPriceRange={setPriceRange} 
                                priceRange={priceRange}
                                />
                            </div>

                            <div className="col-md-9 rightContent homeProducts pt-0">
                                <div className="topStrip d-flex align-items-center">
                                    <p className='mb-0'>We found <span>{totalProducts}</span> items for you</p>
                                    <div className="ms-auto d-flex align-items-center">
                                        <div className="tab_ position-relative">
                                            <Button className='btn_' onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                                                <GridViewOutlinedIcon/>
                                                Show: 50
                                            </Button>
                                            { isOpenDropdown &&
                                                <ul className='dropdownMenu'>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>50</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>100</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>150</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>200</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>All</Button></li>
                                                </ul>
                                            }
                                        </div>
                                        <div className="tab_ ms-3 position-relative">
                                            <Button className='btn_' onClick={()=>setIsOpenDropdown2(!isOpenDropdown2)}>
                                                <TuneOutlinedIcon/>
                                                Sort By:
                                            </Button>
                                            { isOpenDropdown2 &&
                                                <ul className='dropdownMenu'>
                                                    <li><Button className='align-items-center'>Featured</Button></li>
                                                    <li><Button className='align-items-center'>Price: Low to High</Button></li>
                                                    <li><Button className='align-items-center'>Price: High to Low</Button></li>
                                                    <li><Button className='align-items-center'>Highest Rating</Button></li>
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="productRow ps-4">
                                    {filteredProducts.map((item, index) => (
                                        <div className="item" key={index}>
                                            <HomeProduct item={item}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Listing;



