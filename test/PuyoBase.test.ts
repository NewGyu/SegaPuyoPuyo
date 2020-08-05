import { PuyoColor, Puyo } from "~/models/Puyo"
import { AppSettings } from "~/settings/settings";

const W = AppSettings.puyoImgWidth;
const H = AppSettings.puyoImgHeight;

describe("Puyo.Base", () => {
  describe("PuyoColor", () => {
    it("count of PuyoColor is 5", () => {
      expect(Object.keys(PuyoColor).length / 2).toBe(5);
    });
  });

  describe("Puyo class", () => {
    it("0,0", () => {
      const r = new PuyoClass(PuyoColor.Red, 0, 0);
      expect(r.top).toBe(0);
      expect(r.left).toBe(0);
      expect(r.bottom).toBe(H);
      expect(r.right).toBe(W);
      expect(r.cellPos).toStrictEqual({ x: 0, y: 0 });
    })
    it("CellPosition is specified", () => {
      const r = new PuyoClass(PuyoColor.Blue, { x: 3, y: 4 });
      expect(r.top).toBe(4 * H);
      expect(r.left).toBe(3 * W);
      expect(r.bottom).toBe(r.top + H);
      expect(r.right).toBe(r.left + W);
      expect(r.cellPos).toStrictEqual({ x: 3, y: 4 });
    })
  });
});

class PuyoClass extends Puyo { }
