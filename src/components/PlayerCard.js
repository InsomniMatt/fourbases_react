import "./PlayerCard.css";
import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import QueryBuilder from "./QueryBuilder";
import StatReport from "./StatReport";
import {getStats} from "../features/player/playerSlice";
import { setTerm } from '../features/search/searchSlice';
import BaseStats from './BaseStats';

import "react-datepicker/dist/react-datepicker.css";

const PlayerCard = () => {
  const dispatch = useDispatch();
  const {playerId} = useParams();
  const player = useSelector((state) => state.player.value);
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

  React.useEffect(() => {
    if (!(player && Object.keys(player).length > 0)) {
      dispatch(getStats({playerId: playerId, query: queryAttributes }))
          .then((playerStats) => {
            dispatch(setTerm(playerStats.payload.info.playerName));
          });
    }
  }, [dispatch, player, playerId, queryAttributes])

  const renderCard = () => {
    const styles = getStyles();
    if (player && Object.keys(player).length > 0) {
      return (
          <div className="player-card">
            <div className="player-info row flex-container">
              <BaseStats subject={player}/>
              <QueryBuilder styles={styles}/>
              <div className="player-stats" style={styles}>
                <StatReport subject={player}></StatReport>
              </div>
            </div>
          </div>
      )
    } else {
      return (
          <div></div>
      )
    }

  }

  const getStyles = () => {
    if (player && Object.keys(player).length > 0) {
      return {
        "--primary": player.info.teamColors.primary,
        "--secondary": player.info.teamColors.secondary
      };
    } else {
      return {};
    }
  }

  return (
      renderCard()
  )
}

export default PlayerCard;