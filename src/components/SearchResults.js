import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import PlayerPortrait from './PlayerPortrait';
import TeamPortrait from './TeamPortrait';
import "./SearchResults.css";
import {getStats, setPlayer} from "../features/player/playerSlice";
import {getTeamStats, setTeam} from "../features/team/teamSlice";

const SearchResults = ({callback}) => {
  const dispatch = useDispatch();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);
  const chartMode = useSelector((state) => state.chartMode.value);
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const loadingData = useSelector((state) => state.search.loading);
  const searchResults = useSelector((state) => state.search.value.results);

  const playerSelect = (event) => {
    const playerId = event.currentTarget.attributes.player_id.value;
    const query = queryAttributes;
    if (chartMode === "comparison") {
      query.baseline_id = baselinePlayer.info.playerId;
    }

    dispatch(getStats({playerId: playerId, query: query}))
        .then((playerData) => {
          dispatch(setTeam({}));
          callback(playerData.payload.info.playerName);
        });
  }

  const teamSelect = (event) => {
    const teamId = event.currentTarget.attributes.team_id.value;
    const query = queryAttributes;

    dispatch(getTeamStats({teamId: teamId, query: query}))
        .then((teamData) => {
          dispatch(setPlayer({}));
          callback(teamData.payload.info.teamName);
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

  const renderSpinner = () => {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    )
  }

  return (
      <div className="player-search-results">
        {(loadingData && renderSpinner())}
        {searchResults.teams.map((result) => {
          return renderPortrait(result)
        })}
        {searchResults.players.map((result) => {
          return renderPortrait(result)
        })}
      </div>
  )

}

export default SearchResults;