import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, Tooltip } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(CategoryScale, Tooltip);
function Bars({ labels, dataBar, title }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: dataBar,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
          display: false
      },
    },
  };

  return (
    <div className="w-[400px] sm:w-[600px] lg:w-[700px] xl:w-[1000px] mx-10 overflow-y-auto">
      <div className="w-[800px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Bars;
