import React from 'react';
import DeliverySidebar from '../Components/deliverysidebar';
import DeliveryNavbar from '../Components/DeliveryNavbar';
import Widget from '../Components/dashboard/Widgets';
import TopBox from '../Components/dashboard/TopBox';
import BarChartBox from '../Components/dashboard/BarChart';
import PieChartBox from '../Components/dashboard/Piechart';
import DailyEarningsChart from '../Components/dashboard/Linechart';
import './deliveryAnalytics.css';



const DeliveryDriverAnalytics = () => {

    const dailyDriverSelectionData = [
        { name: 'Monday', selections: 30 },
        { name: 'Tuesday', selections: 45 },
        { name: 'Wednesday', selections: 50 },
        { name: 'Thursday', selections: 40 },
        { name: 'Friday', selections: 60 },
        { name: 'Saturday', selections: 70 },
        { name: 'Sunday', selections: 55 },
    ];

    const monthlyRevenueData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4000 },
        { name: 'May', revenue: 6000 },
        { name: 'Jun', revenue: 7000 },
        { name: 'Jul', revenue: 8000 },
        { name: 'Aug', revenue: 5000 },
        { name: 'Sep', revenue: 6000 },
        { name: 'Oct', revenue: 7000 },
        { name: 'Nov', revenue: 8000 },
        { name: 'Dec', revenue: 9000 },
    ];


    return ( 
        <div className='driver-analytics'>
            <DeliverySidebar />
            <div className='driver-analytics-content'>
                <DeliveryNavbar />
                <div className="delivery-analytics-container">
                    <div className="box box1">
                        <TopBox />
                    </div>
                    <div className="box box2">
                    <Widget type="Available deliveries" />
                    </div>
                    <div className="box box3">
                        <Widget type="Completed deliveries" />
                    </div>
                    <div className="box box4">
                        <PieChartBox />
                    </div>
                    <div className="box box5">
                        <Widget type="Earnings" />
                    </div>
                    <div className="box box6">
                        <Widget type="Pending deliveries" />  
                    </div>
                    <div className="box box7"><DailyEarningsChart /></div>
                    <div className="box box8">
                        <BarChartBox
                                title="Daily Driver Selections"
                                color="#8884d8"
                                dataKey="selections"
                                chartData={dailyDriverSelectionData}
                            />
                    </div>
                    <div className="box box9">
                        <BarChartBox
                                title="Monthly Revenue"
                                color="#FFD700"
                                dataKey="revenue"
                                chartData={monthlyRevenueData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DeliveryDriverAnalytics;
