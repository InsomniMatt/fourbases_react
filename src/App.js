import React from "react";
import { useOutlet } from "react-router-dom";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import CardIndex from './components/CardIndex';

function App() {
  const outlet = useOutlet();

  return (
    <div className="App">
      <div className="container">
        <img className="fourbases-logo" src="/logo192.png" alt="Fourbases"></img>
        <PlayerSearch></PlayerSearch>
        <div className="content">
          {outlet || <CardIndex />}
        </div>
      </div>
    </div>
  );
}

export default App;
