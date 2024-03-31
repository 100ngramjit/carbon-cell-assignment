import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PopulationChart = ({ populationData }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: populationData.map((data) => data.Year),
    datasets: [
      {
        label: "Population",
        data: populationData.map((data) => data.Population),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Population Chart",
        color: "rgba(75,192,192,1)",
        font: {
          weight: "bold",
          size: 24,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population (in numbers)",
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChart = new Chart(document.getElementById("population-chart"), {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    chartRef.current = newChart;
  }, [chartData]);

  return (
    <div>
      <canvas id="population-chart" />
    </div>
  );
};

export default PopulationChart;
