
import React from 'react';
import './sidebar.css';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button } from '@mui/material';

function valuetext(value) {
    return `$${value}`;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Sidebar({categories, setCategoryFilter, setPriceRange, priceRange }) {

    console.log("sidebar", categories)
    
    const [value, setValue] = React.useState([0, 1000]);

    const categoryImages = {
        "Home decor": "/home-decor.png",
        "Clothing": "/clothing.png",
        "Appliances": "/appliances.png",
        // "Shoes": "/images/shoes.png",
        "Accessories": "/jewelry.png",
        "Tools and Hardware": "/tools.png",
        "Beauty and Skincare": "/skin-care.png",
        "Outdoor Gear": "/outdoor-gear.png",
        "Electronics": "/electronics.png",
        "Health and Wellness": "/spa.png",
        "Toys and Games": "/toys.png",
        "Books and Stationary": "/stationary.png",
        "Food and Beverages": "/fast-food.png",
    };

    React.useEffect(() => {
        if (priceRange && priceRange.length === 2) {
            setValue([priceRange[0], priceRange[1]]);
        }
    }, [priceRange]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPriceRange(newValue);
    };

    const handleCategoryFilter = (category) => {
        setCategoryFilter(category);
    };

    return (
        <>
            <div className="sidebar">
                <div className="card border-0 shadow">
                    <h3 className='sidebar-title'>Category</h3>
                    <div className="catList">
                        {categories.map((category, index) => (
                            <div className="catItem d-flex align-items-center" key={index} onClick={() => handleCategoryFilter((category))}>
                                <span className='img'><img src={categoryImages[category] || '/spa.png'} alt="" width={30} /></span>
                                <h4 className='mb-0 ml-3 mr-3' >{category}</h4>
                                {/* <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span> */}
                            </div>
                        ))}
                        
                        
                       
                    </div>
                </div>

                <div className="card border-0 shadow">
                    <h3 className='sidebar-title'>Filter By Price</h3>
                    <Slider className='priceSlider'
                        min={0}
                        step={1}
                        max={priceRange[1]}
                        getAriaLabel={() => 'Temperature range'}
                        valueLabelDisplay="auto"
                        valueLabelFormat={valuetext}
                        value={value}
                        onChange={handleChange}
                    />
                    <div className="d-flex pt-2 pb-2 priceRange">
                        <span>From: <strong className='priceText'>${value[0]}</strong></span>
                        <span className='ms-auto'>To: <strong className='priceText'>${value[1]}</strong></span>
                    </div>
                    {/* Add filter checkboxes */}
                </div>

                {/* Add more filters */}
            </div>
        </>
    );
}

export default Sidebar;




/*
function Sidebar(){

    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return(
        <>
        <div className="sidebar">
            <div className="card border-0 shadow">
                <h3>Category</h3>
                {/*category List and category item*
                <div className="catList">
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span className='img'><img src="/spa.png" alt="" width={35} /></span>
                        <h4 className='mb-0 ml-3 mr-3'>Health & Wellness</h4>
                        <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>30</span>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow">
                <h3>Filter By Price</h3>
                <Slider className='priceSlider'
                    min={0}
                    step={1}
                    max={1000}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                
                    
                />
                <div className="d-flex pt-2 pb-2 priceRange">
                    <span>From: <strong className='priceText'>${value[0]}</strong></span>
                    <span className='ms-auto'>To: <strong className='priceText'>${value[1]}</strong></span>

                </div>

                <div className="filters">
                    <h5>Color</h5>
                    <ul className='mb-0'>
                        <li><Checkbox {...label} />Red (56)</li>
                        <li><Checkbox {...label} />Green (70)</li>
                        <li><Checkbox {...label} />Blue (100)</li>
                        <li><Checkbox {...label} />Red (56)</li>
                        <li><Checkbox {...label} />Green (70)</li>
                        <li><Checkbox {...label} />Blue (100)</li>
                        <li><Checkbox {...label} />Red (56)</li>
                        <li><Checkbox {...label} />Green (70)</li>
                        <li><Checkbox {...label} />Blue (100)</li>   
                    </ul>
                </div>

                <div className="filters">
                    <h5>Item Condition</h5>
                    <ul>
                        <li><Checkbox {...label} />New (56)</li>
                        <li><Checkbox {...label} />Refurbished (70)</li>
                        <li><Checkbox {...label} />Used (100)</li>
                        <li><Checkbox {...label} />New (56)</li>
                        <li><Checkbox {...label} />Refurbished (70)</li>
                        <li><Checkbox {...label} />Used (100)</li>
                         
                    </ul>
                </div>

                <div className="d-flex">
                    <Button className='btn'><FilterAltOutlinedIcon/>Filter</Button>
                </div>    
            </div>

            <img src="/sale1.jpeg" alt="" className='w-100' />
        </div>
        </>

    )
}

export default Sidebar*/