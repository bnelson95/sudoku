export const CELL_CHANGE = "CELL_CHANGE";
export const CELL_SELECT = "CELL_SELECT";
export const SELECTION_CLEAR = "SELECTION_CLEAR";
export const BOARD_CLEAR = "BOARD_CLEAR";
export const BOARD_SET = "BOARD_SET";
export const NUMBER_APPLY = "NUMBER_APPLY";
export const NOTE_APPLY = "NOTE_APPLY";

export const updateCell = (cell) => {
  return {
    type: CELL_CHANGE,
    cell: cell,
  };
};

export const selectCell = (cell) => {
  return {
    type: CELL_SELECT,
    cell: cell,
  };
};

export const applyNumber = (number, noteMode) => {
  return {
    type: NUMBER_APPLY,
    number: number,
    noteMode: noteMode,
  };
};

export const clearSelection = (cell) => {
  return {
    type: SELECTION_CLEAR,
  };
};

export const clearBoard = () => {
  return {
    type: BOARD_CLEAR,
  };
};

export const setBoard = (board) => {
  return {
    type: BOARD_SET,
    board: board,
  };
};

export const newBoard = (difficulty) => {
  return (dispatch) => {
    fetch(process.env.REACT_APP_API_URL + "/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ difficulty: difficulty }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(setBoard(data)))
      .catch((error) => console.log(error));
  };
};

export const solveBoard = (board) => {
  return (dispatch) => {
    fetch(process.env.REACT_APP_API_URL + "/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: simpleBoard(board) }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(setBoard(data)))
      .catch((error) => console.log(error));
  };
};

export const getHint = (board) => {
  return (dispatch) => {
    fetch(process.env.REACT_APP_API_URL + "/hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: simpleBoard(board) }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(setBoard(data)))
      .catch(console.log);
  };
};

const simpleBoard = (board) => {
  return board.map((row) => {
    return row.map((cell) => {
      return cell.value;
    });
  });
};
