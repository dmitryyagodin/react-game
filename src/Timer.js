import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      gamesPlayed: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.gamesPlayed !== state.gamesPlayed) {
      return { gamesPlayed: props.gamesPlayed,
               time: 0,
      };
    }
    return null;
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
      <>
      {this.state.gamesPlayed === 0 ?
      <div className="play-stats">TIME: 00:00</div> : 
      <div className="play-stats">TIME: {this.state.time}</div>}
      </>
    );
  }
}