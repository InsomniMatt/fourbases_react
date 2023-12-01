import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import {useDispatch, useSelector} from 'react-redux';
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";
import "./Chart.css";
import fourBases from "../request.js";

Chart.register(...registerables)

const LineGraph = ({player}) => {
  const dispatch = useDispatch();
  const rollingStats = useSelector((state) => state.rollingStats.value);
  const activePlayer = useSelector((state) => state.activePlayer.value);
  let [activeAvg, setActiveAvg] = useState(true);
  let [activeObp, setActiveObp] = useState(false);
  let [activeSlg, setActiveSlg] = useState(false);
  let [activeOps, setActiveOps] = useState(false);
  let [activeStat, setActiveStat] = useState([]);
  // const possibleStats = ["avg", "obp", "slg", "ops"];

  useEffect(() => {
    const fetchData = async() => {
      return await fourBases("/players/" + player.info.playerId + "/rolling_stats")
          .then(response => response.json())
          .then((data) => {
            dispatch(setRollingStats(data.rolling_stats));
          });
    }

    fetchData();

  }, [player]);

  const setStat = (stat) => {
    setActiveStat([...activeStat, stat]);
  }

  const getDataSets = () => {
    let statMap = {"avg": activeAvg, "obp": activeObp, "slg": activeSlg, "ops": activeOps};
    let results = [];
    Object.keys(statMap).forEach((stat) => {
      if (statMap[stat]) {
        results.push({
          label: "50 AB Rolling " + stat.toUpperCase(),
          // y-axis data plotting values
          data: rollingStats[stat],
          fill: false,
          borderColor: activePlayer.info.teamColors.primary,
          responsive:true
        });
      }
    });
    return results;
  }

  return (
      <div>
        <Line
            className="stat-chart"
            data={{
              // x-axis label values
              labels: rollingStats.dates,
              datasets: getDataSets(),
            }}
            options={{
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
        <div className="stat-selector">
          <button onClick={() => setActiveAvg(!activeAvg)}>AVG</button>
          <button onClick={() => setActiveObp(!activeObp)}>OBP</button>
          <button onClick={() => setActiveSlg(!activeSlg)}>SLG</button>
          <button onClick={() => setActiveOps(!activeOps)}>OPS</button>
        </div>
      </div>
  );
}

export default LineGraph;