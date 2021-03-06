import { FallingPuyoPuyo } from "./Puyo"
import Emittery from "emittery"

export namespace StageEvent {
  export type NewPuyo = {
    newPuyoPuyo: FallingPuyoPuyo
  }
  export type Falled = {

  }
}

type EventDataMap = {
  "new puyo is put": StageEvent.NewPuyo,
  "falled": StageEvent.Falled,
  "erased": void,
  "gameover": void
}


type NoneArgEvent = "started" | "doing puyopuyo" | "end control";

//EventObserver & Emitter
export class StageEventObserver extends Emittery.Typed<EventDataMap, NoneArgEvent> { }
