import React from 'react';
import Box from './Box';
import swapNumbers from './swapNumbers.js';
import defineMoves from './defineMoves.js';
import clickSound from './clickSound';
import MovesCounter from './MovesCounter';
import Timer from './Timer';

export default class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwap = this.handleSwap.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      toWin: [],
      modalStyle: {display: 'block'},
      demo: 'off',
      movesMade: 0,
      time: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.numbers !== state.numbers) {
      return { numbers:  props.numbers,
               moves: defineMoves(props.numbers),
               toWin: props.toWin,
               demo: props.settings.demo,
      };
    }
    return null;
  }

  handleDemo(demoNumbers) {
    this.closeModal(); 
    this.setState({
      numbers: demoNumbers,
      possibleClicks: [],
      movesMade: 0
    });

    let demoSteps = [];

    if (this.props.settings.level === 'easy') {
      demoSteps = [1, 4, 7, 8];
    } else if (this.props.settings.level === 'medium') {
      demoSteps = [8, 6, 3, 2, 1, 4, 5, 8];
    }
    
    demoSteps.forEach((step, i) => {
      setTimeout(() => {
        this.handleSwap(step);
      }, (i+1) * 1000);
    });
  }

  handleSwap(number) {
    let nums = this.state.numbers;
    this.props.settings.sound === 'on' && clickSound('valid');
    this.setState({ 
      numbers: swapNumbers(nums, number),
      moves: defineMoves(nums),
      movesMade: this.state.movesMade + 1});      
  }

  closeModal() {
    this.props.settings.sound === 'on' && clickSound('valid');
    this.setState({
      modalStyle: {display: 'none'},
      demo: 'off',
    })
  }


  render() {
    const numbers = this.state.numbers;
    const toWin = this.state.toWin;
    return (
      <>
      {this.props.settings.mode === 'counts' ? 
        <MovesCounter movesMade={this.state.movesMade}/> :
        <Timer time={(props) => this.setState({time: props })}/>
      }
      <div className="flex-container">
            {numbers.map((val, i) => 
              <Box
                key={i}
                position={i}
                number={val}
                swap={this.handleSwap}
                moves={this.state.moves}/>
              )
            }
      </div>
      {numbers.every((item, i) => item === toWin[i]) && 
        <div className="modal" style={this.state.modalStyle}>
          <div className="modal-content">
            <span onClick={this.closeModal} className="close">&times;</span>
           <p>Congratulations!</p>
           <p>You solved this puzzle in {this.state.movesMade} moves.</p>
          </div>
        </div>}
        {this.state.demo === 'on' && 
        <div className="modal-autoplay" style={this.state.modalStyle}>
          <div className="modal-autoplay-content">
            <button onClick={this.handleDemo}>Start autoplay</button>
          </div>
        </div>}
      </>
    );
  } 
}