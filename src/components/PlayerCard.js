import "./PlayerCard.css";
import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Tooltip } from 'react-tooltip';
import QueryBuilder from "./QueryBuilder";
import HitterCard from "./HitterCard";
import {getStats} from "../features/player/playerSlice";
import { setTerm } from '../features/search/searchSlice';

import "react-datepicker/dist/react-datepicker.css";

const PlayerCard = () => {
  const dispatch = useDispatch();
  const {playerId} = useParams();
  const player = useSelector((state) => state.player.value);
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

  React.useEffect(() => {
    console.log(playerId);
    if (!(player && Object.keys(player).length > 0)) {
      dispatch(getStats({playerId: playerId, query: queryAttributes }))
          .then((playerStats) => {
            dispatch(setTerm(playerStats.payload.info.playerName));
          });
    }
  }, [])

  const renderCard = () => {
    const styles = getStyles();
    if (player && Object.keys(player).length > 0) {
      return (
          <div className="player-card">
            <div className="player-info row flex-container">
              <div className="player-pic">
                {renderPortrait()}
              </div>
              <QueryBuilder />
            </div>

            <div className="player-stats" style={styles}>
              <HitterCard></HitterCard>
            </div>

            <Tooltip id="baseline-tooltip"></Tooltip>
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

  const renderPortrait = () => {

    const styles = getStyles();
    return (
        <div style={styles} className="player-card-frame">
          <img className="team-image" src={player.info.teamLogo} alt=""></img>
          <img className="player-image" src={player.portrait} alt=""></img>
        </div>
    )
  }

  return (
      renderCard()
  )
}

export default PlayerCard;