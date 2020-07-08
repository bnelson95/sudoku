import React, { Component } from "react";
import "./App.css";
import Sudoku from "./containers/Sudoku/Sudoku";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <nav className='navbar navbar-dark bg-dark'>
          <span className='navbar-brand mb-0 h1'>Sudoku</span>
        </nav>
        <Sudoku />
      </div>
    );
  }
}

export default App;
