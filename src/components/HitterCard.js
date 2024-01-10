import "./HitterCard.css";
import StatGraph from "./StatGraph.js";
import { useDispatch, useSelector } from 'react-redux';
import ComparisonGraph from "./ComparisonGraph";
const HitterCard = () => {
  const activePlayer = useSelector((state) => state.activePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);

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
              <StatGraph styles={styles} stat="avg"></StatGraph>
              <StatGraph styles={styles} stat="obp"></StatGraph>
            </div>
            <div className="row">
              <StatGraph styles={styles} stat="slg"></StatGraph>
              <StatGraph styles={styles} stat="ops"></StatGraph>
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