import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import {useSelector} from 'react-redux';
// import "./ComparisonGraph.css";

Chart.register(...registerables)

const ComparisonGraph = ({player, stat}) => {
  const rollingStats = useSelector((state) => state.rollingStats.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const getDataSets = () => {
    return [{
      label: "100 AB Rolling " + stat.toUpperCase(),
      // y-axis data plotting values
      data: rollingStats[stat],
      fill: false,
      borderColor: player.info.teamColors.primary,
      responsive:true
    },
    {
      label: "Baseline",
      data: new Array(rollingStats["avg"].length).fill(0),
      fill: false,
      borderColor: baselinePlayer.info.teamColors.primary,
      responsive:true,
    }];
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
                      return "Last AB on " + context.label;
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

export default ComparisonGraph;