import * as actionTypes from '../actions/actionTypes';

const initialState = {
  boardList: [],
  isHovering: false,
  columns: [],
  rows: [],
  likes: false,
  totalRow: 0,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BOARD_LIST:
      return { ...state, boardList: action.boardList };
    case actionTypes.SET_IS_HOVERING:
      return { ...state, isHovering: action.isHovering };
    case actionTypes.SET_COLUMNS:
      return { ...state, columns: action.columns };
    case actionTypes.SET_ROWS:
      return { ...state, rows: action.rows };
    case actionTypes.SET_LIKES:
      return { ...state, likes: action.likes };
    case actionTypes.SET_TOTAL_ROW:
      return { ...state, totalRow: action.totalRow };
    default:
      return state;
  }
};

export default listReducer;
