import { PuyoColor, FallingPuyo, PuyoAngle, FallingPuyoPuyo, RotateDirection } from "~/models/Puyo"

describe("FallingPuyo", () => {
  let org: FallingPuyo;
  beforeEach(() => {
    org = new FallingPuyo(
      PuyoColor.Blue,
      100,
      120
    );
  })

  it("only left is changed when moveHorizontal", () => {
    //given
    //when
    const moved = org.moveHorizontalPx(10);

    //then
    expect({ top: moved.top, left: moved.left }).toStrictEqual({ top: org.top, left: org.left + 10 })
  });

  it("only top is changed when moveVertical", () => {
    //when
    const moved = org.moveVerticalPx(20);

    //then
    expect({ top: moved.top, left: moved.left }).toStrictEqual({ top: org.top + 20, left: org.left })
  });



});

describe("FallingPuyoPuyo", () => {
  describe("when created new", () => {
    const newPuyoPuyo = new FallingPuyoPuyo(
      { x: 2, y: 0 },
    );
    it("movable puyo is placed 'up'", () => {
      expect(newPuyoPuyo.centerPuyo.cellPos).toStrictEqual({ x: 2, y: 0 });
      expect(newPuyoPuyo.movablePuyo.cellPos).toStrictEqual({ x: 2, y: -1 });
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
      newPuyoPuyo.rotate(RotateDirection.Clockwise);
      expect(newPuyoPuyo.angle.degree).toBe(0);
      expect(newPuyoPuyo.centerPuyo.cellPos).toStrictEqual({ x: 2, y: 0 });
      expect(newPuyoPuyo.movablePuyo.cellPos).toStrictEqual({ x: 3, y: 0 });
    });
    it("CounterClock, MovablePuyo is placed on the left", () => {
      newPuyoPuyo.rotate(RotateDirection.ConterClock);
      expect(newPuyoPuyo.angle.degree).toBe(180);
      expect(newPuyoPuyo.centerPuyo.cellPos).toStrictEqual({ x: 2, y: 0 });
      expect(newPuyoPuyo.movablePuyo.cellPos).toStrictEqual({ x: 1, y: 0 });
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
