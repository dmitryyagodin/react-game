function PuzzleSolvable(props) {
    console.log(props.arr);
    let arr = props.arr;
    let count = 0;
    let length = props.arr.length;
    let swapped;
    do {
        swapped = false;
  
        for (let i = 0; i < length; i++) {
            if (arr[i] > arr[i+1]) {
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                count++;
                swapped = true;
            }
        }
        length = length - 1;
    } while (swapped);
  
    return (
        <div>
            {count % 2 ? 'The puzzle is unsolvable' : 'The puzzle can be solved'}
        </div>
    )
      // if the count is odd puzzle is unsolvable https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
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
      if (clickedValue !== 0) {
        this.props.move(clickedValue);
        this.setState({number: 0});
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
  
  function randomNumsArray() {
    let numbers = [];
  
    while (numbers.length < 9) {
      let randomNumber = Math.floor(Math.random() * 9);
      if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
      }
    }
    
    return numbers
  }
  
  const swapNumbers = function(nums, number) {  
    let numIndex = nums.indexOf(number);
    let nullIndex = nums.indexOf('0');
    [nums[numIndex], nums[nullIndex]] = [nums[nullIndex], nums[numIndex]];
    
    return nums
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.handleMove = this.handleMove.bind(this);
      this.state = {
        numbers: ['1', '2', '3', '4', '0', '6', '7', '8', '5']
      }
    }
  
  
    handleMove(number) {
      let nums = this.state.numbers;
      this.setState({ numbers: swapNumbers(nums, number)})} 
    
    render() {
      const numbers = this.state.numbers;
      return (
        <React.Fragment>
          <button onClick={() => this.setState({numbers: randomNumsArray()})}>Restart</button>
          <PuzzleSolvable arr={this.state.numbers}/>
  
          <div className="flex-container">
            {numbers.map((val, i) => 
              <Box key={i+1}
                  number={val}
                  move={this.handleMove}
              />
              )}
          </div>
        </React.Fragment>
      );
    }
  }
  
  ReactDOM.render(<Board />, document.getElementById('root'));