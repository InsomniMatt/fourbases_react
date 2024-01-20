import React from "react";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import BaselinePlayer from './components/BaselinePlayer';
import PlayerCard from "./components/PlayerCard";
import About from "./components/About";
import {useDispatch, useSelector} from "react-redux";
import fourBases from "./request";
import {setActive} from "./features/activePlayer/activePlayerSlice";
import {setRollingStats} from "./features/rollingStats/rollingStatsSlice";

function App() {
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.value);
  const activePage = useSelector((state) => state.activePage.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const chartMode = useSelector((state) => state.chartMode.value);
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

  const playerQuery = (playerId) => {
    const query = queryAttributes;
    if (chartMode === "comparison") {
      query.baseline_id = baselinePlayer.info.playerId;
    }

    return fourBases("/players/" + playerId + "/stats", query)
        .then(response => response.json())
        .then((playerData) => {
          playerData.queryAttributes = query;
          playerData.type = "player";
          dispatch(setActive(playerData));
          if (playerData.comparison_stats) {
            dispatch(setRollingStats(playerData.comparison_stats));
          }
          return playerData;
        })
  }

  const teamQuery = (teamId) => {
    const query = queryAttributes;
    return fourBases("/teams/" + teamId + "/stats", query)
        .then(response => response.json())
        .then((teamData) => {
          teamData.queryAttributes = query;
          teamData.type = "team";
          dispatch(setActive(teamData));
          return teamData;
        })
  }

  const containerClasses = () => {
    if (activePage === "home") {
      return "container";
    } else {
      return "about-container";
    }
  }

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className={containerClasses()}>
        <img className="fourbases-logo" src="/logo192.png" alt="Fourbases"></img>
        <PlayerSearch queryCallback={playerQuery} teamQuery={teamQuery}></PlayerSearch>
        {activePage === "about" && <About></About>}
        {activePlayer && Object.keys(activePlayer).length > 0 && <PlayerCard queryCallback={playerQuery} teamQuery={teamQuery}></PlayerCard>}
      </div>
      {activePage === "home" && <BaselinePlayer></BaselinePlayer>}
    </div>
  );
}

export default App;
