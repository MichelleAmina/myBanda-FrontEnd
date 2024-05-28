import '../header/header.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// responsive icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import Select from '../selectDrop/select';
import Nav from '../nav/Nav'


import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'


function Header(props){
    const {cartTotalQuantity} = useSelector(state => state.cart)
    const navigate = useNavigate();
    //console.log("from header,",props)

    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const headerRef = useRef()
    
    const [categories, setCategories] = useState([])


    useEffect(() => {
        if (props.data.length !== 0) {
            const uniqueCategories = Array.from(new Set(props.data.map(item => item.category)));
            setCategories(uniqueCategories);
        }
    }, [props.data]);

    const categoryImages = {
        homedecor: "/home-decor.png",
        appliances: "/appliances.png",
        toolsandhardware: "/tools.png",
        clothing: "/clothing.png",
        accessories: "/jewelry.png",
        beautyandskincare: "/skin-care.png",
        outdoorgear: "/outdoor-gear.png",
        electronics: "/electronics.png",
        healthandwellness: "/spa.png",
        toysandgames: "/toys.png",
        booksandstationary: "/stationary.png",
        foodandbeverages: "/fast-food.png",
    };


    const countryList = []

    useEffect(() => {
        getCountry('https://countriesnow.space/api/v0.1/countries/')
    },[])

    const getCountry = async(url) => {
        try{
            await axios.get(url).then((res) => {
                if(res !== null ){
                    //console.log(res.data.data)
                    res.data.data.map((item, index) => {
                        countryList.push(item.country)
                        //console.log(item.country)
                    })

                    
                }
            })

        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let position = window.pageYOffset;
            //console.log(position)
            if(position> 100){
                headerRef.current.classList.add('fixed')
            }else{
                headerRef.current.classList.remove('fixed')
            }
        })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        console.log("user logged out")
        // Optionally, remove other user-specific data
        // localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('cart');
        navigate('/login'); 
    };


    return(
        <>
        <div className="headerWrapper" ref={headerRef}>
            <header >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 part1 d-flex align-items-center">
                        <NavLink className='header-logo d-flex align-items-center' to='/my_banda'>
                            <img src="/Logo.jpeg" alt="" style={{height:"50px"}}/>
                            <h1 style={{fontSize:"25px", opacity:"0.8", marginTop:"10px"}}>MyBanda</h1>
                        </NavLink>
                        
                        {/* {
                            windowWidth < 992 &&
                            <div className="ms-auto d-flex align-items-center">
                                <div className="navbarToggle me-2"><SearchIcon/></div> 
                                <div className="navbarToggle me-2"><ShoppingCartOutlinedIcon/></div>
                                <div className="navbarToggle"><MenuIcon/></div> 
                            </div>
                        } */}
                        
                          
                    </div>

                    {/* header Search starts here */}
                    <div className="col-sm-5 part2">
                        <div className="headerSearch d-flex align-items-center">
                            
                            <div className="productSearch d-flex align-items-center">
                                <input type="text" placeholder='Search for products...' />
                                <SearchIcon className='searchIcon cursor'/>
                            </div>

                        </div>
                        
                    </div>
                    {/* header Search ends here */}

                    <div className="col-sm-5 d-flex align-items-center part3">
                        {/*ml-auto changed to ms-auto bootstrap 5*/}
                        <div className="ms-auto d-flex align-items-center">
                            <div className="countryWrapper">
                                <Select data={countryList} placeholder={'Your Location'} 
                                icon = {<LocationOnOutlinedIcon style={{opacity:'0.5'}}/>}/>
                            </div>
                            <ClickAwayListener onClickAway={()=> setIsOpenDropdown(false)}>
                            <ul className='list list-inline mb-0 headerTabs '>
                                <li className='list-inline-item'>
                                <NavLink to="/my_banda/wishlist" className="nav-link">
                                    <span>
                                        <FavoriteBorderOutlinedIcon className='listIcon'/>
                                        {/* <span className='badge'>0</span> */}
                                        Wishlist
                                    </span>
                                </NavLink>
                                </li>
                                <li className='list-inline-item'>
                                <NavLink to="/my_banda/cart" className="nav-link">
                                    <span>
                                        <ShoppingCartOutlinedIcon className='listIcon' />
                                        <span className='badge'>{cartTotalQuantity}</span>
                                        {console.log("Cart total", cartTotalQuantity.toString())}
                                        Cart
                                    </span>
                                </NavLink>
                                </li>
                                <li className='list-inline-item'>
                                    <span onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                                        <PersonOutlineIcon className='listIcon'/>
                                        <span className='badge'>3</span>
                                        Account
                                    </span>
                                    {isOpenDropdown !== false &&
                                        <ul className='dropdownMenu'>
                                            <li><Button className='align-items-center'><PersonOutlineIcon/>My Account</Button></li>
                                            <li><Button><LocationOnOutlinedIcon/>Order Tracking</Button></li>
                                            <li><Button><FavoriteBorderOutlinedIcon/>My Wishlist</Button></li>
                                            <li><Button><TuneOutlinedIcon/>Setting</Button></li>
                                            <li><Button onClick={handleLogout}><LogoutOutlinedIcon/>Sign Out</Button></li>

                                        </ul>
                                    }


                                </li>
                            </ul>
                            </ClickAwayListener>
                        </div>
                                
                    </div>
                </div>
            </div>
            </header>

            <Nav categories={categories} categoryImages={categoryImages}/>
        </div>

        <div className="afterHeader">
            
        </div>
        </>
    )

}

export default Header 