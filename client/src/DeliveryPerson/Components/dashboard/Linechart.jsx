import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './bigChartBox.css';

const dailyData = [
  { name: 'Sun', earnings: 4000 },
  { name: 'Mon', earnings: 3000 },
  { name: 'Tue', earnings: 2000 },
  { name: 'Wed', earnings: 2780 },
  { name: 'Thu', earnings: 1890 },
  { name: 'Fri', earnings: 2390 },
  { name: 'Sat', earnings: 3490 },
  // Add more data for other days as needed
];

const DailyEarningsChart = () => {
  return (
    <div className="bigChartBox">
      <h1>Daily Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <AreaChart
            data={dailyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#FFD700"
              fill="#FFD700"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyEarningsChart;
