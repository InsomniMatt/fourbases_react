import React from "react";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import BaselinePlayer from './components/BaselinePlayer';
import PlayerCard from "./components/PlayerCard";
import {useSelector} from "react-redux";

function App() {
  const activePlayer = useSelector((state) => state.activePlayer.value);

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="container">
        <img className="fourbases-logo" src="/logo192.png" alt="Fourbases"></img>
        <PlayerSearch></PlayerSearch>
        {activePlayer && Object.keys(activePlayer).length > 0 && <PlayerCard activePlayer={activePlayer}></PlayerCard>}
      </div>
      <BaselinePlayer></BaselinePlayer>
    </div>
  );
}

export default App;
