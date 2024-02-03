import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import "./Graph.css";

Chart.register(...registerables);

const Graph = ({className, data, labelCallback, titleCallback}) => {
  return (
      <Line
          className={className}
          data={data}
          width={"95%"}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {ticks: {font: {size: 12}}}
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: labelCallback,
                  title: titleCallback
                }
              }
            }
          }}
        ></Line>
    )
}

export default Graph;