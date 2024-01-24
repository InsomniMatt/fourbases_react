import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import {useSelector} from 'react-redux';
import Graph from "./Graph";

const StatGraph = ({stat}) => {
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);

  const queryResult = () => {
    if (player && Object.keys(player).length > 0 ) {
      return player;
    } else if (team && Object.keys(team).length > 0 ) {
      return team;
    } else {
      return {};
    }
  }

  const getDataObject = () => {
      return {
        labels: queryResult().rolling_stats.dates,
        datasets: [{
          label: graphTitle(),
          // y-axis data plotting values
          data: queryResult().rolling_stats[stat],
          fill: false,
          borderColor: queryResult().info.teamColors.primary,
          responsive: true
        }]
      };
  }

  const graphTitle = () => {
    return "Last " + queryResult().queryAttributes.groupCount + " " + queryResult().queryAttributes.groupType + " Rolling " + stat.toUpperCase();
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