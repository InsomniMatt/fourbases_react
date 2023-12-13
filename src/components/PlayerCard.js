import "./PlayerCard.css";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import PitcherCard from "./PitcherCard";
import HitterCard from "./HitterCard";


const PlayerCard = ({activePlayer}) => {
  const dispatch = useDispatch();
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);

  const setBaselinePlayer = () => {
    dispatch(setBaseline(activePlayer));
  }

  const renderCard = () => {
    if (Object.keys(activePlayer).length === 0) {
      return (
          <div></div>
      )
    }
    let statType = activePlayer.info.displayName;

    return (
        <div className="player-card">
          {renderPortrait()}

          <div className="player-stats" style={styles} >
            {statType === "pitching" ? <PitcherCard player={activePlayer}></PitcherCard> : <HitterCard player={activePlayer}></HitterCard> }
          </div>
          <button class="set-baseline" onClick={setBaselinePlayer}>Set Baseline</button>
        </div>
    )
  }

  const styles = {
    "--primary": activePlayer.info.teamColors.primary,
    "--secondary": activePlayer.info.teamColors.secondary
  }

  const renderPortrait = () => {
    return (
        <div style={styles} className="player-card-frame">
          <img className="team-image" src={activePlayer.info.teamLogo} alt=""></img>
          <img className="player-image" src={activePlayer.portrait} alt=""></img>
          <div className="player-name">
            <span className="player-name-container">{activePlayer.info.playerName}</span>
          </div>
        </div>
    )
  }

  return (
      renderCard()
  )
}

export default PlayerCard;