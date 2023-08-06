import * as actionTypes from './actionTypes';

export const setId = (id) => ({
  type: actionTypes.SET_ID,
  id,
});

export const setPassword = (password) => ({
  type: actionTypes.SET_PASSWORD,
  password,
});

export const setErrorSignin = (errorSignin) => ({
  type: actionTypes.SET_ERROR_SIGNIN,
  errorSignin,
});

export const setErrorSignup = (errorSignup) => ({
  type: actionTypes.SET_ERROR_SIGNUP,
  errorSignup,
});

export const setSuccessSignup = (successSignup) => ({
  type: actionTypes.SET_SUCCESS_SIGNUP,
  successSignup,
});

export const setEyeIconVisible = (eyeIconVisible) => ({
  type: actionTypes.SET_EYE_ICON_VISIBLE,
  eyeIconVisible,
});

export const setIsSigninActive = (isSigninActive) => ({
  type: actionTypes.SET_IS_SIGNIN_ACTIVE,
  isSigninActive,
});
