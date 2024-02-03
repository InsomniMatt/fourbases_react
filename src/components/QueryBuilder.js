import "./QueryBuilder.css";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {setEndDate, setGroupCount, setGroupType, setStartDate} from "../features/queryAttributes/queryAttributes";
import {getStats} from "../features/player/playerSlice";
import {getTeamStats} from "../features/team/teamSlice";
import React from "react";


const QueryBuilder = ({styles}) => {
  const dispatch = useDispatch();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);

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

    if (resourceType() === "player") {
      const playerId = player.info.playerId;
      dispatch(getStats({playerId: playerId, query: query}))
    } else {
      const teamId = team.info.teamId;
      dispatch(getTeamStats({teamId: teamId, query: query}));
    }
  }

  return (
      <div className="query-builder" style={styles}>
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
  )
}

export default QueryBuilder;