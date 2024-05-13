import './productDetails.css'
import {NavLink} from 'react-router-dom'
import { useRef, useState} from 'react';
import Sidebar from '../sidebar/Sidebar'
import HomeProduct from '../product/HomeProduct';



import Slider from 'react-slick'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


/*import ReactImageZoom from 'react-image-zoom';*/
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

function ProductDetails(){

    const [zoomImage, setZoomImage] = useState("/shoes.png" )

    const [bigImageSize, setBigImageSize] = useState([1500, 1500])
    const [smlImageSize, setSmlImageSize] = useState([150, 150])

    const [activeSize, setActiveSize] = useState(0)

    const [inputValue, setInputValue] = useState(1)

    const [activeTabs, setActiveTabs] = useState(0)

    const zoomSlider = useRef()

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1, 
        fade: false,
        arrows: true,
        autoplay: 2000,
      
    };

    var related = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1, 
        fade: false,
        arrows: true,
        autoplay: 3000,
       
    };

    const goto=(url, index)=>{
        setZoomImage(url)
        zoomSlider.current.slickGoto(index)
    }


    const isActive=(index)=>{
        setActiveSize(index)
    }

    const plus=()=>{
        setInputValue(inputValue+1)

    }

    const minus=()=>{
        if(inputValue!==1){
            setInputValue(inputValue-1)
        }
        
    }

    return(
        <section className='detailsPage mb-5'>
            <div className="breadcrumbWrapper mb-4">
                <div className="container-fluid">
                    <ul className='breadcrumb breadcrumb2 mb-0'>
                        <li><NavLink to='/buyer'>Home</NavLink></li>
                        <li><NavLink to='/buyer/products'>Products</NavLink></li>
                        <li>Product Details</li>
                    </ul>

                </div>
            </div>
            <div className="container detailsContainer pt-1 pb-3">
                <div className="row">
            {/*Product Zoom code starts here*/}
            <div className="col-md-5">
                <div className="productZoom">
                    <InnerImageZoom 
                    zoomScale={2}
                    zoomType='hover'
                    src={`${zoomImage}?im=Resize=(${bigImageSize[0]}, ${bigImageSize[1]})`} />
                </div>

                <Slider {...settings} className='zoomSlider' ref={zoomSlider}>
                    <div className="item">
                        {/*this works in terms of changing the display image*/}
                        <img src={`/shoes2.png?im=Resize=(${smlImageSize[0]}, ${smlImageSize[1]})`} alt="" className='w-100' 
                        onClick={() => goto("/shoes2.png",0)}/>
                    </div>
                    <div className="item">
                        <img src={`/shoes.png?im=Resize=(${smlImageSize[0]}, ${smlImageSize[1]})`}  alt="" className='w-100' 
                         onClick={() => goto("/shoes.png",1)}/>
                    </div>
                    <div className="item">
                        <img src="/shoes2.png" alt="" className='w-100' 
                        onClick={() => goto(2)}/>
                    </div>
                    <div className="item">
                        <img src="/shoes2.png" alt="" className='w-100' 
                        onClick={() => goto(3)}/>
                    </div>
                    <div className="item">
                        <img src="/shoes2.png" alt="" className='w-100'
                        onClick={() => goto(4)} />
                    </div>


                </Slider>
            </div>
            {/*Product Zoom code ends here*/}



            {/*Product info code starts here*/}
            <div className="col-md-7 productInfo">
                <h1>Addidas Shoes, Sneakers Women's Shoe</h1>
                <div className="productseller d-flex align-items-center mb-2">
                    <span>Sold By: <span className='text-b'>Lorem</span></span>
                </div>
                <div className="d-flex align-items center">
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    <span className='text-light'>(32 reviews)</span>
                </div>

                <div className="priceSec d-flex align-items-center mb-3">
                    <span className='text-b priceLarge'>$70</span>
                    <div className="ms-2 d-flex flex-column">
                        <span className='text-y'>20$ off</span>
                        <span className='text-light oldPrice'>$120</span>
                    </div>
                </div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In consequatur obcaecati mollitia placeat enim quidem magnam! Molestias dicta veniam architecto!</p>

                <div className="productSize d-flex align-items-center">
                    <span>Size / Weight:</span>
                    <ul className='list list-inline mb-0 ps-4'>
                        <li className='list-inline-item'><a className={`tag ${activeSize === 0 ? 'active' : ''}`} onClick={()=>isActive(0)}>50g</a></li>
                        <li className='list-inline-item'><a className={`tag ${activeSize === 1 ? 'active' : ''}`} onClick={()=>isActive(1)}>80g</a></li>
                        <li className='list-inline-item'><a className={`tag ${activeSize === 2 ? 'active' : ''}`} onClick={()=>isActive(2)}>100g</a></li>
                        <li className='list-inline-item'><a className={`tag ${activeSize === 3 ? 'active' : ''}`} onClick={()=>isActive(3)}>150g</a></li>
                        <li className='list-inline-item'><a className={`tag ${activeSize === 4 ? 'active' : ''}`} onClick={()=>isActive(4)}>200g</a></li>
                    </ul>
                </div>



                <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
                    <div className="counterSec me-4">
                        <input type="number"  value={inputValue}/>
                        <span className='arrow plus' onClick={plus}><KeyboardArrowUpIcon/></span>
                        <span className='arrow minus' onClick={minus}><KeyboardArrowDownIcon/></span>

                    </div>

                    <Button className='addToCartBtn'><ShoppingCartOutlinedIcon/>Add to Cart</Button>
                    <Button className='favoriteBtn ms-4'><FavoriteBorderOutlinedIcon/></Button>

                </div>



            </div>
                </div>

                <div className="card mt-3 p-4 detailsPageTabs">
                    <div className="customTabs">
                        <ul className='list list-inline'>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs === 0 && 'active'}`} onClick={() => setActiveTabs(0)}>Description</Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs === 1 && 'active'}`} onClick={() => setActiveTabs(1)}>Additional Info</Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs === 2 && 'active'}`} onClick={() => setActiveTabs(2)}>Vendor</Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs === 3 && 'active'}`} onClick={() => setActiveTabs(3)}>Reviews (3)</Button>
                            </li>
                        </ul>
                        
                        {/* Description */}
                        {
                            activeTabs===0 &&
                            <div className="tabContent pt-2">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod neque laborum tempore iure blanditiis quas sit, rem eius sed aliquam a provident fugiat obcaecati mollitia officia reiciendis, ad, assumenda delectus</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, ullam distinctio sequi laboriosam possimus rem harum? Ipsum vel odit adipisci rerum, sapiente reprehenderit! Quis modi, labore sit similique minus necessitatibus!</p>

                                <br/>
                                <h4>Packaging & Delivery</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod neque laborum tempore iure blanditiis quas sit, rem eius sed aliquam a provident fugiat obcaecati mollitia officia reiciendis, ad, assumenda delectus</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, ullam distinctio sequi laboriosam possimus rem harum? Ipsum vel odit adipisci rerum, sapiente reprehenderit! Quis modi, labore sit similique minus necessitatibus!</p>

                                <br/>
                                <h4>Suggested Use</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod neque laborum tempore iure blanditiis quas sit, rem eius sed aliquam a provident fugiat obcaecati mollitia officia reiciendis, ad, assumenda delectus</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, ullam distinctio sequi laboriosam possimus rem harum? Ipsum vel odit adipisci rerum, sapiente reprehenderit! Quis modi, labore sit similique minus necessitatibus!</p>

                            </div>

                        }

                        {/* Additional Info */}
                        {
                            activeTabs ===1 &&
                            <div className="tabContent">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                <tbody>
                                                <tr class="stand-up">
                                                    <th>Stand Up</th>
                                                    <td>
                                                        <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                                                <tr class="folded-wo-wheels">
                                                    <th>Folded (w/o wheels)</th>
                                                    <td>
                                                        <p>32.5″L x 18.5″W x 16.5″H</p>
                                                    </td>
                                                </tr>
                                                <tr class="folded-w-wheels">
                                                    <th>Folded (w/ wheels)</th>
                                                    <td>
                                                        <p>32.5″L x 24″W x 18.5″H</p>
                                                    </td>
                                                </tr>
                                                <tr class="door-pass-through">
                                                    <th>Door Pass Through</th>
                                                    <td>
                                                        <p>24</p>
                                                    </td>
                                                </tr>
                                                <tr class="frame">
                                                    <th>Frame</th>
                                                    <td>
                                                        <p>Aluminum</p>
                                                    </td>
                                                </tr>
                                                <tr class="weight-wo-wheels">
                                                    <th>Weight (w/o wheels)</th>
                                                    <td>
                                                        <p>20 LBS</p>
                                                    </td>
                                                </tr>
                                                <tr class="weight-capacity">
                                                    <th>Weight Capacity</th>
                                                    <td>
                                                        <p>60 LBS</p>
                                                    </td>
                                                </tr>
                                                <tr class="width">
                                                    <th>Width</th>
                                                    <td>
                                                        <p>24″</p>
                                                    </td>
                                                </tr>
                                                <tr class="handle-height-ground-to-handle">
                                                    <th>Handle height (ground to handle)</th>
                                                    <td>
                                                        <p>37-45″</p>
                                                    </td>
                                                </tr>
                                                <tr class="wheels">
                                                    <th>Wheels</th>
                                                    <td>
                                                        <p>12″ air / wide track slick tread</p>
                                                    </td>
                                                </tr>
                                                <tr class="seat-back-height">
                                                    <th>Seat back height</th>
                                                    <td>
                                                        <p>21.5″</p>
                                                    </td>
                                                </tr>
                                                <tr class="head-room-inside-canopy">
                                                    <th>Head room (inside canopy)</th>
                                                    <td>
                                                        <p>25″</p>
                                                    </td>
                                                </tr>
                                                <tr class="pa_color">
                                                    <th>Color</th>
                                                    <td>
                                                        <p>Black, Blue, Red, White</p>
                                                    </td>
                                                </tr>
                                                <tr class="pa_size">
                                                    <th>Size</th>
                                                    <td>
                                                        <p>M, S</p>
                                                    </td>
                                                </tr>
                                            </tbody>

                                </table>
                            </div>
                        </div>
                        }

                        {/* Vendors */}
                        {
                            activeTabs===2 &&
                            <div className="tabContent">
                                <h1>Hey im a vendor </h1>

                            </div>
                        }

                        {/*Reviews */}
                        {
                            activeTabs===3 &&
                            <div className="tabContent pt-2">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className='mb-4'>Customer Reviews</h4>

                                        <div className="card p-3 reviewsCard flex-row">
                                            <div className="image">
                                                <div className="rounded-circle">
                                                    <img src="/userAvatar3.png" alt="" />
                                                </div>
                                                <span className='text-y d-block text-center font-weight-bold'>Anna</span>
                                            </div>

                                            <div className="info ps-4">
                                                <div className="d-flex align-items-center">
                                                    <h5>February 15, 2024 at 3:30 pm</h5>
                                                    <div className="ms-auto">
                                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly style={{fontSize:'17px'}}/>
                                                    </div>
                                                </div>
                                                
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius inventore ab, quis possimus laborum omnis velit id atque soluta expedita cum eaque nobis alias saepe animi odio aliquam ipsam delectus.</p>
                                            </div>
                                            
                                        </div>

                                        <div className="card p-3 reviewsCard flex-row">
                                            <div className="image">
                                                <div className="rounded-circle">
                                                    <img src="/userAvatar3.png" alt="" />
                                                </div>
                                                <span className='text-y d-block text-center font-weight-bold'>Anna</span>
                                            </div>

                                            <div className="info ps-4">
                                                <div className="d-flex align-items-center">
                                                    <h5>February 15, 2024 at 3:30 pm</h5>
                                                    <div className="ms-auto">
                                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly style={{fontSize:'17px'}}/>
                                                    </div>
                                                </div>
                                                
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius inventore ab, quis possimus laborum omnis velit id atque soluta expedita cum eaque nobis alias saepe animi odio aliquam ipsam delectus.</p>
                                            </div>
                                            
                                        </div>

                                        <div className="card p-3 reviewsCard flex-row">
                                            <div className="image">
                                                <div className="rounded-circle">
                                                    <img src="/userAvatar3.png" alt="" />
                                                </div>
                                                <span className='text-y d-block text-center font-weight-bold'>Anna</span>
                                            </div>

                                            <div className="info ps-4">
                                                <div className="d-flex align-items-center">
                                                    <h5>February 15, 2024 at 3:30 pm</h5>
                                                    <div className="ms-auto">
                                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly style={{fontSize:'17px'}}/>
                                                    </div>
                                                </div>
                                                
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius inventore ab, quis possimus laborum omnis velit id atque soluta expedita cum eaque nobis alias saepe animi odio aliquam ipsam delectus.</p>
                                            </div>
                                            
                                        </div>

                                        <br />

                                        <form action="" className='reviewForm'>
                                            <h4>Add A Review</h4>
                                            <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            <div className="form-group pt-3">
                                                <textarea className='form-control' name="" id="" placeholder='Write a Review'></textarea>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text" className='form-control' placeholder='Name'/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text" className='form-control' placeholder='Email'/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                        <input type="text" className='form-control' placeholder='Website'/>
                                            </div>
                                             

                                            <div className="form-group mt-4">
                                                <Button>Submit Review</Button>
                                            </div>



                                            
                                            
                                        </form>
                                    </div>


                                    <div className="col-md-4 ps-3">
                                        <h4>Average Reviews</h4>
                                        <div className="d-flex align-items-center mt-3 mb-3">
                                            <Rating name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly />
                                            <strong className='ms-3'>4.8 out of 5</strong>
                                    
                                        </div>


                                        <div className="progressBarBox d-flex align-items-center">
                                            <span className='me-3'>5 stars:</span>
                                            <div class="progress" style={{width:'75%', height:'15px'}}>
                                                <div class="progress-bar" style={{width:"70%"}}>70%</div>
                                            </div>
                                        </div>
                                    
                                        <div className="progressBarBox d-flex align-items-center">
                                            <span className='me-3'>4 stars:</span>
                                            <div class="progress" style={{width:'75%', height:'15px'}}>
                                                <div class="progress-bar" style={{width:"60%"}}>60%</div>
                                            </div>
                                        </div>

                                        <div className="progressBarBox d-flex align-items-center">
                                            <span className='me-3'>3 stars:</span>
                                            <div class="progress" style={{width:'75%', height:'15px'}}>
                                                <div class="progress-bar" style={{width:"30%"}}>30%</div>
                                            </div>
                                        </div>

                                        <div className="progressBarBox d-flex align-items-center">
                                            <span className='me-3'>2 stars:</span>
                                            <div class="progress" style={{width:'75%', height:'15px'}}>
                                                <div class="progress-bar" style={{width:"80%"}}>80%</div>
                                            </div>
                                        </div>

                                        <div className="progressBarBox d-flex align-items-center">
                                            <span className='me-3'>1 stars:</span>
                                            <div class="progress" style={{width:'75%', height:'15px'}}>
                                                <div class="progress-bar" style={{width:"50%"}}>50%</div>
                                            </div>
                                        </div>
                                       

                                    </div>
                                </div>

                            </div>
                        }
                        
                        
                    </div>
                </div>

                <div className="relatedProducts pt-5 pb-4">
                    <h2 className='mb-4 mt-0'>Similar Products</h2>
                    <Slider {...related} className='productSlider'>
                        <div className="item">
                            <HomeProduct tag="sale"/>
                        </div>
                        <div className="item">
                            <HomeProduct tag="new"/>
                        </div>
                        <div className="item">
                            <HomeProduct />
                        </div>
                        <div className="item">
                            <HomeProduct tag="hot"/>
                        </div>
                        <div className="item">
                            <HomeProduct tag="hot"/>
                        </div>
                        <div className="item">
                            <HomeProduct tag="sale"/>
                        </div>
                        
                            
                    </Slider>
                </div>


            </div>
        </section>
    )
}

export default ProductDetails