export const CELL_CHANGE = "CELL_CHANGE";
export const BOARD_CLEAR = "BOARD_CLEAR";
export const BOARD_SET = "BOARD_SET";

export const updateCell = (cell) => {
  return {
    type: CELL_CHANGE,
    cell: cell,
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
      body: JSON.stringify({ difficulty: difficulty })
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
      body: JSON.stringify({ board: board }),
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
      body: JSON.stringify({ board: board }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(setBoard(data)))
      .catch(console.log);
  };
};
