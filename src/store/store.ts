import { configureStore } from "@reduxjs/toolkit";
import placeSlice from './placeSlice';

const store = configureStore({
  reducer: {
    places: placeSlice,
  },
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
