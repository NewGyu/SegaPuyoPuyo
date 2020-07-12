//ぷよの色
export enum PuyoColor {
  Green = 1,
  Blue,
  Purple,
  Red,
  Yellow,
}

//ぷよそのもの
export class Puyo {
  color: PuyoColor;

  constructor(color: PuyoColor) {
    this.color = color;
  }
}
