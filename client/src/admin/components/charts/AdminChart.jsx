import './adminChart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {name:"November", Total: 200},
    {name:"December", Total: 590},
    {name:"January", Total: 1200},
    {name:"February", Total: 2600},
    {name:"March", Total: 2900},
    {name:"April", Total: 3500},
    {name:"May", Total: 5000},
    
    
  ];

function AdminChart({aspect, title}){
    return(
        <div className="adminChart">
            <div className="chart-title">
                {title}
            </div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                      </linearGradient>
                      {/*<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>*/}
                    </defs>
                    <XAxis dataKey="name" stroke='gray'/>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" className='chart-grid'/>
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#FFD700" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AdminChart