import './buyerHome.css'
import HomeSlider from './slider/Slider'
import Carousel from '../../components/carousel/Carousel'
import Banners from '../../components/banners/Banners'
import HomeProduct from '../../components/product/HomeProduct'
import Slider from 'react-slick'
import TopProducts from './topProducts/TopProducts'
import Newsletter from '../../components/newsletter/Newsletter'
import { useEffect, useState } from 'react'

function BuyerHome(props){

     // All the data 
     const [prodData, setProdData] = useState(props.data)
     // All the categories appearing only once 
     const [categories, setCategories] = useState([])
     const [activeCategory, setActiveCategory] = useState()
     // Highlight index of active tab/category 
     const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
     const [activeCategoryData, setActiveCategoryData] = useState([])

    
 
 
     const categoryImages = {
         homedecor: "/home-decor.png",
         appliances: "/appliances.png",
         toolsandhardware: "/tools.png",
         clothing: "/clothing.png",
         accessories: "/jewelry.png",
         beautyandskincare: "/skin-care.png",
         outdoorgear: "/outdoor-gear.png",
         electronics: "/electronics.png",
         healthandwellness: "/spa.png",
         toysandgames: "/toys.png",
         booksandstationary: "/stationary.png",
         foodandbeverages: "/fast-food.png",
     };
 
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
 
 
     useEffect(() => {
         if (prodData.length !== 0) {
             const uniqueCategories = new Set(prodData.map(item => item.category));
             setCategories([...uniqueCategories]);
             setActiveCategory([...uniqueCategories][0]);
         }
     }, [prodData]);
     
     //console.log("active category data", activeCategoryData)
 
     useEffect(() => {
         if (activeCategory) {
             const filteredData = prodData.filter(item => item.category === activeCategory);
             setActiveCategoryData(filteredData);
         }
     }, [activeCategory, prodData]);



    return(
        <div>
            <HomeSlider/>
            <Carousel categories={categories} categoryImages={categoryImages}/>
            <Banners data={prodData}/>


            <section className='homeProducts'>
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                     <h2 className='hd mb-0 mt-0'>Popular Products</h2>
                    
                     <ul className='list list-inline ms-auto filterTab mb-0'>
                        {
                            categories.length !== 0 &&
                            categories.slice(0,6).map((category, index) => {
                                return (
                                    <li className='list list-inline-item' key={index}>
                                        <a className={`cursor text-capitalize ${activeCategoryIndex === index ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveCategoryIndex(index);
                                            setActiveCategory(categories[index]);
                                        }}>
                                            {category}
                                        </a>
                                    </li>
                                )
                            })
                        }
                     </ul>
                    </div>

                    {/*product displays start here*/}
                    <div className="productRow">
                        {
                            activeCategoryData.length !== 0 &&
                            activeCategoryData.map((item) => (
                                <div className="item" key={item.id}>
                                    <HomeProduct item={item} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* second product displays start here*/}
            <section className='homeProducts homeProductsRow2 pt-0'>
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                     <h2 className='hd mb-0 mt-0'>Daily Best Sales</h2>
                     <ul className='list list-inline ms-auto filterTab mb-0'>
                        <li className='list-inline-item'>
                            <a className='cursor'>Hot</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>Popular</a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='cursor'>New</a>
                        </li>
                     </ul>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-3 pr-5 saleImage">
                            <img src="/sale2.jpeg" alt="" className='w-100'/>
                        </div>
                        <div className="col-md-9">
                            <Slider {...settings} className='productSlider'>
                                {
                                    prodData.filter(item => item.tag === "popular" || item.tag === "new").map((item) => (
                                        <div className="item" key={item.id}>
                                            <HomeProduct item={item} />
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>


            

            <section className='topProductsSection'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <TopProducts title="Top Selling" tag="hot" products={prodData} />
                        </div>

                        <div className="col">
                            <TopProducts title="Trending Products" tag="popular" products={prodData} />
                        </div>
                                                    
                        {/* <div className="col">
                            <TopProducts title="Recently Added" tag="recent" products={prodData} />
                        </div> */}
                        
                        <div className="col">
                            <TopProducts title="Top New" tag="new" products={prodData} />
                        </div>
                        
                        
                    </div>
                </div>
            </section>

                {/*choose if i want to move this to footer section*/}
            <section className='newsLetterSection'>
                <div className="container-fluid">
                    <div className="box d-flex align-items-center">
                        <div className="info">
                            <h2>Experience the best in online <br/>
                             shopping today</h2>
                            <p>Enjoy fast and reliable delivery on every order.</p>
                            <br />
                            <Newsletter/>
                        </div>

                        <div className="img">
                            <img src="/deliveryman.png" alt="" className='w-100'/>
                        </div>
                    </div>
                </div>
            </section>

                {/*insert footer section in Buyer.jsx file*/}
            <br /> 



        </div>
    )
}

export default BuyerHome