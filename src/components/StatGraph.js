import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import {useSelector} from 'react-redux';
import Graph from "./Graph";

const StatGraph = ({stat}) => {
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const getDataObject = () => {
      return {
        labels: activePlayer.rolling_stats.dates,
        datasets: [{
          label: "100 AB Rolling " + stat.toUpperCase(),
          // y-axis data plotting values
          data: activePlayer.rolling_stats[stat],
          fill: false,
          borderColor: activePlayer.info.teamColors.primary,
          responsive: true
        }]
      };
  }

  const labelCallback = (context) => {
    return context.raw + ": Last AB on " + context.label;
  }

  const titleCallback = (context) => {
    return "";
  }

  return (
      <div className="player-stat-chart">
        <Graph
            className="stat-chart"
            data={getDataObject()}
            labelCallback={labelCallback}
            titleCallback={titleCallback}>
        </Graph>
      </div>
  );
}

export default StatGraph;