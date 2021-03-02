import React from 'react';
import clickSound from './clickSound';
import gameNums from './GameNums.js';


export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      autoPlay: true,
      level: 'easy'
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.settings.level !== state.level) {
      return {
        level: props.settings.level
      };
    }
    return null;
  }

  handleClick() {
    this.props.settings.sound === 'on' && clickSound('valid');
    this.props.demoIsOn(true);
    switch(this.state.level) {
      case 'easy':
        this.props.demo(gameNums.easyGameNums);
        break;
      case 'medium':
        this.props.demo(gameNums.mediumGameNums);
        break;
    }  
  }

  render() {
    const className = this.props.settings.theme === 'dark' ? 'controls-btn-dark' : 'controls-btn';
    return (
      <button className={className} onClick={this.handleClick}>
        DEMO
      </button>
    );
  }
}