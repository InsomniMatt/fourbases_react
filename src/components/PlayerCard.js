import "./PlayerCard.css";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import PitcherCard from "./PitcherCard";
import HitterCard from "./HitterCard";
import { Tooltip } from 'react-tooltip';
import ComparisonGraph from "./ComparisonGraph";

const PlayerCard = ({activePlayer}) => {
  const dispatch = useDispatch();
  const chartMode = useSelector((state) => state.chartMode.value);

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
          <div className="row">
            {renderPortrait()}
            <button className="set-baseline" onClick={setBaselinePlayer} data-tooltip-id="baseline-tooltip" data-tooltip-content="Compare other players against the selected Baseline player.">Set Baseline</button>
          </div>

          <div className="player-stats" style={styles}>
            {statType === "pitching" ? <PitcherCard player={activePlayer}></PitcherCard> : <HitterCard player={activePlayer}></HitterCard> }
          </div>

          <Tooltip id="baseline-tooltip"></Tooltip>
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
          {/*<div className="player-name">*/}
          {/*  <span className="player-name-container">{activePlayer.info.playerName}</span>*/}
          {/*</div>*/}
        </div>
    )
  }

  return (
      renderCard()
  )
}

export default PlayerCard;