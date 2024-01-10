import React from "react";

const About = () => {
  return (
      <div>
        Fourbases is a not for profit, work in progress made using React, Redux, Ruby on Rails and the Statcast API.
        It was developed by software engineer Matthew Woodard, who can be contacted through his <a href="https://www.linkedin.com/in/mjwoodard/">LinkedIn</a>.
        The following repositories contain the code for this project:
        <a href="https://github.com/InsomniMatt/fourbases_react">Frontend: React/Redux</a>
        <a href="https://github.com/InsomniMatt/fourbases_rails">Backend: Ruby on Rails</a>
        <a href="https://github.com/InsomniMatt/baseline_stats">Custom gem used for integration with the Statcast API</a>
      </div>
  )
}

export default About;