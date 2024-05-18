import AdminChart from '../../components/charts/AdminChart'
import AdminTable from '../../components/table/AdminTable'
import './single.scss'

function Single(){
    return(
        <div className='adminSingle'>
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Shop Information</h1>
                        <div className="item">
                            <img src="/sale1.jpeg" alt="" className="itemImg" />
                            <div className="details">
                                <h2 className="itemTitle">Shop93</h2>
                                <div className="itemDescription">
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, tenetur?</p>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Email:</span>
                                    <span className='itemValue'>shop93@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Phone:</span>
                                    <span className='itemValue'>+21492104273</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Location:</span>
                                    <span className='itemValue'>Taiwan</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Total Products:</span>
                                    <span className='itemValue'>100</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="right">
                        <AdminChart aspect={3 / 1} title="Sales (Last 6 Months)"/>

                    </div>
                </div>


                <div className="bottom">
                <h1 className="title" style={{fontSize:"20px"}}>Previous Sales</h1>
                    <AdminTable/>
                </div>
            </div>
        </div>
    )
}

export default Single