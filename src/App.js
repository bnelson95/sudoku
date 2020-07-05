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
    isGenerateOpen: false,
  };

  cellChangeHandler = (event, x, y) => {
    const board = [...this.state.board];
    board[y][x] = Number(event.target.value);
    this.setState({ board: board });
  };

  generateMenuClickHandler = () => {
    this.setState({ isGenerateOpen: !this.state.isGenerateOpen });
  };

  generateClickHandler = () => {
    fetch(process.env.REACT_APP_API_URL + "/generate")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ board: data, isGenerateOpen: false });
      })
      .catch(console.log);
  };

  solveClickHandler = () => {
    fetch(process.env.REACT_APP_API_URL + "/solve", {
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

  hintClickHandler = () => {
    fetch(process.env.REACT_APP_API_URL + "/hint", {
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
    const generateMenuClass = `dropdown-menu${this.state.isGenerateOpen ? " show" : ""}`;
    return (
      <div>
        <nav className='navbar navbar-dark bg-dark'>
          <span className='navbar-brand mb-0 h1'>Sudoku</span>
          <div>
            <div className='dropdown btn-group mx-3'>
              <button
                className='btn btn-outline-light dropdown-toggle'
                data-toggle='dropdown'
                onClick={this.generateMenuClickHandler}>
                Generate
              </button>
              <div className={generateMenuClass}>
                <button className='dropdown-item' onClick={this.generateClickHandler}>
                  Easy (TODO)
                </button>
                <button className='dropdown-item' onClick={this.generateClickHandler}>
                  Medium (TODO)
                </button>
                <button className='dropdown-item' onClick={this.generateClickHandler}>
                  Hard (TODO)
                </button>
              </div>
            </div>
            <div className='btn-group text-center'>
              <button className='btn btn-outline-light' onClick={this.solveClickHandler}>
                Solve
              </button>
              <button className='btn btn-outline-light' onClick={this.hintClickHandler}>
                Hint
              </button>
              <button className='btn btn-outline-light' onClick={this.clearClickHandler}>
                Clear
              </button>
            </div>
          </div>
        </nav>
        <div className='container text-center'>
          <Board board={this.state.board} change={this.cellChangeHandler} />
        </div>
      </div>
    );
  }
}

export default App;
