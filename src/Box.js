import React from 'react';
import clickSound from './clickSound';

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleErrorClick = this.handleErrorClick.bind(this);
  }

  
  handleErrorClick() {
    this.props.sound === 'on' && clickSound('error');
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
        onClick={this.props.moves.includes(this.props.position) ? this.handleClick : this.handleErrorClick}
        value={this.props.number}
        style={this.props.number ? null : {backgroundColor: 'white', borderStyle: 'none'}}
        moves={this.props.moves}>
        {this.props.number}
      </button>
    )
  }
}