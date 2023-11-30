import "./HitterCard.css";
import LineGraph from "./Chart.js";
import { useSelector } from 'react-redux';
const HitterCard = () => {
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const styles = {
    "--primary": activePlayer.info.teamColors.primary,
  }
  const renderCardBack = () => {
    return (
        <div className="player-card-back">
          <div className="player-title">
            <span className="player-title-container">{activePlayer.info.playerName}</span>
          </div>
          <LineGraph styles={styles} player={activePlayer}></LineGraph>
        </div>
    )
  }

  const renderGraph = () => {
    return (
        <LineGraph></LineGraph>
    )
  }

  return (
      renderCardBack()
      // renderGraph()
  )

}

export default HitterCard;