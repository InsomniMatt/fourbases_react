import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2";
import {useDispatch, useSelector} from 'react-redux';
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";
import {setChartMode} from "../features/chartMode/chartModeSlice";
import "./Chart.css";
import fourBases from "../request.js";

Chart.register(...registerables)

const LineGraph = ({player}) => {
  const dispatch = useDispatch();
  const rollingStats = useSelector((state) => state.rollingStats.value);
  const activePlayer = useSelector((state) => state.activePlayer.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);
  let [activeAvg, setActiveAvg] = useState(true);
  let [activeObp, setActiveObp] = useState(false);
  let [activeSlg, setActiveSlg] = useState(false);
  let [activeOps, setActiveOps] = useState(false);
  let [activeStat, setActiveStat] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      return await fourBases("/players/" + player.info.playerId + "/rolling_stats")
          .then(response => response.json())
          .then((data) => {
            dispatch(setChartMode("player"));
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
    if (chartMode == "comparison") {
      results.push({
        label: "Baseline",
        data: new Array(rollingStats["avg"].length).fill(0),
        fill: false,
        borderColor: baselinePlayer.info.teamColors.primary,
        responsive:true,
      })
    }
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
          <button class="stat-button" onClick={() => setActiveAvg(!activeAvg)}>AVG</button>
          <button class="stat-button" onClick={() => setActiveObp(!activeObp)}>OBP</button>
          <button class="stat-button" onClick={() => setActiveSlg(!activeSlg)}>SLG</button>
          <button class="stat-button" onClick={() => setActiveOps(!activeOps)}>OPS</button>
        </div>
      </div>
  );
}

export default LineGraph;