import './nav.css'
import {NavLink} from 'react-router-dom'
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import { useEffect, useState } from 'react';


const normalizeCategoryName = (name) => name.replace(/\s+/g, '').toLowerCase();

function Nav({categories, categoryImages}) {
    //console.log("from nav",data)

    const [isOpenDropDown, setIsOpenDropDown] = useState(false)


    return(
        <div className="buyerNav d-flex align-items-center">
            <div className="container-fluid">
                <div className="row position-relative" >
                    <div className="col-sm-3 part1 d-flex align-items-center">
                        <Button className='browseButton res-hide' onClick={()=>setIsOpenDropDown(!isOpenDropDown)}>
                            <GridViewOutlinedIcon/> &nbsp;Browse All Categories<KeyboardArrowDownIcon/>
                        </Button>
                        {isOpenDropDown !== false &&
                        <div className="row dropdown_Menu">
                            
                                {
                                    categories.length !== 0 &&
                                    categories.map((category, index) => {
                                        const normalizedCategory = normalizeCategoryName(category);
                                        return(
                                            <div className="catItem d-flex align-items-center p-1" key={index}>
                                                <span className='img pe-3'><img src={categoryImages[normalizedCategory]} alt="" width={30} heigh={30} /></span>
                                                <p className='mb-0 ml-3 mr-3'>{category}</p>
    
                                            </div>
                                        )
                                    })
                                }

                            </div>
                                   
                        }


                    </div>

                    <div className="col-sm-7 part2 position-static">
                        <nav>
                            <ul className='list list-inline mb-0'>
                                <li className='list-inline-item'>
                                    <Button className='navButton'><NavLink to='/my_banda'>Home</NavLink></Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className='navButton'><NavLink to='about'>About</NavLink></Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className='navButton'><NavLink to='products'>Products</NavLink></Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className='navButton'><NavLink>Shops</NavLink></Button>
                                    {/*mega menu code from vid 3 min 30 easy to implement. add position-static w-100 to li of mega menu*/}
                                </li>
                                <li className='list-inline-item'>
                                    <Button className='navButton'>
                                        <NavLink>Pages <KeyboardArrowDownIcon/></NavLink>
                                    </Button>
                                    <div className="dropdown_menu">
                                        <ul style={{paddingLeft:'0px'}}>
                                            <li><Button><NavLink to='/buyer/login'>Login/Register</NavLink></Button></li>
                                            <li><Button><NavLink to='/my_banda/cart'>Cart</NavLink></Button></li>
                                            <li><Button><NavLink to='/my_banda/orders'>Orders</NavLink></Button></li>
                                            <li><Button><NavLink to='/my_banda/wishlist'>Wishlist</NavLink></Button></li>
                                            <li><Button><NavLink to='/buyer/about'>About Us</NavLink></Button></li>
                                            <li><Button><NavLink to='/buyer/about'>Contact</NavLink></Button></li> 
                                        </ul>

                                    </div>

                              
                                </li>
                                <li className='list-inline-item'>
                                    <Button className='navButton'><NavLink>Contact</NavLink></Button>
                                </li>
                            </ul>

                        </nav>

                    </div>

                    <div className="col-sm-2 part3 d-flex align-items-center">
                        <div className="phNo d-flex align-items-center ms-auto">
                            <AddIcCallOutlinedIcon/>
                            <div className="info ml-3">
                                <h4 className='mb-0'>1234-567</h4>
                                <p className='mb-0'>24/7 Support Center</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Nav;