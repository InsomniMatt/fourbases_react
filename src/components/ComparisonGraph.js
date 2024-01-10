import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import {useSelector} from 'react-redux';
import Graph from "./Graph";

const ComparisonGraph = ({player, stat}) => {
  const rollingStats = useSelector((state) => state.rollingStats.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const getDataObject = () => {
    return {
      labels: rollingStats.dates,
      datasets: [{
        label: "100 AB Rolling " + stat.toUpperCase(),
        // y-axis data plotting values
        data: rollingStats[stat],
        fill: false,
        borderColor: activePlayer.info.teamColors.primary,
        responsive:true
      },
      {
        label: "Baseline",
        data: new Array(rollingStats["avg"].length).fill(0),
        fill: false,
        borderColor: baselinePlayer.info.teamColors.primary,
        responsive:true,
      }]
    };
  }

  const labelCallback = (context) => {
    return "Last AB on " + context.label;
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

export default ComparisonGraph;