import "./PlayerCard.css";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import QueryBuilder from "./QueryBuilder";

import HitterCard from "./HitterCard";
import "react-datepicker/dist/react-datepicker.css";
import {getTeamStats} from "../features/team/teamSlice";
import {setTerm} from "../features/search/searchSlice";

const TeamCard = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.value);
  const {teamId} = useParams();
  const queryAttributes = useSelector((state) => state.queryAttributes.value);

  React.useEffect(() => {
    if (!(team && Object.keys(team).length > 0)) {
      dispatch(getTeamStats({teamId: teamId, query: queryAttributes }))
          .then((teamStats) => {
            dispatch(setTerm(teamStats.payload.info.teamName));
          });
    }
  }, [])

  const getStyles = () => {
    if (team && Object.keys(team).length > 0) {
      return {
        "--primary": team.info.teamColors.primary,
        "--secondary": team.info.teamColors.secondary
      };
    } else {
      return {};
    }
  }
  const renderCard = () => {
    const styles = getStyles();
    if (team && Object.keys(team).length > 0) {
      return (
          <div className="team">
            <div className="team-info row flex-container">
              <div className="team-pic">
                {renderPortrait()}
              </div>
              <QueryBuilder/>
            </div>

            <div className="team-stats" style={styles}>
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

  const renderPortrait = () => {
    const styles = getStyles();
    return (
        <div style={styles} className="team-card-frame">
          <img className="player-image" src={team.logoUrl} alt=""></img>
        </div>
    )
  }

  return (
      renderCard()
  )
}

export default TeamCard;