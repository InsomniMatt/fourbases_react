import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/activePlayer/activePlayerSlice';
import SearchResults from './SearchResults';
import PlayerCard from './PlayerCard';
import "./PlayerSearch.css";

const PlayerSearch = () => {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);
  let [searchValue, setSearchValue] = useState(null);
  let [results, setResults] = useState([]);
  let debouncedSearchValue = useDebounce(searchValue, 300);

  const handleChange = (e) => {
    setSearchValue(e.currentTarget.value);
  }

  const searchPlayerApi = (playerName) => {
    return fetch("http://localhost:3000/players/search?search=" + playerName)
        .then(response => response.json())
        .then((data) => {
          let searchResults = data?.players || [];
          setResults(searchResults);
        });
  }

  React.useEffect(() => {
    const searchPlayers = async() => {
      selectPlayerCallback(activePlayer);
      if (debouncedSearchValue) {
        await searchPlayerApi(debouncedSearchValue);
      }
    }
    searchPlayers();
  }, [debouncedSearchValue]);

  const selectPlayerCallback = (playerData) => {
    dispatch(setActive(playerData));
  }

  const clearResults = () => {
    setResults([]);
  }

  return (
      <header className="player-search">
        <input className="player-search-input" placeholder="Player Name" onChange={handleChange}>
        </input>
        {results.length > 0 && <SearchResults results={results} clearResults={clearResults}></SearchResults>}
        {activePlayer && Object.keys(activePlayer).length > 0 && <PlayerCard activePlayer={activePlayer}></PlayerCard>}
      </header>
  )
}

export default PlayerSearch;