import "./PlayerPortrait.css"

const PlayerPortrait = ({ player, eventHandler }) => {
  const playerImageUrl = () => {
    return "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/" + String(player.id) + "/headshot/67/current";
  }

  return (
      <div player_id={player.id} className="player-portrait" onClick={eventHandler}>
        <img className="player-portrait-image" src={playerImageUrl()} alt=""></img>
        <div className="player-info">
          <div className="player-name">{player.name}</div>
        </div>
      </div>
  )
}

export default PlayerPortrait;