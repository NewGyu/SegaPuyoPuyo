import { Puyobserver, PuyoEvent } from "../models/PuyoEvent"
import { sleep } from "./testutil";

describe("Puyobserver", () => {
  it("emit will call the callback func", async () => {
    //given
    const emitter = new Puyobserver();
    const spyCallback = jest.fn();
    emitter.on("moved", ev => spyCallback(ev));

    //when
    emitter.emit("moved", { startX: 10, destX: 15 });

    await sleep(1);

    //then
    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

  it("emitFunc will call the callback func", async () => {
    //given
    const emitter = new Puyobserver();
    const spyCallback = jest.fn();
    emitter.on("moved", ev => spyCallback(ev));

    //bind is required
    const emitFunc = emitter.emit.bind(emitter);

    //when
    emitFunc("moved", { startX: 10, destX: 15 });

    await sleep(1);

    //then
    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

})
