import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#ffd700",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>Sales by Month</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;