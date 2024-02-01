import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import "./SearchTeamCard.css"
import {getTeamStats} from "../features/team/teamSlice";
import { setTerm } from '../features/search/searchSlice';

const SearchTeamCard = ({ team }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

  const eventHandler = (e) => {
    dispatch(getTeamStats({teamId: team.id, query: queryAttributes}))
        .then((teamData) => {
          navigate("/teams/" + team.id)
          dispatch(setTerm(team.name));
          console.log(teamData);
        })

  }

  const renderTeamInfo = () => {
    return (
        <div className="team-info">
          <div className="team-name">{team.name}</div>
        </div>
    )
  }

  return (
      <div team_id={team.id} className="search-card" onClick={eventHandler}>
        <img className="search-card-image" src={team.logo_url} alt=""></img>
        {renderTeamInfo()}
      </div>
  )
}

export default SearchTeamCard;