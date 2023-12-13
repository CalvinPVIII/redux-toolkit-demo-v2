import { playersSelector } from "../redux/playersSlice";
import { expect, describe, test } from "vitest";

const state = {
  players: [{ name: "Scoot Henderson", number: 0 }],
};

describe("selectors", () => {
  test("should return all players in the playersSlice", () => {
    const playersList = playersSelector(state);
    expect(playersList).toEqual([{ name: "Scoot Henderson", number: 0 }]);
  });
});
