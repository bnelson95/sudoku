import React, { Component } from "react";
import "./App.css";
import Board from "./Board/Board";

class App extends Component {
  state = {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  };

  cellChangeHandler = (event, x, y) => {
    const board = [...this.state.board];
    board[y][x] = Number(event.target.value);
    this.setState({ board: board });
  };

  render() {
    return (
      <div>
        <Board
          sudoku={this.state.board}
          change={this.cellChangeHandler}
        />
      </div>
    );
  }
}

export default App;
