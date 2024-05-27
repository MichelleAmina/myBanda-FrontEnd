import './productDetails.css'
import {NavLink, useParams, useLocation} from 'react-router-dom'
import { useRef, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import Sidebar from '../sidebar/Sidebar'
import HomeProduct from '../product/HomeProduct';
import { addToCart, decreaseCart } from '../../../redux/cartSlice';
import { toast } from 'react-toastify';

import Slider from 'react-slick'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

/*import ReactImageZoom from 'react-image-zoom';*/
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

function ProductDetails(){
    const dispatch = useDispatch();

    const { productId } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);
    const [zoomImage, setZoomImage] = useState(product?.images[0]?.image_url || "/shoes.png");

    const [bigImageSize, setBigImageSize] = useState([1500, 1500])
    const [smlImageSize, setSmlImageSize] = useState([150, 150])

    const [activeSize, setActiveSize] = useState(0)
    const [inputValue, setInputValue] = useState(1)
    const [activeTabs, setActiveTabs] = useState(0)

    const zoomSlider = useRef()

    const accessToken = localStorage.getItem('access_token');

    //Decoding the JWT token to get the payload
    const tokenParts = accessToken.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));

    //Extracting the user ID from the payload
    const userId = payload.sub;
    console.log('User ID:', userId);

    const initialReviewInfo = {
        content: '',
        rating: 0
    };

    const [reviewInfo, setReviewInfo] = useState(initialReviewInfo);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("sending the review")

        try {
            const res = await fetch('https://mybanda-backend-88l2.onrender.com/review', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    content: reviewInfo.content,
                    rating: reviewInfo.rating,
                    product_id: productId,
                    user_id: userId
                }),
            })

            if(res.ok){
                console.log("Review sent successfully")
            } else {
                const errorData = await res.json();
                console.log("error placing review", errorData)
            }
        } catch (error){
            console.log("Error:", error)
        }

    }

    
    // If unable to get data using useLocation, fetch it directly from the database 
    useEffect(() => {
        if (!product) {
            fetch(`https://mybanda-backend-88l2.onrender.com/product/${productId}`)
                .then(resp => resp.json())
                .then(data => {
                    setProduct(data);
                    if (data.images && data.images.length > 0) {
                        setZoomImage(data.images[0].image_url);
                    }
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                });
        }
    }, [product, productId]);

    console.log("the product", product)


    const handleAddToWishlist = (id) => {
        fetch("https://mybanda-backend-88l2.onrender.com/like", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
            product_id: id
        }),
        })
        // .then((r) => console.log(r))
        .then((response) => {
            if (response.ok) {
                toast.success('Item added to wishlist!', {position: "top-center"});
            } else {
                throw new Error('Failed to add item to wishlist' , {position: "top-center"});
            }
        })
    }



    if (!product) {
        return <div>Loading...</div>;
    }

    // handle content change 
    const handleChange = (event, newValue) => {
        if (event.target) {
            const { name, value } = event.target;
            setReviewInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value
            }));
        } else {
            setReviewInfo((prevInfo) => ({
                ...prevInfo,
                rating: newValue
            }));
        }
    };

    //  handle rating change 
    const handleRatingChange = (event, newValue) => {
        setReviewInfo((prevInfo) => ({
            ...prevInfo,
            rating: newValue
        }));
    };

    // Calculate average rating
    const calculateAverageRating = () => {
        if (product.reviews.length === 0) {
            return 0;
        }

        const totalStars = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalStars / product.reviews.length;
    };

    const averageRating = calculateAverageRating();

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

    const handleAddToCart = (product) => {
        const productWithQuantity = { ...product, cartQuantity: inputValue };
        dispatch(addToCart(productWithQuantity));
    };

    

    return(
        <section className='detailsPage mb-5'>
            <div className="breadcrumbWrapper mb-4">
                <div className="container-fluid">
                    <ul className='breadcrumb breadcrumb2 mb-0'>
                        <li><NavLink to='/my_banda'>Home</NavLink></li>
                        <li><NavLink to='/my_banda/products'>Products</NavLink></li>
                        <li>Product Details</li>
                    </ul>

                </div>
            </div>
            <div className="container detailsContainer pt-1 pb-3">
                <div className="row">
            {/*Product Zoom code starts here*/}
            <div className="col-md-5">
                <div className="productZoom">
                <InnerImageZoom src={zoomImage} zoomSrc={zoomImage} zoomScale={2} zoomType='hover'  className="productZoomImage" />
                    {/*<InnerImageZoom 
                    zoomScale={2}
                    zoomType='hover'
                    src={`${zoomImage}?im=Resize=(${bigImageSize[0]}, ${bigImageSize[1]})`} />*/}
                </div>
                <Slider ref={zoomSlider} {...settings}>
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img.image_url}
                                alt={product.name}
                                onClick={() => setZoomImage(img.image_url)}
                                className="zoomSliderImage"
                        
                            />
                        ))}
                    </Slider>
               
            </div>
            {/*Product Zoom code ends here*/}



            {/*Product info code starts here*/}
            <div className="col-md-7 productInfo">
                <h1>{product.name}</h1>
                <div className="productseller d-flex align-items-center mb-2">
                    <span>Sold By: <span className='text-b'>{product.shop.name}</span></span>
                </div>
                <div className="d-flex align-items center">
                    <Rating name="half-rating-read" value={averageRating} precision={0.5} readOnly />
                    {/* <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    <span className='text-light'>(32 reviews)</span> */}
                </div>

                <div className="priceSec d-flex align-items-center mb-3">
                    <span className='text-b priceLarge'>${product.price}</span>
                    <div className="ms-2 d-flex flex-column">
                        <span className='text-y'>20$ off</span>
                        <span className='text-light oldPrice'>$120</span>
                    </div>
                </div>

                <p>{product.description}</p>

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
                        <input type="number"  value={inputValue} onChange={(e) => setInputValue(parseInt(e.target.value))}/>
                        <span className='arrow plus' onClick={plus}><KeyboardArrowUpIcon/></span>
                        <span className='arrow minus' onClick={minus}><KeyboardArrowDownIcon/></span>

                    </div>

                    <Button className='addToCartBtn' onClick={()=> handleAddToCart(product)}>
                        <ShoppingCartOutlinedIcon/>Add to Cart</Button>
                    <Button className='favoriteBtn ms-4' onClick={()=> handleAddToWishlist(productId)}><FavoriteBorderOutlinedIcon/></Button>

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

                            </div>

                        }

                        {/* Additional Info
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
                        } */}

                        {/* Vendors */}
                        {
                            activeTabs===2 &&
                            <div className="tabContent pt-2">
                                <div className="row">
                                    <div className="col">
                                        <h4 className='mb-4'>About The Vendor</h4>
                                        <div className="card vendorsCard">
                                            <div className="vendorTop mb-5 ">
                                                <div className="rounded">
                                                    <img src={product.shop.logo_image_url} alt="" className='vendorImg' />
                                                </div>
                                                <div className="vendorTitle">
                                                    <NavLink><h3>{product.shop.name}</h3></NavLink>
                                                    <div className="vendorRating d-flex align-items-center">
                                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly style={{fontSize:'18px'}}/>
                                                        <span className='rating'>(32 reviews)</span>
                                                        
                                                    </div>
                                                    <NavLink to={`/my_banda/vendors/${product.shop.seller_id}`} >Go To Vendor Page</NavLink>
                                                    
                                                    
                                                </div>

                                            </div>

                                            <div className="vendorBottom">
                                                <div className="detailItem mb-2">
                                                    <span className='itemKey' style={{marginRight:"10px", fontWeight:"600"}}><AddIcCallOutlinedIcon style={{marginRight:"10px"}}/> Phone / Email: </span>
                                                    <span className='itemValue'>{product.shop.contact},  {product.shop.seller.email}</span>
                                                </div>
                                                <div className="detailItem">
                                                    <span className='itemKey' style={{marginRight:"10px", fontWeight:"600"}}><LocationOnOutlinedIcon style={{marginRight:"10px"}}/> Location:</span>
                                                    <span className='itemValue'>{product.shop.location}</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        }

                        {/*Reviews */}
                        {
                            activeTabs===3 &&
                            <div className="tabContent pt-2">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className='mb-4'>Customer Reviews</h4>
                                        {
                                            product.reviews.length === 0 ? (
                                                <h4 style={{color:"#000", opacity:"0.6", fontSize:"16px", fontWeight:"400"}}>Be the first to review this product...</h4>
                                            ) : (
                                                product.reviews.map((review, index) => (
                                                    <div className="card p-3 reviewsCard flex-row" key={index}>
                                                        <div className="image">
                                                            <div className="rounded-circle">
                                                                <img src="/userAvatar3.png" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="info ps-4">
                                                            <div className="d-flex align-items-center">
                                                                {/* <h5>{new Date(review.date).toLocaleString()}</h5> */}
                                                                <h5>{review.date.substring(0,10)}</h5>
                                                                <div className="ms-auto">
                                                                    <Rating
                                                                    
                                                                        name="half-rating-read"
                                                                        defaultValue={review.rating}
                                                                        precision={0.5}
                                                                        readOnly
                                                                        style={{ fontSize: '17px', color:"gold" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className='text-y font-weight-bold'>{review.buyer.email}</span>
                                                            <p>{review.content}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    

                                    <br />
                        

                                        <form onSubmit={handleSubmit} className='reviewForm'>
                                            <h4>Add A Review</h4>
                                            {/* <Rating name="half-rating" defaultValue={0} precision={0.5}/> */}
                                            <Rating
                                                name="rating"
                                                value={reviewInfo.rating}
                                                precision={0.5}
                                                onChange={handleRatingChange}
                                            />
                                            <div className="form-group pt-3">
                                                <textarea 
                                                className='form-control' 
                                                name="content" 
                                                valie={reviewInfo.content} 
                                                onChange={handleChange}
                                                placeholder='Write a Review'></textarea>
                                            </div>

                                            {/* <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text" className='form-control' placeholder='Username'/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="date" className='form-control'/>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="form-group mt-4">
                                                <Button onClick={handleSubmit}>Submit Review</Button>
                                            </div>
                                            
                                        </form>
                                    </div>


                                    <div className="col-md-4 ps-3">
                                        <h4>Average Reviews</h4>
                                        <div className="d-flex align-items-center mt-3 mb-3">
                                            <Rating name="half-rating-read" value={averageRating} precision={0.5} readOnly />
                                            <strong className='ms-3'>{averageRating.toFixed(1)} out of 5</strong>
                                    
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
                {/*
                <div className="relatedProducts pt-5 pb-4">
                    <h2 className='mb-4 mt-0'>Similar Products</h2>
                    <Slider {...related} className='productSlider'>
                        <div className="item">
                            {/*<HomeProduct />*}
                        </div>
                        <div className="item">
                            {/*<HomeProduct />*}
                        </div>
                        <div className="item">
                            {/*<HomeProduct />*}
                        </div>
                        <div className="item">
                            {/*<HomeProduct />*}
                        </div>
                        <div className="item">
                            {/*<HomeProduct />*}
                        </div>
                        <div className="item">
                            {/*<HomeProduct />*}
                        </div>
                        
                            
                    </Slider>
                </div>*/}


            </div>
        </section>
    )
}

export default ProductDetails