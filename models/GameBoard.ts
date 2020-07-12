import { AppSettings } from "~/settings/settings"
import { Puyo } from "~/models/Puyo"

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
  private _board: Cell[][];
  constructor(cols: number, rows: number) {
    let b = new Array<Array<Cell>>(rows);
    for (let i = 0; i < b.length; i++) {
      b[i] = new Array<Cell>(cols).fill(EmptyCell.INSTANCE);
    }
    this._board = b;
  }

  get board() { return this._board };
}

export const GAME_BOARD = new GameBoard(AppSettings.stageCols, AppSettings.stageRows);

