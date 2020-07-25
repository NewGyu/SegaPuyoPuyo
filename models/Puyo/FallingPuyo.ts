import { Puyo, PuyoColor, Position } from "./Base";

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
    public position: Position,
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

  private movablePuyoPosition(centerPos: Position, angle: PuyoAngle) {
    return {
      x: centerPos.x + Math.round(Math.cos(angle.radian)),
      y: centerPos.y - Math.round(Math.sin(angle.radian))
    }
  }


  //回転する
  rotateClockwise() {
    this._angle = this._angle.add(-90);
    this.movablePuyo.position = this.movablePuyoPosition(this.centerPuyo.position, this._angle);
  }

  rotateCounterClock() {
    this._angle = this._angle.add(90);
    this.movablePuyo.position = this.movablePuyoPosition(this.centerPuyo.position, this._angle);
  }

  private determineColor(): PuyoColor {
    return Math.floor(Math.random() * colors) + 1;
  }
}

//落ちぷよ
export class FallingPuyo extends Puyo {
  moveHorizontal(destX: number) {
    this.position.x = destX;
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
