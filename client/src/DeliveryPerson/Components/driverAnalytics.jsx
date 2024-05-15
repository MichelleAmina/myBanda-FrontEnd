import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import "./driverAnalytics.css";

function driverAnalytics() {

    // Data for day vs earnings
    const dailyData = [
        { day: 'Monday', earnings: 150 },
        { day: 'Tuesday', earnings: 200 },
        { day: 'Wednesday', earnings: 250 },
        { day: 'Thursday', earnings: 220 },
        { day: 'Friday', earnings: 300 },
        { day: 'Saturday', earnings: 400 },
        { day: 'Sunday', earnings: 350 },
    ];

    // Data for month vs earnings
    const monthlyData = [
        { month: 'January', earnings: 3200 },
        { month: 'February', earnings: 2800 },
        { month: 'March', earnings: 3400 },
        { month: 'April', earnings: 3000 },
        { month: 'May', earnings: 3600 },
        { month: 'June', earnings: 3300 },
        { month: 'July', earnings: 3900 },
        { month: 'August', earnings: 4000 },
        { month: 'September', earnings: 3100 },
        { month: 'October', earnings: 3700 },
        { month: 'November', earnings: 3500 },
        { month: 'December', earnings: 4200 },
    ];

    // Data for deliveries by driver
    const driverData = [
        { name: 'YOU', deliveries: 30 },
        { name: 'Driver B', deliveries: 25 },
        { name: 'Driver C', deliveries: 20 },
        { name: 'Driver D', deliveries: 15 },
    ];

    const colors = ['#0A205A', '#00C49F', '#EBC606', '#FF8042'];

    return (
        <main className='main-container'>
            <div className='charts'>
                <h2>Daily Earnings</h2>
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
                        <Bar dataKey="earnings" fill="#EBC606" />
                    </BarChart>
                </ResponsiveContainer>

                <h2>Monthly Earnings</h2>
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
                        <Line type="monotone" dataKey="earnings" stroke="#0A205A" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

                <h2>Deliveries made by Drivers in the last week</h2>
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
        </main>
    );
}

export default driverAnalytics;