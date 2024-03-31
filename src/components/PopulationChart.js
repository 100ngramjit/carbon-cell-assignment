import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import all Chart.js defaults

const PopulationChart = ({ populationData }) => {
  const chartRef = useRef(null);

  //   const populationData = [
  //     { year: 2021, population: 329725481 },
  //     { year: 2020, population: 326569308 },
  //     { year: 2019, population: 324697795 },
  //     { year: 2018, population: 322903030 },
  //     { year: 2017, population: 321004407 },
  //     { year: 2016, population: 318558162 },
  //     { year: 2015, population: 316515021 },
  //     { year: 2014, population: 314107084 },
  //     { year: 2013, population: 311536594 },
  //   ];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar", // Choose your preferred chart type (bar, line, etc.)
      data: {
        labels: populationData?.map((data) => data.Year),
        datasets: [
          {
            label: "US Population",
            data: populationData.map((data) => data.Population),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // Add label for Y-axis
                label: "Population (Estimated)",
                // Adjust minimum and maximum tick values for better scaling
                suggestedMin: 310000000,
                suggestedMax: 330000000,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                // Ensure all years are displayed (optional)
                autoSkip: false,
                // Adjust minimum and maximum tick values for better scaling
                min: 2013,
                max: 2021,
              },
              // Add label for X-axis
              label: "Year",
            },
          ],
        },
        // Add legend configuration
        legend: {
          display: true,
          labels: {
            fontColor: "black",
          },
        },
        // Adjust chart area for compactness
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          },
        },
      },
    });

    return () => myChart.destroy(); // Cleanup chart on component unmount
  }, []);

  return (
    <div>
      <h2>US Population (2013-2021)</h2>
      <canvas ref={chartRef} width="400" height="300"></canvas>
    </div>
  );
};

export default PopulationChart;
