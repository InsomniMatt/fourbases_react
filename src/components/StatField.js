const StatField = ({statsName, statsValue}) => {
  const debug = () => {
    console.log(statsName);
    console.log(statsValue);
  }

  return (
      // <div>test</div>
      <div className="statField" onClick={debug}>
        <div className="statName">
          {statsName.toString()}
        </div>
        <div className="statValue">
          {statsValue.toString()}
        </div>
      </div>
  )
}

export default StatField;