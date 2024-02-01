import React from "react";
import "./About.css";
import PlayerSearch from "./PlayerSearch";

const About = () => {
  return (
      <div className="about-container">
        <div>
          <h3>About FourBases</h3>
          <p>
            FourBases is a portfolio project currently under development using React, Redux, Ruby on Rails and the Statcast API.<br/>
            The intent is to allow a user a simple way of building and viewing rolling stat reports for specific MLB players.<br/>
            The code for this project is contained within the following repositories:<br/>
            Frontend: <a href="https://github.com/InsomniMatt/fourbases_react">React/Redux</a><br/>
            Backend: <a href="https://github.com/InsomniMatt/fourbases_rails">Ruby on Rails</a><br/>
            API Integration: <a href="https://github.com/InsomniMatt/baseline_stats">Baseline Ruby Gem</a><br/>
          </p>
          <h3>About the Developer</h3>
          <object className="resume" data="Woodard-Resume.pdf" type="application/pdf">
          </object>
        </div>
      </div>

  )
}

export default About;