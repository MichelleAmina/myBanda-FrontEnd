import React from 'react';
import './sidebar.css'
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button } from '@mui/material';

function valuetext(value) {
    return `${value}°C`;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
                {/*category List and category item*/}
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

export default Sidebar