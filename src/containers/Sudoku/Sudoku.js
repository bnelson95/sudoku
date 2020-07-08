import React, { Component } from "react";
import "./Sudoku.css";
import Board from "../../components/Board/Board";
import { connect } from "react-redux";
import * as actions from "./store/actions";

class Sudoku extends Component {
  state = {
    toggleNew: false,
  };

  onToggleNew = () => {
    this.setState({ ...this.state, toggleNew: !this.state.toggleNew });
  };

  render() {
    const generateMenuClass = `dropdown-menu${this.state.toggleNew ? " show" : ""}`;
    return (
      <div>
        <div className='control-bar dropdown btn-group mx-3 text-center'>
          <button
            className='btn btn-outline-dark dropdown-toggle'
            data-toggle='dropdown'
            onClick={this.onToggleNew}>
            Generate
          </button>
          <div className={generateMenuClass}>
            <button className='dropdown-item' onClick={this.props.onGenerateClicked}>
              Easy (TODO)
            </button>
            <button className='dropdown-item' onClick={this.props.onGenerateClicked}>
              Medium (TODO)
            </button>
            <button className='dropdown-item' onClick={this.props.onGenerateClicked}>
              Hard (TODO)
            </button>
          </div>
        </div>
        <div className='btn-group text-center'>
          <button
            className='btn btn-outline-dark'
            onClick={() => this.props.onHintClicked(this.props.board)}>
            Hint
          </button>
          <button
            className='btn btn-outline-dark'
            onClick={() => this.props.onSolveClicked(this.props.board)}>
            Solve
          </button>
          <button className='btn btn-outline-dark' onClick={this.props.onClearClicked}>
            Clear
          </button>
        </div>
        <div className='container text-center'>
          <Board board={this.props.board} change={this.props.onCellChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.sudoku.board,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCellChange: (cell) => dispatch(actions.updateCell(cell)),
    onClearClicked: () => dispatch(actions.clearBoard()),
    onGenerateClicked: () => dispatch(actions.newBoard()),
    onHintClicked: (board) => dispatch(actions.getHint(board)),
    onSolveClicked: (board) => dispatch(actions.solveBoard(board)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sudoku);
