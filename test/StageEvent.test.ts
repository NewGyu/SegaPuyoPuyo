import { StageEventObserver } from "../models/StageEventObserver"
import { sleep } from "./testutil";
import { FallingPuyoPuyo } from "../models/Puyo";

describe("StageEvent", () => {
  const observer = new StageEventObserver();

  it("can fire started event", async () => {
    //given
    const spy = jest.fn();
    observer.on("started", () => spy());

    //when
    observer.emit("started");
    await sleep(1);

    //then
    expect(spy).toBeCalled();
  })

  it("can fire newpuyo event", async () => {
    //given
    const spy = jest.fn();
    observer.on("newPuyo", np => spy(np));

    //when
    const newPuyoPuyo = new FallingPuyoPuyo({ x: 0, y: 0 });
    observer.emit("newPuyo", { newPuyoPuyo });
    await sleep(1);

    //then
    expect(spy).toBeCalledWith({ newPuyoPuyo });
  })

})
