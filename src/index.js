import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
     {props.value}
    </button>
  );
}
  
  class Board extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xToken: true
    }
    }
    renderSquare(i) {
      return <Square value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />
    }
    handleClick(i) {
      const squareCopy = this.state.squares.slice();
      if(calculateWinner(squareCopy) || squareCopy[i]) {
        return;
      }
      squareCopy[i] = this.state.xToken ? 'X' : 'O';
      this.setState(
        {squares: squareCopy,
          xToken: !this.state.xToken
        });
        
    }
    
    render() {
      const winner = calculateWinner(this.state.squares);
      let status = winner ? winner + ' wins!' : 'Next player: ' + (this.state.xToken ? 'X' : 'O');
      if(!winner && this.state.squares.every((value) => {return value !== null}) )
          status = 'nobody wins.';

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  