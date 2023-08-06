import * as actionTypes from '../actions/actionTypes';

const initialState = {
  title: '',
  content: '',
};

const writeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return { ...state, title: action.title };
    case actionTypes.SET_CONTENT:
      return { ...state, content: action.content };
    default:
      return state;
  }
};

export default writeReducer;
