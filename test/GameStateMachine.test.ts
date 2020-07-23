import { GameStateMachine } from "../models/GameStateMachine";
import { sleep } from "./testutil";

describe("GameStateMachine", () => {
  let machine: GameStateMachine;
  beforeEach(() => {
    machine = new GameStateMachine();
  });

  it("initial state is 'start", () => {
    expect(machine.currentStete).toBe("start");
  })

  it("even callback is called when transit", async () => {
    //given
    const mock = jest.fn();
    machine.on("newPuyo", () => mock());

    //when
    machine.transit("newPuyo");
    await sleep(1);

    //then
    expect(machine.currentStete).toBe("newPuyo");
    expect(mock).toBeCalled();
  })

  it("cannot transit to Invalid State", () => {
    expect(() => machine.transit("erasing")).toThrow();
  })

});
