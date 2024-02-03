import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import "./SearchCard.css"
import {getStats} from "../features/player/playerSlice";
import { setTerm } from '../features/search/searchSlice';

const SearchCard = ({ player }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

  const playerImageUrl = () => {
    return "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/" + String(player.info.id) + "/headshot/67/current";
  }

  const eventHandler = () => {
    dispatch(getStats({playerId: player.info.id, query: queryAttributes}))
        .then((playerData) => {
          dispatch(setTerm(player.info.name));
          navigate("/players/" + player.info.id);
        });
  }

  const renderPlayerInfo = () => {
    return (
        <div className="player-info">
          <div className="player-name">{player.info.name}</div>
          <div className="player-avg">AVG: {player.stats.avg}</div>
          <div className="clear-both"></div>

          <div className="player-team">{player.info.team_name}</div>
          <div className="player-hits">Hits: {player.stats.hits}</div>
          <div className="clear-both"></div>


          <div className="player-position">{player.info.position}</div>
          <div className="player-home-runs">HR: {player.stats.home_runs}</div>
          <div className="clear-both"></div>
        </div>
    )
  }

  return (
      <div player_id={player.info.id} className="search-card" onClick={eventHandler}>
        <img className="search-card-image" src={playerImageUrl()} alt=""></img>
        {renderPlayerInfo()}
      </div>
  )
}

export default SearchCard;