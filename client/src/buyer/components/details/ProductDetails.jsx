import './productDetails.css'
import {NavLink} from 'react-router-dom'
import { useRef, useState} from 'react';
import Slider from 'react-slick'
import Rating from '@mui/material/Rating';

/*import ReactImageZoom from 'react-image-zoom';*/
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

function ProductDetails(){

    const [zoomImage, setZoomImage] = useState("/shoes.png" )

    const [bigImageSize, setBigImageSize] = useState([1500, 1500])
    const [smlImageSize, setSmlImageSize] = useState([150, 150])

    const zoomSlider = useRef()

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1, 
        fade: false,
        arrows: true,
        autoplay: 2000,
      
    };

    const goto=(url)=>{
        setZoomImage(url)
    }

    return(
        <section className='detailsPage'>
            <div className="breadcrumbWrapper mb-4">
                <div className="container-fluid">
                    <ul className='breadcrumb breadcrumb2 mb-0'>
                        <li><NavLink to='/buyer'>Home</NavLink></li>
                        <li><NavLink to='/buyer/products'>Products</NavLink></li>
                        <li>Product Details</li>
                    </ul>

                </div>
            </div>
            <div className="container-fluid detailsContainer">
                <div className="row pt-1 pb-3">
                    {/*Product description code*/}
                    <div className="col-md-9 leftPart">
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
                                        onClick={() => goto("/shoes2.png")}/>
                                    </div>
                                    <div className="item">
                                        <img src="/shoes2.png" alt="" className='w-100' 
                                        onClick={() => goto(1)}/>
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

                            </div>
                        </div>

                    </div>

                    <div className="col-md-3 rightPart">
                        RIGHT

                    </div>
                </div>

            </div>
        </section>
    )
}

export default ProductDetails