import React from "react";
import PlayerPortrait from './PlayerPortrait';
import TeamPortrait from './TeamPortrait';
import "./SearchResults.css";

const SearchResults = ({results, callback, queryCallback, teamQuery}) => {
  const playerSelect = (event) => {
    const playerId = event.currentTarget.attributes.player_id.value;
    queryCallback(playerId)
        .then((playerData) => {
          callback(playerData.info.playerName);
        });
  }

  const teamSelect = (event) => {
    const teamId = event.currentTarget.attributes.team_id.value;
    teamQuery(teamId)
        .then((teamData) => {
          callback(teamData.info.teamName);
        })
  }

  const renderPortrait = (result) => {
    if (result.type === "team") {
      return (
          <TeamPortrait key={result.id} team={result} eventHandler={teamSelect}></TeamPortrait>
      )
    } else {
      return (
          <PlayerPortrait key={result.id} player={result} eventHandler={playerSelect}></PlayerPortrait>
      )
    }
  }

  return (
      <div className="player-search-results">
        {results.map((result) => {
          return renderPortrait(result)
        })}
      </div>
  )

}

export default SearchResults;