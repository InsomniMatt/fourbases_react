import "./PlayerCard.css";
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import { Tooltip } from 'react-tooltip';
import DatePicker from "react-datepicker";
import {setStartDate, setEndDate, setGroupCount, setGroupType} from '../features/queryAttributes/queryAttributes';
import {getStats} from "../features/player/playerSlice";
import {getTeamStats} from "../features/team/teamSlice";

import HitterCard from "./HitterCard";
import "react-datepicker/dist/react-datepicker.css";

const PlayerCard = () => {
  const dispatch = useDispatch();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);

  const setBaselinePlayer = () => {
    dispatch(setBaseline(player));
  }

  const queryResult = () => {
    if (player && Object.keys(player).length > 0 ) {
      return player;
    } else if (team && Object.keys(team).length > 0 ) {
      return team;
    } else {
      return {};
    }
  }

  const handleGroupCountChange = (e) => {
    const value = e.currentTarget.value;
    dispatch(setGroupCount(value));
  }

  const handleGroupTypeChange = (e) => {
    const value = e.currentTarget.value;
    dispatch(setGroupType(value));
  }

  const resourceType = () => {
    if (player && Object.keys(player).length > 0) {
      return "player";
    } else {
      return "team";
    }
  }

  const queryStats = () => {
    const query = queryAttributes;

    if (resourceType === "player") {
      const playerId = player.info.playerId;
      if (chartMode === "comparison") {
        query.baseline_id = baselinePlayer.info.playerId;
      }

      dispatch(getStats({playerId: playerId, query: query}))
    } else {
      const teamId = team.info.teamId;
      dispatch(getTeamStats({teamId: teamId, query: query}));
    }
  }

  const renderCard = () => {
    if (Object.keys(queryResult()).length === 0) {
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
            <HitterCard></HitterCard>
          </div>

          <Tooltip id="baseline-tooltip"></Tooltip>
        </div>
    )
  }

  const styles = {
    "--primary": queryResult().info.teamColors.primary,
    "--secondary": queryResult().info.teamColors.secondary
  }

  const renderPortrait = () => {
    return (
        <div style={styles} className="player-card-frame">
          <img className="team-image" src={queryResult().info.teamLogo} alt=""></img>
          <img className="player-image" src={queryResult().portrait} alt=""></img>
        </div>
    )
  }

  return (
      renderCard()
  )
}

export default PlayerCard;