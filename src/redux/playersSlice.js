import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default playersSlice.reducer;

export const { addPlayer } = playersSlice.actions;

export const playersSelector = (state) => state.players;
