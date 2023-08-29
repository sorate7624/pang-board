import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../reducers/homeReducer';
import listReducer from '../reducers/listReducer';
import detailReducer from '../reducers/detailReducer';
import updateReducer from '../reducers/updateReducer';
import writeReducer from '../reducers/writeReducer';

const store = configureStore({
  reducer: {
    home: homeReducer,
    list: listReducer,
    detail: detailReducer,
    update: updateReducer,
    write: writeReducer,
  },
});

export default store;
