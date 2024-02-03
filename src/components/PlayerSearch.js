import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from 'react-redux';
import { setPlayer } from '../features/./player/playerSlice';
import { setTerm, clearResults, searchApi } from '../features/search/searchSlice';

import "./PlayerSearch.css";

const PlayerSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);
  const search = useSelector((state) => state.search.value);
  let [searchValue, setSearchValue] = useState("");
  let debouncedSearchValue = useDebounce(searchValue, 500);
  const location = useLocation();

  const handleChange = (e) => {
    const searchTerm = e.currentTarget.value;
    setSearchValue(searchTerm);
    dispatch(setTerm(searchTerm));
    if (e.currentTarget.value === "") {
      dispatch(clearResults({}));
    }
  }

  React.useEffect(() => {
    const searchPlayers = async() => {
      if (debouncedSearchValue) {
        // Guard against researching for the active player
        if (!(player && Object.keys(player).length > 0 && player.info.playerName === debouncedSearchValue) &&
            !(team && Object.keys(team).length > 0 && team.info.teamName === debouncedSearchValue)) {
          await dispatch(searchApi(debouncedSearchValue))
              .then((searchResults) => {
                navigate('/');
              });
        }
      }
    }
    searchPlayers();
  }, [dispatch, navigate, debouncedSearchValue]);

  const resetData = () => {
    dispatch(clearResults({}));
    setSearchValue("");
    dispatch(setPlayer({}));
  }


  const renderSearchBar = () => {
    return (
        <div className="search-bar">
          <input className="player-search-input" placeholder="MLB Player or Team Name" onChange={handleChange} value={search.term}></input>
        </div>
    )
  }

  return (
      <header className="player-search">
        {renderSearchBar()}
        {location.pathname !== "/about" ? <Link className="nav-link" to={`about`}>About</Link> : <Link className="nav-link" to={`/`}>Home</Link>}
      </header>
  )
}

export default PlayerSearch;