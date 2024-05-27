import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const pieData = {
    
    labels: ["Dispatched", "Pending", "Delivered"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="pie-chart-container">

      <Pie data={pieData} />
    </div>
  );
};

export default PieChart;
