import StatGraph from "./StatGraph.js";
import "./StatReport.css";
const StatReport = ({subject}) => {
  const styles = {
    "--primary": subject.info.teamColors.primary,
  }

  const renderGraphs = () => {
    return (
        <div className="player-card-back">
          <div className="stat-row">
            <StatGraph styles={styles} stat="avg"></StatGraph>
            <StatGraph styles={styles} stat="obp"></StatGraph>
          </div>
          <div className="stat-row">
            <StatGraph styles={styles} stat="slg"></StatGraph>
            <StatGraph styles={styles} stat="ops"></StatGraph>
          </div>
        </div>
    )
  }

  return (
      renderGraphs()
  )
}

export default StatReport;