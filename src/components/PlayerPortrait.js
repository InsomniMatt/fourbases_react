import "./PlayerPortrait.css"
import Card from '@mui/material/Card';

const PlayerPortrait = ({ player }) => {
  const playerImageUrl = () => {
    return "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/" + String(player.info.id) + "/headshot/67/current";
  }

  const eventHandler = (e) => {
    console.log('click');
  }

  return (
      <Card player_id={player.id} className="player-portrait" onClick={eventHandler}>
        <img className="player-portrait-image" src={playerImageUrl()} alt=""></img>
        <div className="player-info">
          <div className="player-name">{player.info.name}</div>
          <div className="player-avg">AVG: {player.stats.avg}</div>
          <div className="clear-both"></div>

          <div className="player-team">{player.info.team_name}</div>
          <div className="player-hits">Hits: {player.stats.hits}</div>
          <div className="clear-both"></div>


          <div className="player-position">{player.info.position}</div>
          <div className="player-home-runs">HR: {player.stats.homeRuns}</div>
          <div className="clear-both"></div>
        </div>
      </Card>
  )
}

export default PlayerPortrait;