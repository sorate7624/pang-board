import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectBoardList: {},
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECT_BOARD_LIST:
      return { ...state, selectBoardList: action.selectBoardList };
    default:
      return state;
  }
};

export default detailReducer;
