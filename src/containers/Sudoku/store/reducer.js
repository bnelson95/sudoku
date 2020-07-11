import * as actionTypes from "./actions";

// INITIALIZATION -----------------------------------------

var makeCell = () => {
  return { value: 0, selected: false, notes: [] };
};

var makeInitialBoard = () => {
  var result = [];
  for (var i = 0; i < 9; i++) {
    result[i] = [];
    for (var j = 0; j < 9; j++) {
      result[i][j] = makeCell();
    }
  }
  return result;
};

const initialState = {
  board: makeInitialBoard(),
};

// UTILITY FUNCTIONS --------------------------------------

const toggleCellSelected = (board, x, y) => {
  board[y][x].selected = !board[y][x].selected;
};

const applyToAll = (board, func) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      func(cell);
    });
  });
};

const applyToSelected = (board, func) => {
  applyToAll(board, (cell) => {
    if (cell.selected) {
      func(cell);
    }
  });
};

const toggleValue = (board, number) => {
  applyToSelected(board, (cell) => {
    if (cell.value === number) {
      cell.value = 0;
    } else {
      cell.value = number;
      cell.notes = [];
    }
  });
};

const toggleNote = (board, number) => {
  applyToSelected(board, (cell) => {
    if (cell.notes.includes(number)) {
      var index = cell.notes.indexOf(number);
      if (index > -1) {
        cell.notes.splice(index, 1);
      }
    } else {
      cell.notes.push(number);
      cell.notes.sort();
      cell.value = 0;
    }
  });
};

const clearSelection = (board) => {
  applyToAll(board, (cell) => {
    cell.selected = false;
  });
};

const clearValues = (board) => {
  applyToAll(board, (cell) => {
    cell.value = 0;
  });
};

const clearNotes = (board) => {
  applyToAll(board, (cell) => {
    cell.notes = [];
  });
};

const clearBoard = (board) => {
  clearSelection(board);
  clearValues(board);
  clearNotes(board);
}

// REDUCER SWITCH -----------------------------------------

const reducer = (state = initialState, action) => {
  console.log(action);
  console.log(state);
  const newBoard = [...state.board];
  switch (action.type) {
    case actionTypes.CELL_SELECT:
      if (!newBoard[action.cell.y][action.cell.x].selected) {
        clearSelection(newBoard);
      }
      toggleCellSelected(newBoard, action.cell.x, action.cell.y);
      return { ...state, board: newBoard };

    case actionTypes.NUMBER_APPLY:
      if (action.noteMode) {
        toggleNote(newBoard, action.number);
      } else {
        toggleValue(newBoard, action.number);
      }
      return { ...state, board: newBoard };

    case actionTypes.SELECTION_CLEAR:
      clearSelection(newBoard);
      return { ...state, board: newBoard };

    case actionTypes.BOARD_CLEAR:
      clearBoard(newBoard);
      return { ...state, board: newBoard };

    case actionTypes.BOARD_SET:
      clearBoard(newBoard);
      newBoard.forEach((row, y) => {
        row.forEach((cell, x) => {
          cell.value = action.board[y][x];
        });
      });
      return { ...state, board: newBoard };

    default:
      return { ...state };
  }
};

export default reducer;
