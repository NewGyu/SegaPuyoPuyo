import { AppSettings } from "~/settings/settings";

export const CellSize = {
  width: AppSettings.puyoImgWidth,
  height: AppSettings.puyoImgHeight
} as const

//ゲームボードのセル上の座標系
export interface CellPosition {
  x: number,
  y: number
}

//ぷよ全般
export abstract class Puyo {
  readonly top: number;
  readonly left: number;

  constructor(color: PuyoColor, position: CellPosition);
  constructor(color: PuyoColor, top: number, left: number);
  constructor(public color: PuyoColor, arg1: any, arg2?: any) {
    if ((arg1 as CellPosition).x !== undefined) {
      const pos = arg1 as CellPosition;
      this.top = pos.y * CellSize.height;
      this.left = pos.x * CellSize.width;
      return
    }

    this.top = arg1 as number;
    this.left = arg2 as number;
  }
  get bottom() {
    return this.top + CellSize.height;
  }

  get right() {
    return this.left + CellSize.width;
  }
  /**
   * どのセル位置になるか
   */
  get cellPos() {
    return {
      x: Math.floor(this.left / CellSize.width),
      y: Math.floor(this.top / CellSize.height)
    }
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
