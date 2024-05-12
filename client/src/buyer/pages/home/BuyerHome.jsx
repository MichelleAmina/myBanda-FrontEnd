import './buyerHome.css'
import HomeSlider from './slider/Slider'
import Carousel from '../../components/carousel/Carousel'
import Banners from '../../components/banners/Banners'
import HomeProduct from '../../components/product/HomeProduct'
import Slider from 'react-slick'
import TopProducts from './topProducts/TopProducts'
import Newsletter from '../../components/newsletter/Newsletter'

function BuyerHome(){

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1, 
        fade: false,
        arrows: true,
        autoplay: 3000,
       
    };

    return(
        <div>
            <HomeSlider/>
            <Carousel/>
            <Banners/>

            <section className='homeProducts'>
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                     <h2 className='hd mb-0 mt-0'>Popular Products</h2>
                     {/*ml-auto switched to ms-auto*/}
                     <ul className='list list-inline ms-auto filterTab mb-0'>
                        <li className='list-inline-item'>
                            <a className='cursor'>All</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Electronics</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Clothing</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Beauty</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Home Goods</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Outdoor</a>
                        </li>
                     </ul>
                    </div>

                    {/*product displays start here*/}
                    <div className="productRow">
                        <div className="item">
                            <HomeProduct tag="sale"/>
                        </div>
                        <div className="item">
                            <HomeProduct  tag="hot"/>
                        </div>
                        <div className="item">
                            <HomeProduct  tag="new"/>
                        </div>
                        <div className="item">
                            <HomeProduct  tag="hot"/>
                        </div>
                        <div className="item">
                            <HomeProduct />
                        </div>
                        <div className="item">
                            <HomeProduct  tag="new"/>
                        </div>
                        <div className="item">
                            <HomeProduct  tag="best"/>
                        </div>
                        <div className="item">
                            <HomeProduct  tag="hot"/>
                        </div>
                        <div className="item">
                            <HomeProduct/>
                        </div>
                        <div className="item">
                            <HomeProduct/>
                        </div>
                        <div className="item">
                            <HomeProduct  tag="best"/>
                        </div>
                        <div className="item"  tag="hot">
                            <HomeProduct/>
                        </div>
                    </div>
                </div>
            </section>


            {/* second product displays start here*/}
            <section className='homeProducts homeProductsRow2 pt-0'>
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                     <h2 className='hd mb-0 mt-0'>Daily Best Sales</h2>
                     {/*ml-auto switched to ms-auto*/}
                     <ul className='list list-inline ms-auto filterTab mb-0'>
                        <li className='list-inline-item'>
                            <a className='cursor'>Featured</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Popular</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>New</a>
                        </li>
                        
                     </ul>
                    </div>
                    {/*remove second br*/}
                    <br /><br />
                    <div className="row">
                        <div className="col-md-3 pr-5">
                            <img src="/sale2.jpeg" alt="" className='w-100'/>
                        </div>

                        <div className="col-md-9">
                        <Slider {...settings} className='productSlider'>
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

                    
                    
                </div>
            </section>

            <section className='topProductsSection'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <TopProducts title="Top Selling"/>

                        </div>

                        <div className="col">
                            <TopProducts title="Trending Products"/>
                            
                        </div>

                        <div className="col">
                            <TopProducts title="Recently Added"/>
                            
                        </div>

                        <div className="col">
                            <TopProducts title="Top Rated"/>
                            
                        </div>
                    </div>
                </div>
            </section>

                {/*choose if i want to move this to footer section*/}
            <section className='newsLetterSection'>
                <div className="container-fluid">
                    <div className="box d-flex align-items-center">
                        <div className="info">
                            <h2>Lorem ipsum dolor sit amet <br/>
                            consectetur adipis</h2>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <br />
                            <Newsletter/>
                        </div>

                        <div className="img">
                            <img src="./deliveryman.png" alt="" className='w-100'/>
                        </div>
                    </div>
                </div>
            </section>

                {/*insert footer section in Buyer.jsx file*/}
            <br /> <br /> <br /> <br /> <br /> <br /> <br />



        </div>
    )
}

export default BuyerHome