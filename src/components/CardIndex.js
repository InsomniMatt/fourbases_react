import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {defaultSearch} from "../features/search/searchSlice";
import SearchCard from "./SearchCard";
import SearchTeamCard from "./SearchTeamCard";

function CardIndex() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value);

  React.useEffect(() => {
    if (search.results.players.length == 0 && search.results.teams.length == 0) {
      dispatch(defaultSearch());
    }
  }, [])

  return (
      <div>
        {search.results.teams.map((team) => {
          return <SearchTeamCard team={team} key={team.id} />
        })}
        {search.results.players.map((player, i) => {
          return <SearchCard player={player} key={player.info.id} />;
        })}
      </div>
  )
}

export default CardIndex;