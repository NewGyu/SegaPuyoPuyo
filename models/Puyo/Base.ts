//ぷよ全般
export abstract class Puyo {

  constructor(
    public color: PuyoColor,
    public position: Position,
  ) {
  }

  clone(): Puyo {
    return { ...this };
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
