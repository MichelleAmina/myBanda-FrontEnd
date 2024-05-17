import React from 'react';
import DeliverySidebar from '../Components/deliverysidebar';
import DeliveryNavbar from '../Components/DeliveryNavbar';
import Widget from '../Components/Widgets';
import DriverAnalytics from '../Components/driverAnalytics';
import './deliveryAnalytics.css';

const DeliveryDriverAnalytics = () => {
    return ( 
        <div className='driver-analytics'>
            <DeliverySidebar />
            <div className='driver-analytics-content'>
                <DeliveryNavbar />
                <div className='widgets'>
                    <Widget type="Available deliveries"/>
                    <Widget type="Completed deliveries"/>
                    <Widget type="Pending deliveries"/>
                    <Widget type="Earnings"/>
                    {/* <Widget type="Wallet"/> */}
                </div>
                <div className='driver-analytics-chart'>
                    <DriverAnalytics />
                </div>
            </div>
        </div>
    );
}
 
export default DeliveryDriverAnalytics;
