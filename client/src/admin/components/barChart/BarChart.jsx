import './barChart.scss'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name:'Seller',
      nv: 1000,
      pv: 400,
    },
    {
      name:'Customer',
      nv: 10000,
      pv: 8750,
  
    },
    {
      name:'Delivery',
      nv: 200,
      pv: 98,
    },
    {
      name:'Admin',
      nv: 100,
      pv: 80,
    },

  ];

function BarChartBox(){
    return(
        <div className='barChartBox'>
            <h4 className='bar-title'>Bar Chart</h4>
            <div className="barChart">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 0,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis />
                      <YAxis />
                      <Tooltip contentStyle={{background:"white", borderRadius:"4px", padding:"2px 4px", color:"#000"}}/>
                      <Legend />
                      <Bar dataKey="pv" fill=  "#00C49F" background={{ fill: '#eee' }} />
                      <Bar dataKey="nv" fill="#0088FE" />
                    </BarChart>
                </ResponsiveContainer>
            </div>          
        </div>
    )
}

export default BarChartBox