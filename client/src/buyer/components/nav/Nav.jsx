import './nav.css'
import {NavLink} from 'react-router-dom'
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';



function Nav() {
    return(
        <div className="buyerNav d-flex align-items-center">
            <div className="container-fluid">
                <div className="row position-relative" >
                    <div className="col-sm-3 part1 d-flex align-items-center">
                        <Button className='browseButton'>
                            <GridViewOutlinedIcon/> &nbsp;
                            Browse All Categories
                            <KeyboardArrowDownIcon/>
                        </Button>

                    </div>

                    <div className="col-sm-7 part2 position-static">
                        <nav>
                            <ul className='list list-inline mb-0'>
                                <li className='list-inline-item'>
                                    <Button className='navButton'><NavLink to='/buyer'>Home</NavLink></Button>
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
                                            <li><Button><NavLink to='/buyer/about'>Login/Register</NavLink></Button></li>
                                            <li><Button><NavLink to='/buyer/about'>Cart</NavLink></Button></li>
                                            <li><Button><NavLink to='/buyer/about'>Orders</NavLink></Button></li>
                                            <li><Button><NavLink to='/buyer/about'>Wishlist</NavLink></Button></li>
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