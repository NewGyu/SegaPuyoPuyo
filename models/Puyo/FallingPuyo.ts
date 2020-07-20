import { Puyo, PuyoColor, Position } from "./Base";
import { PuyoEvent } from "../PuyoEvent";

//ぷよの色の種類数（Enum要素数を出す小技）
const colors = Object.keys(PuyoColor).length / 2;

//二個セットの落ちぷよ
export class FallingPuyoPuyo {
  private _centerPuyo: FallingPuyo;
  private _movablePuyo: FallingPuyo;
  private _angle = new PuyoAngle(90);

  public get centerPuyo() { return this._centerPuyo }
  public get movablePuyo() { return this._movablePuyo }

  constructor(
    public position: Position,
    private eventEmit: PuyoEvent.EmitFunc,
  ) {
    this._centerPuyo = new FallingPuyo(
      this.determineColor(),
      position,
      eventEmit
    );
    this._movablePuyo = new FallingPuyo(
      this.determineColor(),
      { x: position.x, y: position.y - 1 },
      eventEmit
    )
  }

  private movablePuyoPosition(centerPos: Position, angle: PuyoAngle) {
    return {
      x: centerPos.x + Math.cos(angle.radian),
      y: centerPos.y + Math.sin(angle.radian)
    }
  }


  //回転する
  rotate() {

  }

  private determineColor(): PuyoColor {
    return Math.floor(Math.random() * colors) + 1;
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

//落ちぷよぷよの角度
//right:0, up:90, left:180, down:270
export class PuyoAngle {
  private _degree: number;

  constructor(val: number) {
    this._degree = this.normarize(val)
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
