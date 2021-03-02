import './App.css';
import React from 'react';
import GameField from './GameField';
import Settings from './Settings';
import Play from './Play';
import Demo from './Demo';
// import getLocalStorage from './getLocalStorage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateSettings = this.updateSettings.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.state = {
      sound: 'off',
      level: 'easy',
      mode: 'counts',
      theme: 'light',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      toWin: [],
      demo: 'off',
      time: 0,
    }
  }

  // componentDidMount() {
  //   console.log(getLocalStorage.length)
  //   getLocalStorage && this.setState(getLocalStorage);    
  // }

  updateSettings(settings) {
    this.setState(settings);
  }

  handleStart(newNumbers) {
    this.setState({
      numbers: newNumbers,
      movesMade: 0,
      time: 0,
      toWin: [1, 2, 3, 4, 5, 6, 7, 8, null],
    });
  }


  render () {   
    return (
      <div className={this.state.theme === 'dark' ? 'App dark' : 'App'}>
        <header className="App-header">
          <h1 className={this.state.theme}>8 PUZZLE</h1> 
        </header>
        <span className={this.state.theme === 'dark' ? 'dark' : null}
              style={{textTransform: 'uppercase'}}>"{this.state.level} & {this.state.mode}"</span>
        <div className='controls-div'>
          <Play settings={this.state} start={this.handleStart}/>
          
          {this.state.level !== 'hard' && 
          <Demo settings={this.state} demo={this.handleStart} demoIsOn={() => this.setState({demo: 'on'})}/>}
        </div>
        <GameField
          settings={this.state}
          numbers={this.state.numbers}
          toWin={this.state.toWin}
          time={this.props.time} />
        <Settings settings={this.updateSettings}/>     
        <footer className="App-footer">
          <div >by Dmitry Yagodin <a href="https://github.com/dmitryyagodin">(GitHub)</a></div>
        </footer>
      </div>
    );    
  }
}

export default App;
