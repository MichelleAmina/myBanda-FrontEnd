import './banners.css'
import Button from '@mui/material/Button';

function Banners(){
    return(
        <div className="bannerSection">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="box">
                            <img src="/banner1.jpeg" alt="" className='w-100 transition'/>
                            <div className="bannerInfo">
                                <h3>Lorem ipsum</h3>
                                <Button>View Shop</Button>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="box">
                            <img src="/banner2.jpeg" alt="" className='w-100 transition'/>
                            <div className="bannerInfo">
                                <h3>Dolor sit</h3>
                                <Button>View Shop</Button>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="box">
                            <img src="/banner1.jpeg" alt="" className='w-100 transition'/>
                            <div className="bannerInfo">
                                <h3>Amet consectetur.</h3>
                                <Button>View Shop</Button>
                            </div>
                        </div>
                        
                    </div>


                 
                </div>
            </div>
        </div>
    )
}

export default Banners
