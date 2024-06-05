import PropTypes from "prop-types";
import ApexChart from "react-apexcharts";

export default function PieChart({ completed, pending }) {
  const state = {
    series: [completed, pending],
    options: {
      chart: {
        width: 260,
        type: "pie",
      },

      labels: ["completed", "pending"],
      colors: ["#008000", "#806d00"],
      legend: {
        show: false, // Desativa a legenda
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "center",
            },
          },
        },
      ],
    },
  };

  return (
    <div id="chart">
      <ApexChart
        options={state.options}
        series={state.series}
        type={state.options.chart.type}
        width={state.options.chart.width}
      />
    </div>
  );
}

PieChart.propTypes = {
  completed: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
};
