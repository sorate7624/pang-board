import * as actionTypes from './actionTypes';

export const setTitle = (title) => ({
  type: actionTypes.SET_TITLE,
  title,
});

export const setContent = (content) => ({
  type: actionTypes.SET_CONTENT,
  content,
});
