import { PuyoColor } from "~/models/Puyo"

describe("Puyo.Base", () => {
  describe("PuyoColor", () => {
    it("count of PuyoColor is 5", () => {
      expect(Object.keys(PuyoColor).length / 2).toBe(5);
    });
  });
});
