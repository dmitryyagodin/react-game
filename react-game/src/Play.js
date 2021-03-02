import React from 'react';
import gameNums from './GameNums.js';
import createRandomNums from './createRandomNums.js';
import clickSound from './clickSound';

export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      numbers: [],
    }
  }

  handleClick() {
    const level = this.props.settings.level;
    const sound = this.props.settings.sound;
    const mode = this.props.settings.mode;
    sound === 'on' && clickSound('valid');
    switch(level) {
      case 'easy':
        this.props.start(gameNums.easyGameNums);
        this.setState({numbers: gameNums.easyGameNums});
        break;
      case 'medium':
        this.props.start(gameNums.mediumGameNums);
        this.setState({numbers: gameNums.mediumGameNums});
        break;
      case 'hard':
        const newNumbers = createRandomNums();
        const randomIndexForNull = Math.floor(Math.random() * 8);
        newNumbers.splice(randomIndexForNull, 0, null)
        this.props.start(newNumbers);
        this.setState({ numbers: newNumbers });
    }
  }

  render() {
    const className = this.props.settings.theme === 'dark' ? 'controls-btn-dark' : 'controls-btn';
    return (
      <button
        className={className}
        onClick={this.handleClick}>PLAY</button>
    )
  }
}