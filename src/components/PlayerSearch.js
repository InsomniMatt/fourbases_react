import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/activePlayer/activePlayerSlice';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import { setChartMode } from '../features/chartMode/chartModeSlice';
import { setRollingStats } from '../features/rollingStats/rollingStatsSlice';

import SearchResults from './SearchResults';
import PlayerCard from './PlayerCard';
import "./PlayerSearch.css";
import fourBases from "../request.js";

const PlayerSearch = () => {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);
  let [searchValue, setSearchValue] = useState("");
  let [results, setResults] = useState([]);
  let debouncedSearchValue = useDebounce(searchValue, 300);

  const handleChange = (e) => {
    setSearchValue(e.currentTarget.value);
    if (e.currentTarget.value == "") {
      clearResults();
    }
  }

  const searchPlayerApi = (playerName) => {
    return fourBases("/players/search", {query: playerName})
        .then(response => response.json())
        .then((data) => {
          let searchResults = data?.players || [];
          setResults(searchResults);
        });
  }

  React.useEffect(() => {
    const searchPlayers = async() => {
      if (debouncedSearchValue) {
        // Guard against researching for the active player
        if (!(activePlayer && Object.keys(activePlayer).length > 0 && activePlayer.info.playerName == debouncedSearchValue)) {
          await searchPlayerApi(debouncedSearchValue);
        }
      }
    }
    searchPlayers();
  }, [debouncedSearchValue]);

  const playerSelected = (playerData) => {
    setSearchValue(playerData.info.playerName);
  }

  const clearResults = () => {
    setResults([]);
  }

  const resetData = () => {
    clearResults();
    setSearchValue("");
    dispatch(setActive({}));
    dispatch(setBaseline({}));
    dispatch(setChartMode("player"));
    dispatch(setRollingStats({}));
  }

  return (
      <header className="player-search">
        <input className="player-search-input" placeholder="Player Name" onChange={handleChange} value={searchValue}></input>
        {results.length > 0 && <SearchResults results={results} clearResults={clearResults} callback={playerSelected}></SearchResults>}
        <button className="clear-data" onClick={resetData}>Reset</button>
      </header>
  )
}

export default PlayerSearch;