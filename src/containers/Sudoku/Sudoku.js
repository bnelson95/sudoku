import React, { Component } from "react";
import "./Sudoku.css";
import Board from "../../components/Board/Board";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

class Sudoku extends Component {
  state = {
    toggleNew: false,
    noteMode: false,
  };

  onToggleNew = () => {
    this.setState({ ...this.state, toggleNew: !this.state.toggleNew });
  };

  onNoteClick = () => {
    this.setState({ ...this.state, noteMode: !this.state.noteMode });
  };

  componentDidMount() {
    this.props.onGenerateClicked(1);
  }

  render() {
    const generateMenuClass = `dropdown-menu${this.state.toggleNew ? " show" : ""}`;
    let selectedCell;
    this.props.board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.selected) {
          selectedCell = cell;
        }
      })
    );
    return (
      <div>
        <div className='row justify-content-center my-3'>
          <div className='control-bar dropdown btn-group mx-3 text-center'>
            <button
              className='btn btn-outline-dark dropdown-toggle'
              data-toggle='dropdown'
              onClick={this.onToggleNew}>
              Generate
            </button>
            <div className={generateMenuClass}>
              <button className='dropdown-item' onClick={() => this.props.onGenerateClicked(1)}>
                Easy
              </button>
              <button className='dropdown-item' onClick={() => this.props.onGenerateClicked(2)}>
                Medium
              </button>
              <button className='dropdown-item' onClick={() => this.props.onGenerateClicked(3)}>
                Hard
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
        </div>
        <div className='row justify-content-center my-3'>
          <button
            className={"btn btn-outline-dark" + (this.state.noteMode ? " active" : "")}
            onClick={this.onNoteClick}
            aria-hidden='true'>
            <FontAwesomeIcon icon={icons.faStickyNote} />
          </button>

          <div className='btn-group btn-matrix text-center mx-3'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
              let extraClasses = "";
              if (selectedCell && selectedCell.notes) {
                if (
                  (this.state.noteMode && selectedCell.notes.includes(number)) ||
                  (!this.state.noteMode && selectedCell.value === number)
                ) {
                  extraClasses = " active";
                }
              }

              return (
                <button
                  className={"btn btn-outline-dark number" + extraClasses}
                  onClick={() => this.props.onNumberClick(number, this.state.noteMode)}>
                  {number}
                </button>
              );
            })}
          </div>
          <button className='btn btn-outline-dark' onClick={() => this.props.onClearSelection()}>
            <FontAwesomeIcon icon={icons.faWindowClose} />
          </button>
        </div>
        <div className='row justify-content-center mx-3'>
          <Board board={this.props.board} click={this.props.onCellSelect} />
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
    onNumberClick: (num, note) => dispatch(actions.applyNumber(num, note)),
    onCellSelect: (cell) => dispatch(actions.selectCell(cell)),
    onClearSelection: () => dispatch(actions.clearSelection()),

    onClearClicked: () => dispatch(actions.clearBoard()),
    onGenerateClicked: (dif) => dispatch(actions.newBoard(dif)),
    onHintClicked: (board) => dispatch(actions.getHint(board)),
    onSolveClicked: (board) => dispatch(actions.solveBoard(board)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sudoku);
