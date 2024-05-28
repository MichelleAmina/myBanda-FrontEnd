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

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="pie-chart-container" style={{ position: "relative", height: "400px" }}>
      <h2 className="chart-header" style={{ fontSize: "16px", margin: "10px 0", textAlign: "left", position: "absolute", top: "0px", left: "10px" }}>Order Status</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
