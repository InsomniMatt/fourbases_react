import React from "react";
import "./About.css";

const About = () => {
  return (
      <div>
        <h3>About FourBases</h3>
        <p>
          FourBases is a portfolio project currently under development using React, Redux, Ruby on Rails and the Statcast API.<br/>
          The code for this project is contained within the following repositories:<br/>
          Frontend: <a href="https://github.com/InsomniMatt/fourbases_react">React/Redux</a><br/>
          Backend: <a href="https://github.com/InsomniMatt/fourbases_rails">Ruby on Rails</a><br/>
          API Integration: <a href="https://github.com/InsomniMatt/baseline_stats">Baseline Ruby Gem</a><br/>
        </p>
        <h3>About the Developer</h3>
        <object className="resume" data="Woodard-Resume.pdf" type="application/pdf">
        </object>

      </div>
  )
}

export default About;