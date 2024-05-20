import './vendors.css'

function Vendors(){
    return(
        <div className="vendors mb-5">
            <div className="vendorWrapper"  style={{background:"red"}}>
                <div className="container-fluid">
                        <div className="vendorBanner"  >
                            <img src="/bluebanner3.jpeg" alt="" className='w-100'/>
                            <div className="vendorLogo">
                                <img src="/sale1.jpeg" alt="" />
                            </div>
                        </div>


                </div> 
                <br />
               
            </div>

            <div className="container-fluid">
                <div className="vendorDetails">
                    <div className="vendorInfo">
                        Info
                    </div>
                </div>

                <div className="vendoProducts">
                    Products
                </div>   

            </div>
            
            
                

            

            
        </div>
    )
}


export default Vendors