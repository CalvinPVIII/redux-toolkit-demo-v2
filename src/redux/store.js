import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playersSlice";
export const store = configureStore({
  reducer: {
    players: playerReducer,
  },
});
