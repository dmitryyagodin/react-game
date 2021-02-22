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
    this.state = { 
      number: this.props.number,
    }
  }

  handleClick(event) {
    const clickedValue = event.target.value;
    console.log("Clicked: ", clickedValue)
    if (clickedValue !== null) {
      this.props.move(clickedValue);
      this.setState({number: null});
    }
  }
  
  render() {
    return (
      <button className="flex-item" onClick={this.handleClick} value={this.props.number}>
        {this.props.number}
      </button>
    )
  }
}
  
const swapNumbers = function(nums, number) {  
  let numIndex = nums.indexOf(number);
  let nullIndex = nums.indexOf(0);
  [nums[numIndex], nums[nullIndex]] = [nums[nullIndex], nums[numIndex]];
  console.log("Swapped: ", nums)
  
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
      <button onClick={this.handleClick}>
        {this.state.firstGame ? 'Start' : 'New game' }
      </button>
    )
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 0]
    }
  }

  handleStart(numbers) {
    // console.log("NUMBER IN handleStart", numbers)
    this.setState({numbers: numbers});
  }  

  handleMove(number) {
    let nums = this.state.numbers;
    this.setState({ numbers: swapNumbers(nums, number)})} 
  
  render() {
    const numbers = this.state.numbers;
    return (
      <React.Fragment>
        <StartButton start={this.handleStart}/> 
        <div className="flex-container">
          {numbers.map((val, i) => 
            <Box key={i+1} number={val} move={this.handleMove}/>)}
        </div>
      </React.Fragment>
    );
  }
}
  
ReactDOM.render(<Board />, document.getElementById('root'));