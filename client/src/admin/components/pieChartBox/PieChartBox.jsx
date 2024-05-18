import { colors } from '@mui/material'
import './pieChartBox.scss'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, } from 'recharts';

const data = [
    {name: "Seller", value: 1000, color: "#0088FE"},
    {name: "Customer", value: 10000, color: "#00C49F"},
    {name: "Delivery", value: 200, color: "#FFBB28"},
    {name: "Admin", value: 100, color: "#FF8042"},

];

function PieChartBox(){
    

    return(
        <div className="pieChartBox">
            <h4 className='pie-title'>Users</h4>
            <div className="pieChart">
                <ResponsiveContainer width="99%" height={200}>
                    <PieChart>
                        <Tooltip
                        contentStyle={{background:"white", borderRadius:"4px", padding:"2px 4px", color:"#FFD700"}}/>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={"50%"}
                          outerRadius={"70%"}
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
                <div className="options">
                    {data.map((item) => (
                      <div className="option" key={item.name}>
                        <div className="option-title">
                          <div className="dot" style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </div>
                        <span>{item.value}</span>
                      </div>
                    ))}
                </div>
            </div>

            
        </div>
    )
}

export default PieChartBox


/*

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
    };

    <ResponsiveContainer width="99%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
    </ResponsiveContainer>

                */  