import './topProducts.css'
import { NavLink } from 'react-router-dom'
import Rating from '@mui/material/Rating';


function TopProducts(props){
    return(
        <>
        <div className="topSellingBox">
            <h3>{props.title}</h3>

            <div className="items d-flex align-items-center">
                <div className="img">
                    {/*wrap image in navlink?*/}
                    <img src="./phone.png" alt="" className='w-100'/>

                </div>

                <div className="info px-3">
                    <NavLink to=""><h4>Lorem ipsum dolor sit amet amet</h4></NavLink>
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    <div className="d-flex align-items-center">
                        <span className='price'>$80</span><span className='oldPrice'>$150</span>
                    </div>

                </div>
            </div>

            <div className="items d-flex align-items-center">
                <div className="img">
                    {/*wrap image in navlink?*/}
                    <img src="./phone.png" alt="" className='w-100'/>

                </div>

                <div className="info px-3">
                    <NavLink to=""><h4>Lorem ipsum dolor sit amet amet</h4></NavLink>
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    <div className="d-flex align-items-center">
                        <span className='price'>$80</span><span className='oldPrice'>$150</span>
                    </div>

                </div>
            </div>

            <div className="items d-flex align-items-center">
                <div className="img">
                    {/*wrap image in navlink?*/}
                    <img src="./phone.png" alt="" className='w-100'/>

                </div>

                <div className="info px-3">
                    <NavLink to=""><h4>Lorem ipsum dolor sit amet amet</h4></NavLink>
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    <div className="d-flex align-items-center">
                        <span className='price'>$80</span><span className='oldPrice'>$150</span>
                    </div>

                </div>
            </div>
        </div>
        </>

    )
}

export default TopProducts