import React from 'react';
import "./BaseStats.css";

const BaseStats = ({subject}) => {
  const styles = {
    "--primary": subject.info.teamColors.primary,
    "--secondary": subject.info.teamColors.secondary
  };

  const renderStatsTable = () => {
    return (
        <table className="stats-table">
          <thead>
          <tr>
            <th>AB</th>
            <th>H</th>
            <th className="hide-stats">2B</th>
            <th className="hide-stats">3B</th>
            <th>HR</th>
            <th>AVG</th>
            <th className="hide-stats">OBP</th>
            <th>OPS</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{subject.stats.atBats}</td>
            <td>{subject.stats.hits}</td>
            <td className="hide-stats">{subject.stats.doubles}</td>
            <td className="hide-stats">{subject.stats.triples}</td>
            <td>{subject.stats.homeRuns}</td>
            <td>{subject.stats.avg}</td>
            <td className="hide-stats">{subject.stats.obp}</td>
            <td>{subject.stats.ops}</td>
          </tr>
          </tbody>
        </table>
    )
  }

  return (
      <div style={styles} className="base-stats-frame">
        <div className="base-stats-portrait">
          <img className="player-image" src={subject.portrait} alt=""></img>
        </div>
        <div className="base-stats-section">
          <div className="player-name">
            <span className="player-name-container">{subject.info.playerName}</span>
          </div>
          <div className="base-stats-table">
            {renderStatsTable()}
          </div>
        </div>
      </div>
  )
}

export default BaseStats;
