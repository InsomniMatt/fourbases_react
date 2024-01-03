import "./HitterCard.css";
import StatGraph from "./StatGraph.js";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from "react";
import fourBases from "../request";
import {setChartMode} from "../features/chartMode/chartModeSlice";
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";
import ComparisonGraph from "./ComparisonGraph";
const HitterCard = () => {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);


  useEffect(() => {
    const fetchData = async() => {
      return await fourBases("/players/" + activePlayer.info.playerId + "/rolling_stats")
          .then(response => response.json())
          .then((data) => {
            dispatch(setChartMode("player"));
            dispatch(setRollingStats(data.rolling_stats));
          });
    }

    fetchData();

  }, [activePlayer]);

  const styles = {
    "--primary": activePlayer.info.teamColors.primary,
  }

  const renderGraphs = () => {
    if (chartMode === "comparison") {
      return (
          <div className="player-card-back">
            <div className="row">
              <ComparisonGraph styles={styles} player={activePlayer} stat="avg"></ComparisonGraph>
              <ComparisonGraph styles={styles} player={activePlayer} stat="obp"></ComparisonGraph>
            </div>
            <div className="row">
              <ComparisonGraph styles={styles} player={activePlayer} stat="slg"></ComparisonGraph>
              <ComparisonGraph styles={styles} player={activePlayer} stat="ops"></ComparisonGraph>
            </div>
          </div>
      )
    } else {
      return (
          <div className="player-card-back">
            <div className="row">
              <StatGraph styles={styles} player={activePlayer} stat="avg"></StatGraph>
              <StatGraph styles={styles} player={activePlayer} stat="obp"></StatGraph>
            </div>
            <div className="row">
              <StatGraph styles={styles} player={activePlayer} stat="slg"></StatGraph>
              <StatGraph styles={styles} player={activePlayer} stat="ops"></StatGraph>
            </div>
          </div>
      )
    }
  }

  return (
      renderGraphs()
  )

}

export default HitterCard;