import "./BaselinePlayer.css";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";

const BaselinePlayer = () => {
  const dispatch = useDispatch();
  const baselinePlayer = useSelector((state) => state.baselinePlayer.value);
  const activePlayer = useSelector((state) => state.activePlayer.value);

  const styles = (player) => {
    if (player && Object.keys(player).length > 0) {
      return {
        "--primary": player.info.teamColors.primary,
        "--secondary": player.info.teamColors.secondary
      };
    } else {
      return {};
    }
  }

  const canCompare = () => {
    return baselinePlayer && Object.keys(baselinePlayer).length > 0 &&
        activePlayer && Object.keys(activePlayer).length > 0 &&
        activePlayer.info.playerId != baselinePlayer.info.playerId;
  }

  const compareToBaseline = () => {
    return fetch("http://localhost:3000/players/" + activePlayer.info.playerId + "/compare_to_baseline?baseline_id=" + baselinePlayer.info.playerId)
        .then(response => response.json())
        .then((data) => {
          dispatch(setRollingStats(data.comparison));
        })
  }

  const getStat = (stat) => {

  }

  const renderPortrait = () => {
      let compareButton;
      if (canCompare()) {
        compareButton = <button className="compare-button" onClick={compareToBaseline}>Compare</button>;
      }
      return (
          <div className="footer-frame">
            {renderFooter(activePlayer, "left")}
            <div className="compare-to-baseline">
              {compareButton}
            </div>
            {renderFooter(baselinePlayer, "right")}
          </div>
      )
  }

  const renderFooter = (player, side) => {
    let className = "footer-frame-" + side;
    if (player && Object.keys(player).length > 0) {
      return (
          <div className={className}>
            <div style={styles(player)} className="baseline-player-card-frame">
              <div className="baseline-portrait">
                <img className="team-image" src={player.info.teamLogo} alt=""></img>
                <img className="player-image" src={player.portrait} alt=""></img>
              </div>
              <div className="baseline-section-right">
                <div className="player-name">
                  <span className="player-name-container">{player.info.playerName}</span>
                </div>
                <div className="baseline-stats-table">
                  {renderStatsTable(player)}
                </div>
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

  const renderStatsTable = (player) => {
    return (
        <table className="stats-table">
          <tr>
            <th>Year</th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>HR</th>
            <th>RBI</th>
            <th>SB</th>
            <th>AVG</th>
            <th>OBP</th>
            <th>OPS</th>
          </tr>
          <tr>
            <td>2023</td>
            <td>{player.stats.atBats}</td>
            <td>{player.stats.runs}</td>
            <td>{player.stats.hits}</td>
            <td>{player.stats.homeRuns}</td>
            <td>{player.stats.rbi}</td>
            <td>{player.stats.stolenBases}</td>
            <td>{player.stats.avg}</td>
            <td>{player.stats.obp}</td>
            <td>{player.stats.ops}</td>
          </tr>

        </table>
    )
  }

  return (
      // <PlayerPortrait></PlayerPortrait>
      renderPortrait()
  )
}

export default BaselinePlayer;
