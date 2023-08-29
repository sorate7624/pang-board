import * as actionTypes from '../actions/actionTypes';

const initialState = {
  updateContent: '',
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_UPDATE_CONTENT:
      return {
        ...state,
        updateContent: action.content,
      };
    default:
      return state;
  }
};

export default detailReducer;
