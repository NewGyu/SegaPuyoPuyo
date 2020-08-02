import { PuyoColor, FallingPuyo, PuyoAngle, FallingPuyoPuyo } from "~/models/Puyo/index"
import { sleep } from "./testutil";


describe("FallingPuyo", () => {
  it("moved event is fired when being moved", async () => {
    //given
    const spy = jest.fn();
    const p = new FallingPuyo(
      PuyoColor.Blue,
      { x: 1, y: 1 },
    );
    //when
    p.moveHorizontal(3);
    await sleep(1); //sleep is necessary to fire the event

    //then
    expect(p.position).toStrictEqual({ x: 3, y: 1 });
  });
});

describe("FallingPuyoPuyo", () => {
  describe("when created new", () => {
    const newPuyoPuyo = new FallingPuyoPuyo(
      { x: 2, y: 0 },
    );
    it("movable puyo is placed 'up'", () => {
      expect(newPuyoPuyo.centerPuyo.position).toStrictEqual({ x: 2, y: 0 });
      expect(newPuyoPuyo.movablePuyo.position).toStrictEqual({ x: 2, y: -1 });
    });

    it("angle is 90 degree", () => {
      expect(newPuyoPuyo.angle.degree).toBe(90);
    });
  });
  describe("when rotated", () => {
    let newPuyoPuyo: FallingPuyoPuyo;

    beforeEach(() => {
      newPuyoPuyo = new FallingPuyoPuyo(
        { x: 2, y: 0 },
      );
    });

    it("Clockwise, MovablePuyo is placed on the right", () => {
      newPuyoPuyo.rotateClockwise();
      expect(newPuyoPuyo.angle.degree).toBe(0);
      expect(newPuyoPuyo.centerPuyo.position).toStrictEqual({ x: 2, y: 0 });
      expect(newPuyoPuyo.movablePuyo.position).toStrictEqual({ x: 3, y: 0 });
    });
    it("CounterClock, MovablePuyo is placed on the left", () => {
      newPuyoPuyo.rotateCounterClock();
      expect(newPuyoPuyo.angle.degree).toBe(180);
      expect(newPuyoPuyo.centerPuyo.position).toStrictEqual({ x: 2, y: 0 });
      expect(newPuyoPuyo.movablePuyo.position).toStrictEqual({ x: 1, y: 0 });
    });
  });
});

describe("angle", () => {
  it("degree is normarized", () => {
    expect(new PuyoAngle(90).degree).toBe(90);
    expect(new PuyoAngle(-90).degree).toBe(270);
    expect(new PuyoAngle(810).degree).toBe(90);
  })

  it("radian is from 0 to 2*PI", () => {
    expect(new PuyoAngle(90).radian).toBe(Math.PI / 2);
    expect(new PuyoAngle(180).radian).toBe(Math.PI);
    expect(new PuyoAngle(360).radian).toBe(0);
  })

  it("'add' create new instance", () => {
    const a = new PuyoAngle(90);
    const added = a.add(180);

    expect(added.degree).toBe(270);
    expect(added).not.toBe(a);
  });
})
