import './footer.css'
import {NavLink} from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer(){
    return(
        <div>
            <div className="footerWrapper">
                <div className="footerBoxes">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="Box d-flex align-items-center justify-content-center w-100">
                                    <span><img src="/tag.png" alt=""/></span>
                                    <div className="info">
                                        <h4>Best Prices & Offers</h4>
                                        <p>Order $200 or more</p>
                                    </div>

                                </div>

                            </div>

                            <div className="col">
                                <div className="Box d-flex align-items-center justify-content-center w-100">
                                    <span><img src="/delivery.png" alt=""/></span>
                                    <div className="info">
                                        <h4>Delivery Services</h4>
                                        <p>24/7 Delivery</p>
                                    </div>

                                </div>

                            </div>

                            <div className="col">
                                <div className="Box d-flex align-items-center justify-content-center w-100">
                                    <span><img src="/offer.png" alt=""/></span>
                                    <div className="info">
                                        <h4>Daily Deals</h4>
                                        <p>When you sign up</p>
                                    </div>

                                </div>

                            </div>

                            <div className="col">
                                <div className="Box d-flex align-items-center justify-content-center w-100">
                                    <span><img src="/wallet.png" alt=""/></span>
                                    <div className="info">
                                        <h4>Easy Payment</h4>
                                        <p>Safe and secure</p>
                                    </div>
                                </div>

                            </div>

                    
                        </div>
                    </div>
                </div>


                <footer>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 part1">
                                <NavLink to='/my_banda' style={{textDecoration:"none"}} className='d-flex align-items-center '>
                                    <img src="/Logo.jpeg" alt="" style={{height:"60px"}}/>
                                    <h1 style={{fontSize:"30px", opacity:"0.9", marginTop:"10px", color:"#000"}}>MyBanda</h1>
                                </NavLink>
                                <br />

                                <p><LocationOnOutlinedIcon/> <strong>Address:</strong> 5128 W Manchester Str, Kent 51327 Gonghzou China</p>
                                <p><AddIcCallOutlinedIcon/> <strong>Call us:</strong> (+254)-123-456-778</p>
                                <p><EmailOutlinedIcon/> <strong>Email:</strong> sale@mybanda.com</p>
                                <p><WatchLaterOutlinedIcon/><strong>Email:</strong> 8:00 - 17:00, Mon-Sat </p>

                            </div>

                            <div className="col-md-5 part2">
                                <div className="row">
                                    <div className="col ms-6">
                                        <h3>Company</h3>
                                        <ul className='footer-list mb-sm-5 mb-md-0'>
                                            <li><NavLink to='/About'>About Us</NavLink></li>
                                            <li><NavLink to='/login'>Become a Vendor</NavLink></li>
                                            <li><NavLink to='/login'>Delivery Providers</NavLink></li>
                                            
                                            <li><NavLink to='/About'>Terms &amp; Conditions</NavLink></li>
                                            <li><NavLink to='/About'>Contact Us</NavLink></li>
                                            <li><NavLink to='/About'>Support Center</NavLink></li>
                                            
                                            

                                        </ul>
                                    </div>

                                    <div className="col ms-6">
                                        <h3>Account</h3>
                                        <ul className='footer-list mb-sm-5 mb-md-0'>
                                            <li><NavLink to='/login'>Sign In</NavLink></li>
                                            <li><NavLink to='/my_banda/cart'>View Cart</NavLink></li>
                                            <li><NavLink to="/my_banda/wishlist">My Wishlist</NavLink></li>
                                            <li><NavLink to='/About'>Track My Order</NavLink></li>
                                            <li><NavLink to='/About'>Help Ticket</NavLink></li>
                                            <li><NavLink to='/About'>Shipping Details</NavLink></li>
                                    

                                        </ul>
                                    </div>

                                    {/* <div className="col ms-4">
                                        <h3>Corporate</h3>
                                        <ul className='footer-list mb-sm-5 mb-md-0'>
                                            <li><NavLink to='/login'>Become a Vendor</NavLink></li>
                                            <li><NavLink to='/login'>Delivery Providers</NavLink></li>
                                            <li><NavLink to='/About'>Our Partners</NavLink></li>
                                            <li><NavLink to='/About'>Accessibility</NavLink></li>
                                            <li><NavLink to='/About'>Promotions</NavLink></li>

                                        </ul>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-md-3 part-3">
                                <h3>Install App</h3>
                                <p>From App Store or Google Play</p>

                                <div className="d-flex">
                                    <img src="/app-store.jpg" alt="" width={120}/>
                                    <img src="/google-play.jpg" alt="" className='mx-3' width={120} />
                                </div>

                                <br />
                                <p>Secured Payment Gateways</p>
                                <img src="/payment-method.png" alt="" width={180}/>
                            </div>
                        </div>

                        <hr />

                        <div className="row lastStrip">
                            <div className="col-md-3">
                                <p>&copy; 2024 MyBanda All rights reserved</p>

                            </div>

                            <div className="col-md-6 d-flex">
                                <div className="m-auto d-flex alig-items-center">
                                    <div className="phNo d-flex align-items-center mx-5">
                                        <span><AddIcCallOutlinedIcon/></span>
                                        <div className="info ml-3">
                                            <h4 className='mb-0'>8910-112</h4>
                                            <p className='mb-0'>Working 8:00 - 22:00</p>
                                        </div>
                                    </div>

                                    <div className="phNo d-flex align-items-center mx-5">
                                        <span><AddIcCallOutlinedIcon/></span>
                                        <div className="info ml-3">
                                            <h4 className='mb-0'>1234-567</h4>
                                            <p className='mb-0'>24/7 Support Center</p>
                                        </div>
                                    </div>

                                </div>
                            


                            </div>

                            <div className="col-md-3 part3">
                                <div className="d-flex align-items-center">
                                    <h5>Follow Us</h5>
                                    <ul className='list list-inline'>
                                        <li className='list-inline-item'>
                                            <NavLink to={''}><FacebookOutlinedIcon/></NavLink>
                                        </li>
                                        <li className='list-inline-item'>
                                            <NavLink to={''}><XIcon/></NavLink>
                                        </li>
                                        <li className='list-inline-item'>
                                            <NavLink to={''}><InstagramIcon/></NavLink>
                                        </li>
                                        
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer