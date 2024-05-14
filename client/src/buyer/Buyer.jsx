import { Route, Routes } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom"
import BuyerHome from "./pages/home/BuyerHome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


function Buyer(){
    const location = useLocation()

    const renderHomePage = location.pathname === '/buyer';

    return(
        <div>
            <Header/>
            {renderHomePage && <BuyerHome/>}
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Buyer 