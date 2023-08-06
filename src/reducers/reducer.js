// reducer.js
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  id: '',
  password: '',
  errorSignin: '',
  errorSignup: '',
  successSignup: '',
  eyeIconVisible: false,
  isSigninActive: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ID:
      return { ...state, id: action.id };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.password };
    case actionTypes.SET_ERROR_SIGNIN:
      return { ...state, errorSignin: action.errorSignin };
    case actionTypes.SET_ERROR_SIGNUP:
      return { ...state, errorSignup: action.errorSignup };
    case actionTypes.SET_SUCCESS_SIGNUP:
      return { ...state, successSignup: action.successSignup };
    case actionTypes.SET_EYE_ICON_VISIBLE:
      return { ...state, eyeIconVisible: action.eyeIconVisible };
    case actionTypes.SET_IS_SIGNIN_ACTIVE:
      return { ...state, isSigninActive: action.isSigninActive };
    default:
      return state;
  }
};

export default reducer;
