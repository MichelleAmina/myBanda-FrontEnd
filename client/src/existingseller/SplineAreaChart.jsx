import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SplineAreaChart = () => {
  const options = {
    chart: {
      type: 'areaspline',
      backgroundColor: '#f7f8fc',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      gridLineWidth: 0,
    },
    yAxis: {
      title: {
        text: 'Total',
      },
      gridLineWidth: 0,
    },
    tooltip: {
      shared: true,
      valuePrefix: 'Ksh.',
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
        lineColor: '#0000b3',
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, 'rgba(70, 130, 180, 0.5)'],
            [1, 'rgba(255, 255, 255, 0)'],
          ],
        },
      },
    },
    series: [{
      name: 'Total',
      data: [50000, 70000, 80000, 60000, 75000, 85000, 95000, 38000, 65000, 75000, 80000, 90000],
    }],
  };

  return (
    <div className="chart-card">
      <h3>Sales Overview</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SplineAreaChart;
