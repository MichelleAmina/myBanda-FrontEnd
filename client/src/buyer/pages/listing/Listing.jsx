import './listing.css'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import HomeProduct from '../../components/product/HomeProduct'

import { Button } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

function Listing(){

    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [isOpenDropdown2, setIsOpenDropdown2] = useState(false)


    return(
        <div>
            <section className='listingPage'>
                <div className="container-fluid">
                    <div className="breadcrumb flex-column">
                        <h1>Product Listing</h1>
                        <ul className='list list-inline'>
                            <li className='list-inline-item'>
                                <NavLink to='/buyer'>Home</NavLink>
                                
                            </li>
                            <li className='list-inline-item'>
                                <NavLink to='/buyer/products'>Products</NavLink>  
                            </li>
                        </ul>
                    </div>

                    <div className="listingData">
                        <div className="row">
                            <div className="col-md-3 sidebarWrapper">
                                <Sidebar/>
                            </div>
                            {/*div was initially named homeProducts*/}
                            <div className="col-md-9 rightContent homeProducts pt-0">
                                <div className="topStrip d-flex align-items-center">
                                    <p className='mb-0'>We found <span>29</span> items for you</p>
                                    <div className="ms-auto d-flex align-items-center">
                                        <div className="tab_ position-relative">
                                            {/*selects might be better for these features*/}
                                            <Button className='btn_' onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                                                <GridViewOutlinedIcon/>
                                                Show: 50
                                            </Button>
                                            { isOpenDropdown !== false &&
                                            
                                                <ul className='dropdownMenu'>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>50</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>100</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>150</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>200</Button></li>
                                                    <li><Button className='align-items-center' onClick={()=>setIsOpenDropdown(false)}>All</Button></li>
                                                </ul>
                                            }
                                        </div>
                                        <div className="tab_ ms-3 position-relative">
                                            <Button className='btn_' onClick={()=>setIsOpenDropdown2(!isOpenDropdown2)}>
                                                <TuneOutlinedIcon/>
                                                Sort By:
                                            </Button>
                                            { isOpenDropdown2 !== false &&
                                            
                                            <ul className='dropdownMenu'>
                                                <li><Button className='align-items-center'>Featured</Button></li>
                                                <li><Button className='align-items-center'>Price: Low to High</Button></li>
                                                <li><Button className='align-items-center'>Price: High to Low</Button></li>
                                                <li><Button className='align-items-center'>Highest Rating</Button></li>
                                            </ul>
                                        }
                                        </div>

                                    </div>

                                </div>

                                <div className="productRow ps-4">
                                    <div className="item">
                                        <HomeProduct tag="best"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct tag="best"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct />
                                    </div>
                                    <div className="item">
                                        <HomeProduct />
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct tag="hot"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct tag="new"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct  tag="sale"/>
                                    </div>
                                    <div className="item ">
                                        <HomeProduct tag="hot"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct  tag="sale"/>
                                    </div>
                                    <div className="item ">
                                        <HomeProduct tag="new"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct tag="new"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct tag="sale"/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>
                                    <div className="item">
                                        <HomeProduct/>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Listing