import { Button, PopoverPaper, dividerClasses } from '@mui/material';
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Tooltip from '@mui/material/Tooltip';

import './homeProduct.css'
import { NavLink } from "react-router-dom"
import { useState, useEffect } from 'react';

/*
{
                props.tag !== null && props.tag !== undefined &&
                <span className={`badge ${props.tag}`}>{props.tag}</span>
            }
            */

function HomeProduct({item}){
    //console.log("props item image_url", props.item.images[0]?.image_url)

    const [products, setProducts] = useState()

    useEffect(() => {
        setProducts(item)
    })

    // Shorted length of product description
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    const imageUrl = item.images[0].image_url;


    

    return(
        <div className='productContainer'>
             <div className="productThumb" style={{minHeight:'350px'}}>
            
            {
                products !== undefined &&
                <>
                <NavLink to={`/my_banda/products/${item.id}`}>
                    <div className="imgWrapper">
                        <img src={imageUrl} alt="" className='w-100'/>
                        <div className="overlay transition">
                            <ul className='list list-inline mb-0'>
                                <li className='list-inline-item'>
                                    <NavLink className='cursor' tooltip="Add to Wishlist!"><FavoriteBorderOutlinedIcon/></NavLink>   
                                </li>
                                <li className='list-inline-item'>
                                    <NavLink className='cursor' tooltip="Compare"><CompareArrowsOutlinedIcon/></NavLink>
                                </li>
                                <li className='list-inline-item'>
                                    <NavLink to={`/my_banda/products/${item.id}`} className='cursor' tooltip="Quick View"><RemoveRedEyeOutlinedIcon/></NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
               
                </NavLink>
            
                <div className="info">
                    <span className='d-block catName'>{item.category}</span>
                    <h4 className='title'>{truncateText(item.description, 50)}</h4>
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    <span className='d-block brand'>By <NavLink href="">{item.shop.name}</NavLink></span>

                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <span className='price'>{item.price}</span><span className='oldPrice'>$150</span>
                        </div>
                        <Button className='ms-auto transition'><ShoppingCartOutlinedIcon/>Add</Button>
                    </div>
                </div>
                </>
            }
            
            
        </div>

        </div>

       
    )
}

export default HomeProduct