import "./PlayerCard.css";
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import { Tooltip } from 'react-tooltip';
import DatePicker from "react-datepicker";
import {setStartDate, setEndDate, setGroupCount, setGroupType} from '../features/queryAttributes/queryAttributes';

import HitterCard from "./HitterCard";
import "react-datepicker/dist/react-datepicker.css";

const PlayerCard = ({queryCallback}) => {
  const dispatch = useDispatch();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const setBaselinePlayer = () => {
    dispatch(setBaseline(activePlayer));
  }

  const handleGroupCountChange = (e) => {
    const value = e.currentTarget.value;
    dispatch(setGroupCount(value));
  }

  const handleGroupTypeChange = (e) => {
    const value = e.currentTarget.value;
    dispatch(setGroupType(value));
  }

  const queryStats = () => {
    const playerId = activePlayer.info.playerId;
    queryCallback(playerId);
  }

  const renderCard = () => {
    if (Object.keys(activePlayer).length === 0) {
      return (
          <div></div>
      )
    }

    return (
        <div className="player-card">
          <div className="player-info row flex-container">
            <div className="player-pic">
              {renderPortrait()}
              {/*<button className="button set-baseline" onClick={setBaselinePlayer} data-tooltip-id="baseline-tooltip" data-tooltip-content="Set this player as your Baseline.  Further queries will show data evaluated against this player's stats.">Set Baseline</button>*/}
            </div>

            <div className="query-builder">
              <div className="query-attributes">
                Start Date:
                <DatePicker selected={Date.parse(queryAttributes.startDate)} onChange={(date) => dispatch(setStartDate(date.toString()))}></DatePicker>
              </div>
              <div className="query-attributes">
                End Date:
                <DatePicker selected={Date.parse(queryAttributes.endDate)} onChange={(date) => dispatch(setEndDate(date.toString()))}></DatePicker>
              </div>
              <div className="query-attributes">
                Count:
                <input className="query-attributes-input" onChange={handleGroupCountChange} value={queryAttributes.groupCount}></input>
              </div>
              <div className="query-attributes">
                Type:
                <select className="query-attributes-input" onChange={handleGroupTypeChange} value={queryAttributes.groupType}>
                  <option>At Bats</option>
                  <option>Games</option>
                  <option>Days</option>
                </select>
              </div>
              <div className="query-attributes">
                <button className="button query-call" onClick={queryStats}>Get Stats</button>
              </div>
            </div>
          </div>

          <div className="player-stats" style={styles}>
            <HitterCard player={activePlayer}></HitterCard>
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
        </div>
    )
  }

  return (
      renderCard()
  )
}

export default PlayerCard;