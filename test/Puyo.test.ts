import { Puyo, PuyoColor, FallingPuyo } from "../models/Puyo"
import { Puyobserver, PuyoEvent } from "../models/PuyoEvent"
import { sleep } from "./testutil";

import Emittery from "emittery";

describe("Puyo", () => {
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

describe("PuyoColor", () => {
  it("count of PuyoColor is 5", () => {
    expect(Object.keys(PuyoColor).length / 2).toBe(5);
  });
});
