import './App.css';
import React from 'react';
import GameField from './GameField';
import Settings from './Settings';
import Play from './Play';
import Intro from './Intro';
import rs_school_js from './rs_school_js.svg';
import Timer from './Timer';
import swapNumbers from './swapNumbers.js';
import defineMoves from './defineMoves.js';
import clickSound from './clickSound';
import { VscGithubAlt } from "react-icons/vsc";
import playWin from "./playWin.js";

// import getLocalStorage from './getLocalStorage';

class App extends React.Component {
  constructor(props) {
    super(props);    
    this.updateSettings = this.updateSettings.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.state = {
      modalStyle: {display: 'block'},
      sound: 'off',
      mode: 'default',
      stats: 'counts',
      theme: 'light',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      toWin: [],
      autoplay: false,
      time: 0,
      movesMade: 0,
      moves: [],
      gamesPlayed: 0,
      gameLevel: 0,
    }
  }

  // componentDidMount() {
  //   getLocalStorage && this.setState(getLocalStorage);    
  // }


  updateSettings(settings) {
    this.setState(settings);
    this.setState({
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      moves: [],
      movesMade: 0,
      toWin: [],
      gamesPlayed: 0,
    });
  }

  handleStart(newNumbers) {
    this.setState({
      numbers: newNumbers,
      movesMade: 0,
      toWin: [1, 2, 3, 4, 5, 6, 7, 8, null],
      moves: defineMoves(newNumbers),
      gamesPlayed: this.state.gamesPlayed + 1,
      modalStyle: {display: 'block'},
    });
  }

  handleDemo(demoNumbers) {
    this.setState({
      numbers: demoNumbers[0],
      possibleClicks: [],
      movesMade: 0,
      toWin: [1, 2, 3, 4, 5, 6, 7, 8, null],
    });

    let demoSteps = demoNumbers[1];

    demoSteps.forEach((step, i) => {
      setTimeout(() => {
        this.handleSwap(step);
      }, (i+1) * 1000);
    });
  }

  handleSwap(number) {
    let nums = this.state.numbers;
    let toWin = this.state.toWin;
    this.state.sound === 'on' && clickSound('valid');
    this.setState({ 
      numbers: swapNumbers(nums, number),
      moves: defineMoves(nums),
      movesMade: this.state.movesMade + 1});
    nums.every((item, i) => item === toWin[i]) && playWin();
  }

  closeModal() {
    this.state.sound === 'on' && clickSound('valid');
    this.setState({
      modalStyle: {display: 'none'},
      demo: 'off',
      gameLevel: this.state.gameLevel + 1,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      moves: [],
      movesMade: 0,
      toWin: [],
      gamesPlayed: 0,
    })
    if (this.state.gameLevel === 10) {
      alert("You mastered all the levels! Try playing random sets as much as you want.")
      this.setState({gameLevel: 0});
    }
  }


  render () {
    const numbers = this.state.numbers;
    const toWin = this.state.toWin;
    const movesMade = this.state.movesMade;

    return (
      <div className={this.state.theme === 'dark' ? 'App dark' : 'App'}>
        <header className="App-header">
          <h1 className={this.state.theme}>8 PUZZLE</h1> 
        </header>
        <h2>{this.state.mode === 'random' ? 'RANDOM' : 'LEVEL ' + (this.state.gameLevel + 1)}</h2>
        <div className='controls-div'>
         <Play
            start={this.handleStart}
            demo={this.handleDemo}
            gameLevel={this.state.gameLevel}
            theme={this.state.theme}
            mode={this.state.mode}
            sound={this.state.sound} />
          <div className="stats-info">
            {this.state.stats === 'counts' ? 
              <div id="count-stats">Count: {this.state.movesMade}</div> :
              
              <Timer id="time-stats" gamesPlayed={this.state.gamesPlayed} time={(props) => this.setState({time: props})}/>
            }
          </div>
        </div>
        <GameField
          numbers={this.state.numbers}
          moves={this.state.moves}
          toWin={this.state.toWin}
          swap={this.handleSwap}
          sound={this.state.sound} />

        { numbers.every((item, i) => item === toWin[i]) && 
        <div className="modal" style={this.state.modalStyle}>
            <div className="modal-content">
              <span onClick={this.closeModal} className="close">&times;</span>
            <p>Congratulations!</p>
            <p>You solved this puzzle in 
             {this.state.stats === 'counts' ? " " + movesMade + " moves" :
              " " + this.state.time + " seconds. (Sorry! I haven't figured out yet how to stop the timer)"}</p>
            </div>

        </div>}
        <Settings settings={this.updateSettings}/>
        <Intro />   
        <footer className="App-footer">
          <div className="footer-div">
            <div><a href="https://rs.school/react/"><img src={rs_school_js} alt="RS School logo" style={{height: '5vh', float: 'right'}}/></a></div>
            <div>Dmitry Yagodin <br></br>2021</div>
            <a href="https://github.com/dmitryyagodin"><VscGithubAlt/></a>
          </div>
        </footer>
      </div>
    );    
  }
}

export default App;
