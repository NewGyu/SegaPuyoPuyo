import { Puyo, PuyoColor, CellPosition, CellSize } from "./Base";

//ぷよの色の種類数（Enum要素数を出す小技）
const colors = Object.keys(PuyoColor).length / 2;

//二個セットの落ちぷよ
export class FallingPuyoPuyo {
  readonly centerPuyo: FallingPuyo;
  readonly movablePuyo: FallingPuyo;
  readonly angle: PuyoAngle;

  constructor(position: CellPosition);
  constructor(centerPuyo: FallingPuyo, movablePuyo: FallingPuyo, angle: PuyoAngle);
  constructor(arg1: any, movablePuyo?: FallingPuyo, angle?: PuyoAngle) {
    if ((arg1 as CellPosition).x !== undefined) {
      const pos = arg1 as CellPosition;
      this.angle = new PuyoAngle(90);
      this.centerPuyo = new FallingPuyo(this.determineColor(), pos);
      const movablePos = this.movablePuyoPosition(this.centerPuyo, this.angle);
      this.movablePuyo = new FallingPuyo(this.determineColor(), movablePos.top, movablePos.left);
      return;
    }

    this.angle = angle as PuyoAngle;
    this.centerPuyo = arg1 as FallingPuyo;
    this.movablePuyo = movablePuyo as FallingPuyo;
  }

  //センターぷよの位置から可動ぷよの位置を計算
  private movablePuyoPosition(centerPuyo: FallingPuyo, angle: PuyoAngle) {
    return {
      top: centerPuyo.top - Math.round(Math.sin(angle.radian)) * CellSize.height,
      left: centerPuyo.left + Math.round(Math.cos(angle.radian)) * CellSize.width
    }
  }

  //ランダムにぷよの色を設定
  private determineColor(): PuyoColor {
    return Math.floor(Math.random() * colors) + 1;
  }

  //右か左かどちらかに90度回転
  rotate(direction: RotateDirection) {
    const newAngle = this.angle.add(direction);
    const newMovable = this.movablePuyoPosition(this.centerPuyo, newAngle);
    return new FallingPuyoPuyo(
      this.centerPuyo,
      this.movablePuyo.moveTo(newMovable.top, newMovable.left),
      newAngle
    );
  }
}

//回転方向
export enum RotateDirection {
  Clockwise = -90,
  ConterClock = 90
}

//落ちぷよ
export class FallingPuyo extends Puyo {
  moveTo(pos: CellPosition): FallingPuyo;
  moveTo(top: number, left: number): FallingPuyo;
  moveTo(arg1: any, arg2?: any): FallingPuyo {
    if ((arg1 as CellPosition).x !== undefined) {
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
  readonly degree: number;

  constructor(degree: number) {
    this.degree = this.normarize(degree)
  };

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
