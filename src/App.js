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

  generateClickHandler = () => {
    fetch("http://localhost:3001/api/generate")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ board: data });
      })
      .catch(console.log);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Board sudoku={this.state.board} change={this.cellChangeHandler} />
        <button onClick={this.generateClickHandler}>Generate</button>
      </div>
    );
  }
}

export default App;
