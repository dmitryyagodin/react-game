import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }

  componentWillUnmount() {
    this.setState({time: 0});
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: this.state.time + 1
    });
    this.props.time(this.state.time);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  render() {
    return (
      <div className="play-stats">TIME: {this.state.time}</div>
    );
  }
}