import { configureStore } from '@reduxjs/toolkit';
import toolkitReducer from '../toolkit/slice';

const store = configureStore({
     reducer: {
          info: toolkitReducer,
     },
});

export default store;