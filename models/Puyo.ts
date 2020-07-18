import { PuyoEvent } from "~/models/PuyoEvent";

//ぷよそのもの
export class Puyo {

  constructor(
    public color: PuyoColor,
    public position: Position,
    protected eventEmit: PuyoEvent.EmitFunc
  ) {
  }

  clone(): Puyo {
    return { ...this };
  }
}

//着地済みぷよ
export class FixedPuyo extends Puyo {
  fallDown(dest: Position) {
    this.eventEmit("falledDown", {})
  }
}

//落ちぷよ
export class FallingPuyo extends Puyo {
  moveHorizontal(destX: number) {
    console.log(this.eventEmit)
    this.eventEmit("moved", {
      startX: this.position.x,
      destX
    });

    this.position.x = destX;
  }
}

//ぷよの色
export enum PuyoColor {
  Green = 1,
  Blue,
  Purple,
  Red,
  Yellow,
}

export interface Position {
  x: number,
  y: number
}
