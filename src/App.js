import React from "react";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import BaselinePlayer from './components/BaselinePlayer';
import PlayerCard from "./components/PlayerCard";
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
          dispatch(setActive(playerData));
          if (playerData.comparison_stats) {
            dispatch(setRollingStats(playerData.comparison_stats));
          }
          return playerData;
        })
  }

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="container">
        <img className="fourbases-logo" src="/logo192.png" alt="Fourbases"></img>
        <PlayerSearch queryCallback={playerQuery}></PlayerSearch>
        {activePlayer && Object.keys(activePlayer).length > 0 && <PlayerCard queryCallback={playerQuery}></PlayerCard>}
      </div>
      <BaselinePlayer></BaselinePlayer>
    </div>
  );
}

export default App;
