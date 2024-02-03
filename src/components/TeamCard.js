import "./TeamCard.css";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import BaseStats from './BaseStats';
import QueryBuilder from "./QueryBuilder";
import StatReport from "./StatReport";
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
  }, [team, queryAttributes, teamId, dispatch])

  const getStyles = () => {
    return {
      "--primary": team.info.teamColors.primary,
      "--secondary": team.info.teamColors.secondary
    };
  }
  const renderCard = () => {
    if (team && Object.keys(team).length > 0) {
      const styles = getStyles();
      return (
          <div className="team">
            <div className="team-info row flex-container">
              <BaseStats subject={team}></BaseStats>
              <QueryBuilder styles={styles}/>
              <div className="team-stats" style={styles}>
                <StatReport subject={team}></StatReport>
              </div>
            </div>
          </div>
      )
    } else {
      return <></>
    }
  }

  return (
      renderCard()
  )
}

export default TeamCard;