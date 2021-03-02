import React from 'react';
import { VscChromeClose } from "react-icons/vsc";


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.closeSettings = this.closeSettings.bind(this);
    this.state = {
      style: {width: '100%'},
    }
  }
  
  closeSettings() {
    this.setState({style: {width: '0%'}});
  }

  render() {
    
    return (
      <>
        <div className="overlay-intro" style={this.state.style}>  
          <div className="overlay-content">
            <div className="intro">
              <h1>8 Puzzle game</h1>
              <br></br>
              <div>The goal is to move the numbers back to their original positions.</div>
              <br></br>
              <div>Choose between:
                <ul>
                  <li><em>Timed</em> and <em>Count</em> versions</li>
                  <li><em>Random</em> and <em>Preset</em> game levels</li>
                  <li><em>Light</em> and <em>Dark</em> themes</li>
                </ul>
              </div>
              <div>Have fun!</div>
              <div>(development in progress)</div>
              <br></br>
              <button className="controls-btn" onClick={this.closeSettings}>START</button>
            </div>              
          </div>
        </div>
      </>
    );
  }
}