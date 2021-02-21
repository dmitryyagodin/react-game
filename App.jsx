class Box extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = { 
        number: this.props.number,
      }
    }
  
    handleClick(event) {
      this.props.move(event.target.value)
      this.setState({number: null})
    }
  
    componentWillReceiveProps(nextProps) {
      if (this.props.number !== nextProps.number) {
        this.setState({number: nextProps.number});
      } 
    } 
   
    
    render() {
      return (
        <button className="flex-item" onClick={this.handleClick}>
          {this.props.number}
        </button>
      )
    }
  }
  
  const swapNumbers = function(nums, number) {
    console.log("ONE ", nums)
    console.log("NUMBER ", number);
    
    let numberIndex = nums.indexOf(number);
    console.log("NUM IND ", numberIndex);
    let nullIndex = nums.indexOf(0);
    [nums[numberIndex], nums[nullIndex]] = [nums[nullIndex], nums[numberIndex]]
    console.log("TWO ", nums)
    return nums
  }
  
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.handleMove = this.handleMove.bind(this);
      this.state = {
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 0]
      }
    }
  
  
    handleMove(number) {
      console.log("Handle ", number);
      let nums = this.state.numbers;
      this.setState({ numbers: swapNumbers(nums, number)})} 
    
    render() {
      const numbers = this.state.numbers;
      return (
        <div className="flex-container">
          {numbers.map((num, i) => 
            <Box key={i+1}
                 number={numbers[i]} 
                 position={i+1}
                 move={this.handleMove}
            />
            )}
        </div>
      );
    }
  }
  
  ReactDOM.render(<Board />, document.getElementById('root'));