import { Puyo, PuyoColor, CellPosition } from "./Base";

//ぷよの色の種類数（Enum要素数を出す小技）
const colors = Object.keys(PuyoColor).length / 2;

//二個セットの落ちぷよ
export class FallingPuyoPuyo {
  private _centerPuyo: FallingPuyo;
  private _movablePuyo: FallingPuyo;
  private _angle = new PuyoAngle(90);

  public get centerPuyo() { return this._centerPuyo }
  public get movablePuyo() { return this._movablePuyo }
  public get angle() { return this._angle }

  constructor(
    public position: CellPosition,
  ) {
    this._centerPuyo = new FallingPuyo(
      this.determineColor(),
      position,
    );

    this._movablePuyo = new FallingPuyo(
      this.determineColor(),
      this.movablePuyoPosition(position, this._angle),
    )
  }

  private movablePuyoPosition(centerPos: CellPosition, angle: PuyoAngle) {
    return {
      x: centerPos.x + Math.round(Math.cos(angle.radian)),
      y: centerPos.y - Math.round(Math.sin(angle.radian))
    }
  }

  //右か左かどちらかに90度回転
  rotate(direction: RotateDirection) {
    this._angle = this._angle.add(direction);
    const rotatedPos = this.movablePuyoPosition(this.centerPuyo.cellPos, this._angle);
    this._movablePuyo = this._movablePuyo.moveTo(rotatedPos);
  }

  private determineColor(): PuyoColor {
    return Math.floor(Math.random() * colors) + 1;
  }
}

export enum RotateDirection {
  Clockwise = -90,
  ConterClock = 90
}

//落ちぷよ
export class FallingPuyo extends Puyo {
  moveTo(pos: CellPosition): FallingPuyo;
  moveTo(top: number, left: number): FallingPuyo;
  moveTo(arg1: any, arg2?: any): FallingPuyo {
    if ((arg1 as CellPosition).x) {
      return new FallingPuyo(this.color, arg1 as CellPosition);
    }
    return new FallingPuyo(this.color, arg1 as number, arg2 as number);
  }
  moveHorizontalPx(px: number) {
    return this.moveTo(this.top, this.left + px);
  }

  moveVerticalPx(px: number) {
    return this.moveTo(this.top + px, this.left);
  }
}

//落ちぷよぷよの角度
//right:0, up:90, left:180, down:270
export class PuyoAngle {
  private _degree: number;

  constructor(degree: number) {
    this._degree = this.normarize(degree)
  };

  public get degree() {
    return this._degree;
  }

  public get radian() {
    return Math.PI * this.degree / 180;
  }

  public add(val: number) {
    return new PuyoAngle(this.degree + val);
  }

  private normarize(v: number) {
    return (v > 0 ? v : 360 + v) % 360;
  }
}
