import * as actionTypes from './actionTypes';

export const setBoardList = (boardList) => ({
  type: actionTypes.SET_BOARD_LIST,
  boardList,
});

export const setIsHovering = (isHovering) => ({
  type: actionTypes.SET_IS_HOVERING,
  isHovering,
});

export const setColumns = (columns) => ({
  type: actionTypes.SET_COLUMNS,
  columns,
});

export const setRows = (rows) => ({
  type: actionTypes.SET_ROWS,
  rows,
});

export const setLikes = (likes) => ({
  type: actionTypes.SET_LIKES,
  likes,
});

export const setTotalRow = (totalRow) => ({
  type: actionTypes.SET_TOTAL_ROW,
  totalRow,
});
