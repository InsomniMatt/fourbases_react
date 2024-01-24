import React from "react";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import BaselinePlayer from './components/BaselinePlayer';
import PlayerCard from "./components/PlayerCard";
import About from "./components/About";
import {useSelector} from "react-redux";

function App() {
  const player = useSelector((state) => state.player.value);
  const team = useSelector((state) => state.team.value);
  const activePage = useSelector((state) => state.activePage.value);

  const containerClasses = () => {
    if (activePage === "home") {
      return "container";
    } else {
      return "about-container";
    }
  }

  const resultSelected = () => {
    if (((player && Object.keys(player).length > 0) || (team && Object.keys(team).length > 0)) && activePage === "home") {
      return (
          <PlayerCard></PlayerCard>
      )
    }
  }

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className={containerClasses()}>
        <img className="fourbases-logo" src="/logo192.png" alt="Fourbases"></img>
        <PlayerSearch></PlayerSearch>
        {activePage === "about" && <About></About>}
        {resultSelected()}
      </div>
      {activePage === "home" && <BaselinePlayer></BaselinePlayer>}
    </div>
  );
}

export default App;
