const Title = () => <h1>8 PUZZLE</h1>;

const backgroundMusic = new Audio('./background.ogg')
const errorSound = new Audio('audio/error.mp3');
const clickSound = new Audio('audio/click.mp3');
const slideSound = new Audio('audio/slide.mp3');

class Form extends React.Component {
  constructor(props) {
    super(props);
    // this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      Level: 'Easy',
      Mode: 'Timed',
      Theme: 'Light'
    }
  }

  // onValueChange(event) {
  //   const state = event.target.name;
  //   this.setState({
  //      event.target.value
  //   });
  // }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedPlayMode)
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <fieldset>
          <h2>Level</h2>
          <div className="play-mode-settings">
            
            <div className="radio">
              <label>
                <input type="radio" value="Easy" name="Level" checked={this.state.Level === "Easy"}
                  onChange={() => this.setState({Level: 'Easy'})} />
                Easy
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Medium" name="Level" checked={this.state.Level === "Medium"}
                  onChange={() => this.setState({Level: 'Medium'})}
                />
                Medium
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Hard" name="Level" checked={this.state.Level === "Hard"}
                  onChange={() => this.setState({Level: 'Hard'})} />
                Hard
              </label>
            </div>
          </div>
          <h2>Play mode</h2>
          <div className="play-mode-settings">
            
            <div className="radio">
              <label>
                <input type="radio" value="Timed" name="Mode" checked={this.state.Mode === "Timed"}
                  onChange={() => this.setState({Mode: 'Timed'})} />
                Timed
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Counted" name="Mode" checked={this.state.Mode === "Counted"}
                  onChange={() => this.setState({Mode: 'Counted'})}
                />
                Counted
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Demo" name="Mode" checked={this.state.Mode === "Demo"}
                  onChange={() => this.setState({Mode: 'Demo'})} />
                Demo
              </label>
            </div>
          </div>
          <h2>Color Theme</h2>
          <div className="play-mode-settings">
            
            <div className="radio">
              <label>
                <input type="radio" value="Light" name="Theme" checked={this.state.Theme === "Light"}
                  onChange={() => this.setState({Theme: 'Light'})} />
                Light
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="Theme" value="Dark" checked={this.state.Theme === "Dark"}
                  onChange={() => this.setState({Theme: 'Dark'})}
                />
                Dark
              </label>
            </div>
          </div>
          <button className="controls-btn" type="submit">
            Apply
          </button>
        </fieldset>
      </form>
    );
  }
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.closeSettings = this.closeSettings.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.state = {
      style: {width: '0%'},
      muted: true,
    }
  }

  toggleSound() {
    const muted = this.state.muted;
    this.setState({muted: !muted});
    this.props.toggle(muted)
  }
  
  closeSettings() {
    slideSound.play();
    this.setState({style: {width: '0%'}});
  }

  openSettings() {
    slideSound.play();
    this.setState({style: {width: '100%'}})
   }

  render() {
    return (
      <div>
        <div id="settings-div" className="overlay" style={this.state.style}>
          <span className="closebtn" onClick={this.closeSettings}>&times;</span>
          <div className="overlay-content">
            <Form />
          </div>
        </div>
        <span
            onClick={this.openSettings}
            style={{fontSize: 30, cursor: 'pointer'}}>
              &#9776;
        </span>
        <span>
        <i
          onClick={this.toggleSound}
          className={this.state.muted ? "fa fa-volume-off" : "fa fa-volume-up"}
          style={{fontSize: 30,
            cursor: 'pointer',
            float: 'right'}}></i>
        </span>
      </div>
    );
  }
}

class DemoButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      autoPlay: true
    }
  }
  
  handleClick() {
    clickSound.play();
    const demoNumbers = [3, 4, 2, 5, 1, 6, 7, 8, null];
    this.props.demo(demoNumbers);
  }

  render() {
    return (
      <button className="controls-btn" onClick={this.handleClick}>
        DEMO
      </button>
    );
  }
}

const MovesCounter = (props) => <p>{props.movesMade}</p> 

// check if the generated ordered array can be solved with the game rules
function puzzleSolvable(nums) {
    let arr = [...nums];
    let count = 0;
    let swapped;

    do {
        swapped = false;
  
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i+1]) {
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                count++;
                swapped = true;
            }
        }

        arr.length -= 1;
    } while (swapped);
  
    return count % 2 === 0 // if the count is odd puzzle is unsolvable https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
  }

