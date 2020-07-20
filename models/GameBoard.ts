import { Puyo, Position } from "./Puyo"
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
export class GameBoard {
  private readonly _board: Cell[][];

  constructor(private cols: number, private rows: number) {
    //Initialize game board
    let b = new Array<Array<Cell>>(rows);
    for (let i = 0; i < b.length; i++) {
      b[i] = new Array<Cell>(cols).fill(EmptyCell.INSTANCE);
    }
    this._board = b;
  }


  cell(pos: Position) {
    if (!this.isInRange(pos))
      return EmptyCell.INSTANCE;
    return this._board[pos.y][pos.y];
  }

  isEmptyCell(pos: Position) {
    return (this.cell(pos) == EmptyCell.INSTANCE)
  }

  isInRange(pos: Position) {
    return pos.y >= 0
      && pos.y <= this.rows
      && pos.x >= 0
      && pos.x <= this.cols;
  }

  putPuyo(puyo: Puyo) {
    if (!this.isInRange(puyo.position))
      return;
    console.log(puyo);
    this._board[puyo.position.y][puyo.position.x] = puyo;
  }

  putEmpty(pos: Position) {
    this._board[pos.y][pos.x] = EmptyCell.INSTANCE;
  }

  testdump() {
    this._board.forEach(row => console.log(row));
  }
}
