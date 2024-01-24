import StatGraph from "./StatGraph.js";
import { useSelector } from 'react-redux';
import ComparisonGraph from "./ComparisonGraph";
const HitterCard = () => {
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);
  const chartMode = useSelector((state) => state.chartMode.value);

  const queryResult = () => {
    if (player && Object.keys(player).length > 0 ) {
      return player;
    } else if (team && Object.keys(team).length > 0 ) {
      return team;
    } else {
      return {};
    }
  }

  const styles = {
    "--primary": queryResult().info.teamColors.primary,
  }

  const renderGraphs = () => {
    if (chartMode === "comparison") {
      return (
          <div className="player-card-back">
            <div className="row">
              <ComparisonGraph styles={styles} stat="avg"></ComparisonGraph>
              <ComparisonGraph styles={styles} stat="obp"></ComparisonGraph>
            </div>
            <div className="row">
              <ComparisonGraph styles={styles} stat="slg"></ComparisonGraph>
              <ComparisonGraph styles={styles} stat="ops"></ComparisonGraph>
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