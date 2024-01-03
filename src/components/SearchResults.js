import React, {useState } from "react";
import PlayerPortrait from './PlayerPortrait';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/activePlayer/activePlayerSlice';
import "./SearchResults.css";
import fourBases from "../request.js";

const SearchResults = ({results, clearResults, callback}) => {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const playerSelect = (event) => {
    const playerId = event.currentTarget.attributes.player_id.value;
    return fourBases("/players/" + playerId + "/stats")
        .then(response => response.json())
        .then((playerData) => {
          dispatch(setActive(playerData));
          callback(playerData);
          clearResults();
        })
  }

  return (
      <div className="player-search-results">
        {results.map((player) => {
          return <PlayerPortrait key={player.id} player={player} eventHandler={playerSelect}></PlayerPortrait>
        })}
      </div>
  )

}

export default SearchResults;