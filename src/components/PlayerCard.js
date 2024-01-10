import "./PlayerCard.css";
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import { Tooltip } from 'react-tooltip';
import DatePicker from "react-datepicker";
import {setStartDate, setEndDate, setGroupCount, setGroupType} from '../features/queryAttributes/queryAttributes';

import HitterCard from "./HitterCard";
import "react-datepicker/dist/react-datepicker.css";

const PlayerCard = ({activePlayer}) => {
  const dispatch = useDispatch();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

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

  const renderCard = () => {
    if (Object.keys(activePlayer).length === 0) {
      return (
          <div></div>
      )
    }

    return (
        <div className="player-card">
          <div>
            <div className="row">
              {renderPortrait()}
            </div>
            <div className="row query-attributes">
              Start Date:
              <DatePicker selected={Date.parse(queryAttributes.startDate)} onChange={(date) => dispatch(setStartDate(date.toString()))}></DatePicker>
            </div>
            <div className="row query-attributes">
              End Date:
              <DatePicker selected={Date.parse(queryAttributes.endDate)} onChange={(date) => dispatch(setEndDate(date.toString()))}></DatePicker>
            </div>
            <div className="row query-attributes">
              Count:
              <input className="query-attributes-input" onChange={handleGroupCountChange} value={queryAttributes.groupCount}></input>
            </div>
            <div className="row query-attributes">
              Type:
              <select className="query-attributes-input" onChange={handleGroupTypeChange} value={queryAttributes.groupType}>
                <option>At Bats</option>
                <option>Games</option>
                <option>Days</option>
              </select>
            </div>
            <div className="row">
              <button className="set-baseline" onClick={setBaselinePlayer} data-tooltip-id="baseline-tooltip" data-tooltip-content="Compare other players against the selected Baseline player.">Set Baseline</button>
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