import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/activePlayer/activePlayerSlice';
import { setActivePage } from '../features/activePage/activePageSlice';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import { setChartMode } from '../features/chartMode/chartModeSlice';
import { setRollingStats } from '../features/rollingStats/rollingStatsSlice';

import SearchResults from './SearchResults';
import "./PlayerSearch.css";
import fourBases from "../request.js";

const PlayerSearch = ({queryCallback, teamQuery}) => {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);
  const activePage = useSelector((state) => state.activePage.value);
  let [searchValue, setSearchValue] = useState("");
  let [results, setResults] = useState([]);
  let debouncedSearchValue = useDebounce(searchValue, 300);

  const handleChange = (e) => {
    setSearchValue(e.currentTarget.value);
    if (e.currentTarget.value == "") {
      setResults([]);
    }
  }

  const searchPlayerApi = (playerName) => {
    return fourBases("/players/search", {query: playerName})
        .then(response => response.json())
        .then((data) => {
          let playerResults = data?.players || [];
          let teamResults = data?.teams || [];
          setResults(teamResults.concat(playerResults));
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

  const playerSelected = (playerName) => {
    setSearchValue(playerName);
    setResults([]);
  }

  const resetData = () => {
    setResults([]);
    setSearchValue("");
    dispatch(setActive({}));
    dispatch(setBaseline({}));
    dispatch(setChartMode("player"));
    dispatch(setRollingStats({}));
  }

  const showAboutPage = () => {
    dispatch(setActivePage("about"));
  }

  const showHomePage = () => {
    resetData();
    dispatch(setActivePage("home"));
  }

  const renderSearchBar = () => {
    if (activePage === "home") {
      return (
          <div className="search-bar">
            <input className="player-search-input" placeholder="MLB Player or Team Name" onChange={handleChange} value={searchValue}></input>
            {results.length > 0 && <SearchResults results={results} callback={playerSelected} queryCallback={queryCallback} teamQuery={teamQuery}></SearchResults>}
            <button className="button clear-data" onClick={resetData}>Reset</button>
          </div>
      )
    } else {
      return (
          <div></div>
      )
    }
  }

  return (
      <header className="player-search">
        {renderSearchBar()}
        {activePage === "home" ? <button href="" className="about-link" onClick={showAboutPage}>About</button> : <button href="" className="home-link" onClick={showHomePage}>Home</button>}
      </header>
  )
}

export default PlayerSearch;