import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import {useDispatch, useSelector} from 'react-redux';
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";
import {setChartMode} from "../features/chartMode/chartModeSlice";
import "./StatGraph.css";
import fourBases from "../request.js";

Chart.register(...registerables)

const StatGraph = ({player, stat}) => {
  const dispatch = useDispatch();
  const rollingStats = useSelector((state) => state.rollingStats.value);
  const activePlayer = useSelector((state) => state.activePlayer.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);

  const getDataSets = () => {

      return [{
        label: "100 AB Rolling " + stat.toUpperCase(),
        // y-axis data plotting values
        data: rollingStats[stat],
        fill: false,
        borderColor: activePlayer.info.teamColors.primary,
        responsive:true
      }];
    // if (chartMode == "comparison") {
    //   results.push({
    //     label: "Baseline",
    //     data: new Array(rollingStats["avg"].length).fill(0),
    //     fill: false,
    //     borderColor: baselinePlayer.info.teamColors.primary,
    //     responsive:true,
    //   })
    // }
  }

  return (
      <div className="player-stat-chart">
        <Line
            className="stat-chart"
            data={{
              // x-axis label values
              labels: rollingStats.dates,
              datasets: getDataSets(),
            }}
            width={"95%"}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {ticks: {font: {size: 12}}}
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return context.raw + ": Last AB on " + context.label;
                    },
                    title: function(context) {
                      // return "Last AB on " + context[0].label;
                      return "";
                    }
                  }
                }
              }
            }}
        />
      </div>
  );
}

export default StatGraph;