import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      playerOne: true,
      winnner: ''
    };
  }

  onClick = (x, y, event) => {
    if (!this.state.winnner) {
      console.log(this.state.matrix[y][x]);
      if (this.state.playerOne) {
        const newMatrix = [...this.state.matrix];
        newMatrix[y][x] = 1;
        this.setState({ matrix: newMatrix, playerOne: false });
      } else {
        const newMatrix = [...this.state.matrix];
        newMatrix[y][x] = -1;
        this.setState({ matrix: newMatrix, playerOne: true });
      }
      this.checkWin();
    }
  }

  checkWin = () => {
    for (let x = 0; x < 3; x++) {
      let count = 0;
      for (let y = 0; y < 3; y++) {
        count = count + this.state.matrix[y][x];
        if (count === 3) {
          this.setState({ winnner: 'player one' });
          return;
        }
        if (count === -3) {
          this.setState({ winnner: 'player two' });
          return;
        }
      }
    }

    for (let y = 0; y < 3; y++) {
      let count = 0;
      for (let x = 0; x < 3; x++) {
        count = count + this.state.matrix[y][x];
        if (count === 3) {
          this.setState({ winnner: 'player one' });
          return;
        }
        if (count === -3) {
          this.setState({ winnner: 'player two' });
          return;
        }
      }
    }

    let countSlashOne = 0;
    for (let x = 0; x < 3; x++) {
      countSlashOne = countSlashOne + this.state.matrix[x][x];
      if (countSlashOne === 3) {
        this.setState({ winnner: 'player one' });
        return;
      }
      if (countSlashOne === -3) {
        this.setState({ winnner: 'player two' });
        return;
      }
    }

    let countSlashTwo = 0;
    for (let x = 2, y = 0; x >= 0, y < 3; x-- , y++) {
      countSlashTwo = countSlashTwo + this.state.matrix[y][x];
      if (countSlashTwo === 3) {
        this.setState({ winnner: 'player one' });
        return;
      }
      if (countSlashTwo === -3) {
        this.setState({ winnner: 'player two' });
        return;
      }
    }
  }





  render() {
    return (
      <div>
        {
          this.state.matrix.map((row, rowindex) => {
            return <div key={rowindex} className='row'>
              {
                row.map((ele, elindex) => {
                  if (ele === 1) {
                    return <div key={elindex} className='playerone'>
                    </div>

                  } else if (ele === -1) {
                    return <div key={elindex} className='playertwo'>
                    </div>

                  } else {
                    return <div key={elindex} className='squre' onClick={(e) => {
                      this.onClick(elindex, rowindex, e);
                    }}>
                    </div>
                  }
                })
              }</div>
          })
        }
        <h3>winner: {this.state.winnner}</h3>
      </div>
    );
  }
}

export default App;
