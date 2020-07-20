import { PuyoColor, FallingPuyo, PuyoAngle } from "../models/Puyo"
import { Puyobserver } from "../models/PuyoEvent"
import { sleep } from "./testutil";


describe("FallingPuyo", () => {
  const emitter = new Puyobserver();

  it("moved event is fired when being moved", async () => {
    //given
    const spy = jest.fn();
    emitter.on("moved", ev => { spy(ev); });
    const p = new FallingPuyo(
      PuyoColor.Blue,
      { x: 1, y: 1 },
      emitter.emit.bind(emitter)
    );
    //when
    p.moveHorizontal(3);
    await sleep(1); //sleep is necessary to fire the event

    //then
    expect(p.position).toStrictEqual({ x: 3, y: 1 });
    expect(spy).toBeCalledWith({ startX: 1, destX: 3 });
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
