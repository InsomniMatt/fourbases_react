import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from 'react-redux';
import { setPlayer } from '../features/./player/playerSlice';
import { setActivePage } from '../features/activePage/activePageSlice';
import { setBaseline } from '../features/baselinePlayer/baselinePlayerSlice';
import { setChartMode } from '../features/chartMode/chartModeSlice';
import { setRollingStats } from '../features/rollingStats/rollingStatsSlice';
import { setTerm, clearResults, searchApi } from '../features/search/searchSlice';

import SearchResults from './SearchResults';
import "./PlayerSearch.css";

const PlayerSearch = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);
  const activePage = useSelector((state) => state.activePage.value);
  const search = useSelector((state) => state.search.value);
  let [searchValue, setSearchValue] = useState("");
  let debouncedSearchValue = useDebounce(searchValue, 300);

  const handleChange = (e) => {
    const searchTerm = e.currentTarget.value;
    setSearchValue(searchTerm);
    dispatch(setTerm(searchTerm));
    if (e.currentTarget.value == "") {
      dispatch(clearResults({}));
    }
  }

  React.useEffect(() => {
    const searchPlayers = async() => {
      if (debouncedSearchValue) {
        // Guard against researching for the active player
        if (!(player && Object.keys(player).length > 0 && player.info.playerName == debouncedSearchValue) ||
            !(team && Object.keys(team).length > 0 && team.info.teamName == debouncedSearchValue)) {
          await dispatch(searchApi(debouncedSearchValue));
        }
      }
    }
    searchPlayers();
  }, [debouncedSearchValue]);

  const resultSelected = (selected) => {
    dispatch(setTerm(selected));
    dispatch(clearResults({}));
  }

  const resetData = () => {
    dispatch(clearResults({}));
    setSearchValue("");
    dispatch(setPlayer({}));
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
    console.log(search);
    if (activePage === "home") {
      return (
          <div className="search-bar">
            <input className="player-search-input" placeholder="MLB Player or Team Name" onChange={handleChange} value={search.term}></input>
            <SearchResults callback={resultSelected}></SearchResults>
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