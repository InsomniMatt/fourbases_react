import React, {useState } from "react";
import PlayerPortrait from './PlayerPortrait';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/activePlayer/activePlayerSlice';
import "./SearchResults.css";

const SearchResults = ({results, clearResults}) => {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const playerSelect = (event) => {
    const playerId = event.currentTarget.attributes.player_id.value;
    return fetch("http://localhost:3000/players/" + playerId + "/stats")
        .then(response => response.json())
        .then((playerData) => {
          dispatch(setActive(playerData));
          clearResults();
        })
  }

  return (
      <div className="player-search-results">
        {results.map((player) => {
          return <PlayerPortrait player={player} eventHandler={playerSelect}></PlayerPortrait>
        })}
      </div>
  )

}

export default SearchResults;