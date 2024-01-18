import "./BaselinePlayer.css";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setRollingStats} from "../features/rollingStats/rollingStatsSlice";
import {setChartMode} from "../features/chartMode/chartModeSlice";
import fourBases from "../request.js";

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
    return fourBases("/players/" + activePlayer.info.playerId + "/compare_to_baseline", {baseline_id: baselinePlayer.info.playerId})
        .then(response => response.json())
        .then((data) => {
          dispatch(setChartMode("comparison"));
          dispatch(setRollingStats(data.comparison));
        })
  }

  const renderPortrait = () => {
      let compareButton;
      if (canCompare()) {
        compareButton = <button className="button compare-button" onClick={compareToBaseline}>Compare</button>;
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
    let className = "footer-master footer-" + side;
    if (player && Object.keys(player).length > 0) {
      return (
          <div className={className}>
            <div style={styles(player)} className="baseline-player-card-frame">
              <div className="baseline-portrait">
                <img className="team-image" src={player.info.teamLogo} alt=""></img>
                <img className="player-image" src={player.portrait} alt=""></img>
              </div>
              <div className="baseline-section">
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
          <thead>
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
          </thead>
          <tbody>
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
          </tbody>

        </table>
    )
  }

  return (
      renderPortrait()
  )
}

export default BaselinePlayer;
