import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Tooltip from '@mui/material/Tooltip';

import './homeProduct.css'
import { NavLink } from "react-router-dom"

function HomeProduct(props){
    return(
        <div className="productThumb">
            {
                props.tag!==null && props.tag!==undefined &&
                <span className={`badge ${props.tag}`}>{props.tag}</span>
            }
            
            <NavLink>
                <div className="imgWrapper">
                    <img src="/shoes2.png" alt="" className='w-100'/>
                    <div className="overlay transition">
                        <ul className='list list-inline mb-0'>
                            <li className='list-inline-item'>
                                
                                    <NavLink className='cursor' tooltip="Add to Wishlist!"><FavoriteBorderOutlinedIcon/></NavLink>
                                
                            </li>
                            <li className='list-inline-item'>
                                <NavLink className='cursor' tooltip="Compare"><CompareArrowsOutlinedIcon/></NavLink>
                            </li>
                            <li className='list-inline-item'>
                                <NavLink className='cursor' tooltip="Quick View"><RemoveRedEyeOutlinedIcon/></NavLink>
                            </li>
                        </ul>

                    </div>
                </div>
               
            </NavLink>
            
            <div className="info">
                <span className='d-block catName'>Shoes</span>
                <h4 className='title'>Nike Sneaker Shoe, Outdoor Running </h4>
                <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                <span className='d-block brand'>By <NavLink href="">Lorem</NavLink></span>

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <span className='price'>$80</span><span className='oldPrice'>$150</span>
                    </div>
                    <Button className='ms-auto transition'><ShoppingCartOutlinedIcon/>Add</Button>
                </div>
            </div>
        </div>
    )
}

export default HomeProduct