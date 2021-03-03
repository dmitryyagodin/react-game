import React from 'react';
import Box from './Box';

export default class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwap = this.handleSwap.bind(this);
    
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      toWin: [],
      demo: 'off',
      movesMade: 0,
      time: 0,
      moves: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      return { numbers:  props.numbers,
               moves: props.moves,
               toWin: props.toWin,
              //  demo: props.settings.demo,
      };
    }
    return null;
  }

  handleSwap(number) {
    this.props.swap(number);
  }

  render() {
    const numbers = this.state.numbers;

    return (
      <>
      <div className="flex-container">
            {numbers.map((val, i) => 
              <Box
                key={i}
                position={i}
                number={val}
                swap={this.handleSwap}
                moves={this.state.moves}
                sound={this.props.sound}/>
              )
            }
      </div>
      </>
    );
  } 
}