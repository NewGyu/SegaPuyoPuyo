import { Puyo, PuyoColor, FallingPuyo } from "../models/Puyo"
import { Puyobserver, PuyoEvent } from "../models/PuyoEvent"
import { sleep } from "./testutil";

import Emittery from "emittery";

describe("Puyo", () => {
  const emitter = new Puyobserver();

  it("puyo", async () => {
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
    await sleep(1);

    //then
    expect(p.position).toStrictEqual({ x: 3, y: 1 });
    expect(spy).toBeCalledWith({ startX: 1, destX: 3 });

  });
});
