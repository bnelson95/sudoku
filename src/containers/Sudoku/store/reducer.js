import * as actionTypes from "./actions";

const initialState = {
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

const reducer = (state = initialState, action) => {
  console.log(action);
  const newBoard = [...state.board];
  switch (action.type) {
    case actionTypes.CELL_CHANGE:
      newBoard[action.cell.y][action.cell.x] = Number(action.cell.value);
      return { ...state, board: newBoard };

    case actionTypes.BOARD_CLEAR:
      newBoard.forEach((row) => row.fill(0));
      return { ...state, board: newBoard };

    case actionTypes.BOARD_SET:
      return { ...state, board: action.board };

    default:
      return { ...state };
  }
};

export default reducer;
