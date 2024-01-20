import "./TeamPortrait.css";
const TeamPortrait = ({ team, eventHandler }) => {
  return (
      <div team_id={team.id} className="team-portrait" onClick={eventHandler}>
        <img className="team-portrait-image" src={team.logo_url} alt=""></img>
        <div className="team-info">
          <div className="team-name">{team.name}</div>
        </div>
      </div>
  )
}

export default TeamPortrait;