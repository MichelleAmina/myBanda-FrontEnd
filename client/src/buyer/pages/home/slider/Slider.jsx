import './slider.css'
import Slider from 'react-slick'
import Button from '@mui/material/Button';

import Newsletter from '../../../components/newsletter/Newsletter';

function HomeSlider(){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, 
        fade: true,
        arrows: true
    };

    return(
        <section className='homeSlider'>
            <div className="container-fluid position-relative">
            <Slider {...settings} className='home_slider_main'>
                <div className="sliderItem">
                    <img src="/slider1.jpg" alt="" className='w-100' style={{height:'500px'}}/>
                    <div className="sliderInfo">
                        <h2 className="mb-4">
                            Exclusive collections,<br/>
                            just for you
                        </h2>
                        <p>Subscribe for firsthand deals</p>
                    </div>
                </div>
                <div className="sliderItem">
                    <img src="/slider2.jpg" alt="" className='w-100' style={{height:'500px'}}/>
                    <div className="sliderInfo">
                        <h2 className="mb-3">
                            From our store<br/>
                            to your door
                        </h2>
                        <p>Sit back and let MyHandle it</p>
                    </div>
                </div>
                
                
            </Slider>

            <Newsletter/>

            </div>
        </section>

    )
}

export default HomeSlider