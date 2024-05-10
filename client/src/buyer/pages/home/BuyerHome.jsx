import './buyerHome.css'
import HomeSlider from './slider/Slider'
import Carousel from '../../components/carousel/Carousel'
import Banners from '../../components/banners/Banners'
import HomeProduct from '../../components/product/HomeProduct'

function BuyerHome(){
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
            <section className='homeProducts pt-0'>
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
                    <div className="row">
                        <div className="col-md-4">
                            <img src="/sale2.jpeg" alt="" className='w-100'/>
                        </div>
                    </div>

                    
                    
                </div>
            </section>

            <br /> <br /> <br /> <br /> <br /> <br /> <br />



        </div>
    )
}

export default BuyerHome