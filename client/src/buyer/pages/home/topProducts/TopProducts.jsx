// import './topProducts.css'
// import { NavLink } from 'react-router-dom'
// import Rating from '@mui/material/Rating';


// function TopProducts(title){
//     return(
//         <>
//         <div className="topSellingBox">
//             <h3>{title.title}</h3>

//             <div className="items d-flex align-items-center">
//                 <div className="img">
//                     {/*wrap image in navlink?*/}
//                     <img src="./phone.png" alt="" className='w-100'/>

//                 </div>

//                 <div className="info px-3">
//                     <NavLink to=""><h4>Lorem ipsum dolor sit amet amet</h4></NavLink>
//                     <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
//                     <div className="d-flex align-items-center">
//                         <span className='price'>$80</span><span className='oldPrice'>$150</span>
//                     </div>

//                 </div>
//             </div>

//             <div className="items d-flex align-items-center">
//                 <div className="img">
//                     {/*wrap image in navlink?*/}
//                     <img src="./phone.png" alt="" className='w-100'/>

//                 </div>

//                 <div className="info px-3">
//                     <NavLink to=""><h4>Lorem ipsum dolor sit amet amet</h4></NavLink>
//                     <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
//                     <div className="d-flex align-items-center">
//                         <span className='price'>$80</span><span className='oldPrice'>$150</span>
//                     </div>

//                 </div>
//             </div>

//             <div className="items d-flex align-items-center">
//                 <div className="img">
//                     {/*wrap image in navlink?*/}
//                     <img src="./phone.png" alt="" className='w-100'/>

//                 </div>

//                 <div className="info px-3">
//                     <NavLink to=""><h4>Lorem ipsum dolor sit amet amet</h4></NavLink>
//                     <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
//                     <div className="d-flex align-items-center">
//                         <span className='price'>$80</span><span className='oldPrice'>$150</span>
//                     </div>

//                 </div>
//             </div>
//         </div>
//         </>

//     )
// }

// export default TopProducts

import './topProducts.css'
import { NavLink } from 'react-router-dom'
import Rating from '@mui/material/Rating';

function TopProducts({ title, tag, products }) {
    // Filter the products based on the tag
    const filteredProducts = products.filter(product => product.tag === tag);

    return (
        <div className="topSellingBox">
            <h3>{title}</h3>

            {filteredProducts.map(product => (
                <div className="items d-flex align-items-center" key={product.id}>
                    <div className="img">
                        <NavLink to={`/product/${product.id}`}>
                            <img src={product.images[0].image_url} alt={product.name} className='w-100'/>
                        </NavLink>
                    </div>
                    <div className="info px-3">
                        <NavLink to={`/product/${product.id}`}>
                            <h4>{product.name}</h4>
                        </NavLink>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <span className='price'>ksh.{product.price}</span>
                            {/* {product.oldPrice && <span className='oldPrice'>${product.oldPrice}</span>} */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TopProducts;
