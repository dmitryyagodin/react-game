import React from 'react';
import getPresetGame from './getPresetGame.js';
import createRandomNums from './createRandomNums.js';
import clickSound from './clickSound';

export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      gameLevel: 0,
      gamesPlayed: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      return { state:  props,
      };
    }
    return null;
  }

  handleClick(e) {
    this.state.state.sound === 'on' && clickSound('valid');
    const gameSet = getPresetGame(this.props.gameLevel);
    
    if (this.state.state.mode === 'random') {
      this.setState({gamesPlayed: this.state.gamesPlayed + 1});
      this.props.start(this.randomPlay());
    } else {
      e.target.value === 'autoplay' ?
      this.props.demo(gameSet) :
      this.props.start(gameSet[0]); 
    }    
  }

  randomPlay() {
    const newNumbers = createRandomNums();
    const randomIndexForNull = Math.floor(Math.random() * 8);
    newNumbers.splice(randomIndexForNull, 0, null);

    return newNumbers;
    }

  render() {
    const className = this.state.state.theme === 'dark' ? 'controls-btn-dark' : 'controls-btn';
    return (
      <>
      <button
        id="start-btn"
        className={className}
        value='user-play'
        onClick={this.handleClick}>
          {this.state.gamesPlayed === 0 ? "PLAY" : "NEW"}
      </button>
      {this.props.mode === 'default' ?     
      <button
        id="demo-btn"
        className={className}
        value='autoplay'
        onClick={this.handleClick}>DEMO</button> : 
        
        <button id="demo-btn" className={className} style={{opacity: 0.2}}>NO DEMO</button>
        }
      </>
    )
  }
}