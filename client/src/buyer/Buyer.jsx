import { Route, Routes } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom"
import BuyerHome from "./pages/home/BuyerHome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setProducts } from "../redux/productSlice"; 
import axios from 'axios'
import './responsive.css'

function Buyer(){
    const location = useLocation()

    const dispatch = useDispatch();

    const renderHomePage = location.pathname === '/my_banda';

    const [productData, setProductData] = useState([]);
    

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/products")
          .then(resp => resp.json())
          .then((data) => {
            //console.log("from buyer",data)
            setProductData(data)
            dispatch(setProducts(data));
          })
          .catch(error => {
            console.error('Error fetching products data:', error);
          });
    }, [dispatch]);

    console.log("setProductData", productData)

    return(
        productData.length !== 0 &&
        <div className="buyerSide">
           
            <Header data={productData}/>
            {renderHomePage && <BuyerHome data={productData}/>}
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Buyer 