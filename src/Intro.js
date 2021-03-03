import React from 'react';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.closeSettings = this.closeSettings.bind(this);
    this.state = {
      style: {width: '100%'},
    }
  }
  
  closeSettings() {
    this.setState({style: {width: '0%'}});
  }

  render() {
    
    return (
      <>
        <div className="overlay-intro" style={this.state.style}>  
          <div className="overlay-content">
            <div className="intro">
              <h1>8 PUZZLE GAME</h1>
              <br></br>
              <div>MOVE THE NUMBERS BACK TO THIS PATTERN</div>
              <br></br>
              <div>
                <table>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>8</td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <br></br>          
              <div>Have fun!</div>
              <br></br>
              <button className="controls-btn" onClick={this.closeSettings}>START</button>
            </div>              
          </div>
        </div>
      </>
    );
  }
}