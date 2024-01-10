import React from "react";
import PlayerPortrait from './PlayerPortrait';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/activePlayer/activePlayerSlice';
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";
import "./SearchResults.css";
import fourBases from "../request.js";

const SearchResults = ({results, clearResults, callback}) => {
  const dispatch = useDispatch();
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);
  const queryAttributes = useSelector((state) => state.queryAttributes.value);
  const playerSelect = (event) => {
    const playerId = event.currentTarget.attributes.player_id.value;
    const query = queryAttributes;
    if (chartMode === "comparison") {
      query.baseline_id = baselinePlayer.info.playerId;
    }

    return fourBases("/players/" + playerId + "/stats", query)
        .then(response => response.json())
        .then((playerData) => {
          dispatch(setActive(playerData));
          if (playerData.comparison_stats) {
            dispatch(setRollingStats(playerData.comparison_stats));
          }
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