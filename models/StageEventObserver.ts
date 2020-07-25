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
  "newPuyo": StageEvent.NewPuyo,
  "falled": StageEvent.Falled,
  "erased": void,
  "endControl": void,
  "gameover": void
}

type NoneArgEvent = "started"

//EventObserver & Emitter
export class StageEventObserver extends Emittery.Typed<EventDataMap, NoneArgEvent> { }
