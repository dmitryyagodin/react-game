import React from 'react';
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import clickSound from './clickSound';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.closeSettings = this.closeSettings.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      style: {width: '0%'},
      sound: 'off',
      mode: 'default',
      stats: 'counts',
      theme: 'light' 
    }
  }

  handleChange(e) {
    this.state.sound === 'on' && clickSound('valid');
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    // localStorage.setItem(name, value)
    this.props.settings({[name]: value})
  }
  
  closeSettings() {
    this.state.sound === 'on' && clickSound('valid');
    this.setState({style: {width: '0%'}});
  }

  openSettings() {
    this.state.sound === 'on' && clickSound('valid');
    this.setState({style: {width: '100%'}})
  
  }

  render() {
    
    return (
      <>
         <span  className="settings-icon" onClick={this.openSettings}><VscMenu/></span>
        
        <div id="settings-div" className="overlay" style={this.state.style}>  
          <div className="overlay-content">
            <div className="closebtn">
              <span onClick={this.closeSettings}><VscChromeClose/></span>
            </div>
            <div className="settings-group">
                <h3>Sound</h3>
                <input type="radio" id="off" value="off" name="sound" checked={this.state.sound === 'off'} onChange={this.handleChange}/>
                  <label htmlFor="off">Off</label>
                <input type="radio" id="on" value="on" name="sound" checked={this.state.sound === 'on'} onChange={this.handleChange}/>
                  <label htmlFor="on">On</label>
              </div>
      
              <div className="settings-group">
                <h3>Mode</h3>
                <input type="radio" id="default" value="default" name="mode" checked={this.state.mode === 'default'} onChange={this.handleChange}/>
                  <label htmlFor="default">Default</label>
                <input type="radio" id="random" value="random" name="mode" checked={this.state.mode === 'random'} onChange={this.handleChange}/>
                  <label htmlFor="random">Random</label>
              </div>

              <div className="settings-group" >
                <h3>Stats</h3>
                <input type="radio" id="counts" value="counts" name="stats" checked={this.state.stats === 'counts'} onChange={this.handleChange}/>
                  <label htmlFor="counts">Counts</label>
                <input type="radio" id="timed" value="timed" name="stats" checked={this.state.stats === 'timed'} onChange={this.handleChange}/>
                  <label htmlFor="timed">Timed</label>
              </div>

              <div className="settings-group" >
                <h3>Theme</h3>
                <input type="radio" id="light" value="light" name="theme" checked={this.state.theme === 'light'} onChange={this.handleChange}/>
                  <label htmlFor="light">Light</label>
                <input type="radio" id="dark" value="dark" name="theme" checked={this.state.theme === 'dark'} onChange={this.handleChange}/>
                  <label htmlFor="dark">Dark</label>
              </div>
          </div>
        </div>
      </>
    );
  }
}