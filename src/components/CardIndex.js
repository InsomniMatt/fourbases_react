import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {trendingApi} from "../features/trending/trendingSlice";
import SearchCard from "./SearchCard";
import SearchTeamCard from "./SearchTeamCard";

function CardIndex() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value);
  const trending = useSelector((state) => state.trending.value);
  const trendingLoading = useSelector((state) => state.trending.loading);

  React.useEffect(() => {
    if (trending.results.players.length === 0 && !trendingLoading) {
      dispatch(trendingApi());
    }
  }, [dispatch, trending, trendingLoading])

  const renderResults = () => {
    if (search.term !== "") {
      return (
        <>
          {search.results.teams.map((team) => {
            return <SearchTeamCard team={team} key={team.id}></SearchTeamCard>
          })}
          {search.results.players.map((player) => {
            return <SearchCard player={player} key={player.info.id}></SearchCard>
          })}
        </>
      )
    } else {
      return (
          <>
            {trending.results.players.map((player) => {
              return <SearchCard player={player} key={player.info.id}></SearchCard>
            })}
          </>
      )
    }
  }

  return (
      <>
        {renderResults()}
      </>
  )
}

export default CardIndex;