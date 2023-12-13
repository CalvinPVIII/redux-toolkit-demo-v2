import playersReducer, { addPlayer, removePlayer } from "../redux/playersSlice";
import { expect, describe, test } from "vitest";

describe("playersSlice", () => {
  test("add a player to the list of players", () => {
    const initialState = [];
    const updatedState = playersReducer(initialState, addPlayer({ name: "Scoot Henderson", number: 0 }));
    expect(updatedState).toEqual([{ name: "Scoot Henderson", number: 0 }]);
  });

  test("remove a player from the list of players", () => {
    const initialState = [
      { name: "Scoot Henderson", number: 0 },
      { name: "Damian Lillard", number: 0 },
    ];
    const updatedState = playersReducer(initialState, removePlayer("Damian Lillard"));
    expect(updatedState).toEqual([{ name: "Scoot Henderson", number: 0 }]);
  });
});