// put integers from 1 to 8 in a randomly ordered array  
function createRandomNums() {
  let arr = [];

  while (arr.length < 8) {
    let randomNumber = Math.floor(Math.random() * 8 + 1);
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  }

  return puzzleSolvable(arr) ? arr : createRandomNums();
}
  
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleErrorClick = this.handleErrorClick.bind(this);
  }

  handleErrorClick() {
    errorSound.play()
  }

  handleClick(event) {
    const clickedValue = event.target.value;
        
    if (clickedValue) {
      this.props.swap(clickedValue);
      this.setState({visibility: 'hidden'});
    }
  }
  
  render() {
    return (
      <button
        className="flex-item"
        style={{visibility: this.props.number ? 'visible' :'hidden'}}
        onClick={this.props.moves.includes(this.props.position) ? this.handleClick : this.handleErrorClick}
        value={this.props.number}
        moves={this.props.moves}>
        {this.props.number}
      </button>
    )
  }
}
  
function swapNumbers(nums, number) {  
  let numIndex = nums.indexOf(+number);
  let nullIndex = nums.indexOf(null);
  [nums[numIndex], nums[nullIndex]] = [nums[nullIndex], nums[numIndex]];
  
  return nums
}

class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      numbers: [],
      firstGame: true
    }
  }

  handleClick() {
    clickSound.play();
    let newNumbers = createRandomNums();
    let randomIndexForNull = Math.floor(Math.random() * 8);
    newNumbers.splice(randomIndexForNull, 0, null)
    this.props.start(newNumbers);
    this.setState({
      numbers: newNumbers,
      firstGame: false
    });
  }

  render() {
    return (
      <button
        className="controls-btn"
        onClick={this.handleClick}>
          {this.state.firstGame ? 'PLAY' : <i className="fa fa-refresh"></i>}
      </button>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwap = this.handleSwap.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleSound = this.handleSound.bind(this);
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
      possibleClicks: [],
      movesMade: 0,
      soundIsOn: false
    }
  }

  handleSound(toggle) {
    this.setState({soundIsOn: toggle});
  }

  handleDemo(demoNumbers) { 
    this.setState({
      numbers: demoNumbers,
      possibleClicks: [],
      movesMade: 0
    });

    let demoSteps = [6, 2, 4, 3, 5, 1, 3, 4, 2, 3, 4, 5, 1, 4, 5, 2, 3, 6];
    demoSteps.forEach((step, i) => {
      setTimeout(() => {
        this.handleSwap(step);
      }, (i+1) * 1000);
    });
  }

  handleStart(randomNumbers) {
    this.state.soundIsOn && backgroundMusic.play();    
    this.setState({
      numbers: randomNumbers,
      possibleClicks: this.definePossibleMoves(randomNumbers),
      movesMade: 0
    });
  }

  definePossibleMoves(randomNumbers) {
    let nullIndex = randomNumbers.indexOf(null);
    let moves;
    switch (nullIndex) {
      case 0:
        moves = [1, 3];
        break;
      case 1:
        moves = [0, 2, 4];
        break;
      case 2:
        moves = [1, 5];
        break;
      case 3:
        moves = [0, 4, 6];
        break;
      case 4:
        moves = [1, 3, 5, 7];
        break;
      case 5:
        moves = [2, 4, 8];
        break;
      case 6:
        moves = [3, 7];
        break;
      case 7:
        moves = [4, 6, 8];
        break;
      case 8:
        moves = [5, 7]
        break;
    }

    return moves
}

  handleSwap(number) {
    let nums = this.state.numbers;
    this.state.soundIsOn && clickSound.play();
    this.setState({ 
      numbers: swapNumbers(nums, number),
      possibleClicks: this.definePossibleMoves(nums),
      movesMade: this.state.movesMade + 1});
  }

  
  render() {
    // const goal = '123456780';
    const numbers = this.state.numbers;
    return (
      <React.Fragment>
        <Title />
        <Settings toggle={this.handleSound}/>
        <div className='controls-div'>
          <StartButton start={this.handleStart} />
          <MovesCounter movesMade={this.state.movesMade}/>
          <DemoButton demo={this.handleDemo}/>
        </div>
        <div className="flex-container">
          {numbers.map((val, i) => 
            <Box
              key={i}
              position={i}
              number={val}
              swap={this.handleSwap}
              moves={this.state.possibleClicks} />)}
        </div>
      </React.Fragment>
    );
  }
}
  
ReactDOM.render(<App />, document.getElementById('root'));