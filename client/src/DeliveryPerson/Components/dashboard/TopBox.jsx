// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
// import "./driverAnalytics.css";

// function driverAnalytics() {

//     // Data for day vs earnings
//     const dailyData = [
//         { day: 'Monday', earnings: 150 },
//         { day: 'Tuesday', earnings: 200 },
//         { day: 'Wednesday', earnings: 250 },
//         { day: 'Thursday', earnings: 220 },
//         { day: 'Friday', earnings: 300 },
//         { day: 'Saturday', earnings: 400 },
//         { day: 'Sunday', earnings: 350 },
//     ];

//     // Data for month vs earnings
//     const monthlyData = [
//         { month: 'January', earnings: 3200 },
//         { month: 'February', earnings: 2800 },
//         { month: 'March', earnings: 3400 },
//         { month: 'April', earnings: 3000 },
//         { month: 'May', earnings: 3600 },
//         { month: 'June', earnings: 3300 },
//         { month: 'July', earnings: 3900 },
//         { month: 'August', earnings: 4000 },
//         { month: 'September', earnings: 3100 },
//         { month: 'October', earnings: 3700 },
//         { month: 'November', earnings: 3500 },
//         { month: 'December', earnings: 4200 },
//     ];

//     // Data for deliveries by driver
//     const driverData = [
//         { name: 'Aaron(You)', deliveries: 30 },
//         { name: 'Moses', deliveries: 25 },
//         { name: 'Peter', deliveries: 20 },
//         { name: 'James', deliveries: 15 },
//     ];

//     const colors = ['#0A205A', '#00C49F', '#FFD700', '#FF8042'];

//     return (
//         <main className='deliveryAnalytics-container'>
            {/* <div className='chart-row'>
                <div className='deliverytable-container'>
                    <h2>Best Performing Drivers</h2>
                    <p>Top drivers based on the number of deliveries made in the last week.</p>
                    <table className='driver-table'>
                        <thead>
                            <tr>
                                <th>Driver</th>
                                <th>Deliveries</th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverData.map((driver, index) => (
                                <tr key={index}>
                                    <td>{driver.name}</td>
                                    <td>{driver.deliveries}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='chart-container'>
                        <h2>Deliveries made by Drivers in the last week</h2> 
                     <p>A pie chart representation of the number of deliveries made by each driver.</p> 
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={driverData}
                                dataKey="deliveries"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {driverData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div> */}

            {/* <div className='row'>
                <div className='single-chart-container'>
                    <h2>Daily Earnings</h2>
                    <p>Bar chart showing daily earnings for the past week.</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={dailyData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="earnings" fill="#FFD700" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='row'>
                <div className='single-chart-container'>
                    <h2>Monthly Earnings</h2>
                    <p>Line chart showing monthly earnings for the past year.</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={monthlyData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="earnings" stroke="#FFD700" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </main>
    );
}

export default driverAnalytics; */}


import React from 'react';
import "./driverAnalytics.css";
import { topCustomers } from '../../../data';

function TopBox() {
    return (
        <div className='topBox'>
            <h3>Best Customers</h3>
            <div className='best-customers'>
                {topCustomers.map(user=>(
                    <div className="best-listItem" key={user.id}>
                        <div className="best-cust">
                        <img src={user.img} alt="" />
                        <div className="userTexts">
                            <span className="customer-username">{user.username}</span>
                            <span className="customer-email">{user.email}</span>
                        </div>
                        </div>
                        <span className="customer-amount">${user.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopBox;