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

  solveClickHandler = () => {
    fetch("http://localhost:3001/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: this.state.board }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ board: data });
      })
      .catch(console.log);
  };

  clearClickHandler = () => {
    const board = [...this.state.board];
    board.forEach((row) => row.fill(0));
    this.setState({ board: board });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Board board={this.state.board} change={this.cellChangeHandler} />
        <button onClick={this.generateClickHandler}>Generate</button>
        <button onClick={this.solveClickHandler}>Solve</button>
        <button onClick={this.clearClickHandler}>Clear</button>
      </div>
    );
  }
}

export default App;
