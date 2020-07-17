import { AppSettings } from "~/settings/settings"
import { Puyo, PuyoColor, FallingPuyo } from "./Puyo"
import { Puyobserver, PuyoEvent } from "./PuyoEvent"

//ぷよがないからのマス
class EmptyCell {
  static INSTANCE = new EmptyCell()
}

//GameBoardのマス
type Cell = Puyo | EmptyCell;

/**
 * GameBoardは cols x rows のCellの二次元配列
 */
class GameBoard {
  private _eventEmitter = new Puyobserver();
  private _board: Cell[][];
  private _stackedEvents: PuyoEvent.AnyEvent[] = new Array();
  private readonly emit = this._eventEmitter.emit;
  private readonly pushEvent = this._stackedEvents.push;

  constructor(cols: number, rows: number) {
    //Initialize game board
    let b = new Array<Array<Cell>>(rows);
    for (let i = 0; i < b.length; i++) {
      b[i] = new Array<Cell>(cols).fill(EmptyCell.INSTANCE);
    }
    this._board = b;

    this._eventEmitter.on("moved", this.onMoved);
    this._eventEmitter.on("erased", this.onErased);
    this._eventEmitter.on("createdNew", this.onCreatedNew);
  }

  get board() { return this._board }
  get fallingPuyo(): Puyo | null { return null }

  putNewPuyo() {
    const newPuyo = new FallingPuyo(PuyoColor.Blue, { x: 1, y: 1 }, this._eventEmitter.emit);
    this.emit("createdNew", { newPuyo });
  }

  //ぷよが動いたときのイベントハンドラ
  private onMoved(event: PuyoEvent.Moved) {
    this.pushEvent(event);
  }

  //ぷよが消えたときのイベントハンドラ
  private onErased(event: PuyoEvent.Erased) {
    this.pushEvent(event);
  }

  private onCreatedNew(event: PuyoEvent.CreatedNew) {
    this.pushEvent(event);
  }

}

export const GAME_BOARD = new GameBoard(AppSettings.stageCols, AppSettings.stageRows);

