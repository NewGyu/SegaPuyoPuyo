import Emittery from 'emittery'

import { Puyo, FallingPuyo } from './Puyo';

export namespace PuyoEvent {
  type TriggerNames = keyof EventDataMap;
  export type AnyEvent = Moved | Erased | Fixed | FalledDown | CreatedNew;
  export type EmitFunc = (eventName: TriggerNames, eventData: AnyEvent) => Promise<void>;

  //落ちぷよが動かされた
  export interface Moved {
    startX: number
    destX: number
  }

  //そろって消えた
  export interface Erased { }

  //落ちぷよが止まった
  export interface Fixed { }

  //Fixぷよが落ちた
  export interface FalledDown { }

  //あたらしい落ちぷよがつくられた
  export interface CreatedNew {
    newPuyo: FallingPuyo
  }
}

//Typed用
type EventDataMap = {
  moved: PuyoEvent.Moved,
  erased: PuyoEvent.Erased,
  createdNew: PuyoEvent.CreatedNew,
  fixed: PuyoEvent.Fixed,
  falledDown: PuyoEvent.FalledDown,
}

//EventObserver & Emitter
export class Puyobserver extends Emittery.Typed<EventDataMap> {
}
