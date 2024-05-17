import './carousel.css'
import Slider from 'react-slick'
import { useState } from 'react';

function Carousel(){

    const[itemBg, setItemBg] = useState([
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#ecffec',
        '#fffceb',
        '#ecffec',
        '#feefea',
       
    ])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1, 
        fade: false,
        arrows: true,
        autoplay: 2000,
        centerMode: true
    };

    return(
        <>
        <div className="catSliderSection">
            <div className="container-fluid">
                <h2 className='hd'>Featured Categories</h2>
                <Slider {...settings} className='cat_slider_main'>
                    {
                        itemBg.length!== 0 && itemBg.map((item, index) => {
                            return(
                                <div className="item" key={index}>
                                    <div className="info"  style={{background:item}}>
                                        <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                                        <h5>Electronics</h5>
                                        <p>26 items</p>
                                    </div>
                                </div>

                            )
                        })
                    }
                    {/*
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img src="/phone.png" alt="" style={{height:'80px', width:'80px'}}/>
                            <h5>Electronics</h5>
                            <p>26 items</p>
                        </div>
                </div>*/}

                </Slider>

            </div>
        </div>


        </>
    )
}

export default Carousel