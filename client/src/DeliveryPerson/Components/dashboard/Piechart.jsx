import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import './pieChartBox.css';

const data = [
  { name: 'Kilimani', value: 400, color: '#0088FE' },
  { name: 'Loresho', value: 300, color: '#00C49F' },
  { name: 'Karen', value: 300, color: '#FFBB28' },
  { name: 'Syokimau', value: 200, color: '#FF8042' },
  { name: 'Kleleshwa', value: 200, color: 'black' },
  { name: 'Langata', value: 200, color: '#FFD700' },
  { name: 'Kibera', value: 200, color: '#ffed96' },
];

const PieChartBox = () => {
  return (
    <div className="pieChartBox">
      <h4>Deliveries by Area</h4>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: 'white', borderRadius: '5px' }} />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span className='loc'>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
