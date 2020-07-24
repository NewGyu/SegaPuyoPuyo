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
    if (!this.isInGameArea(pos))
      return EmptyCell.INSTANCE;
    return this._board[pos.y][pos.x];
  }

  isEmptyCell(pos: Position) {
    return (this.cell(pos) == EmptyCell.INSTANCE)
  }

  //指定されたposはゲームエリア内であればtrue
  isInGameArea(pos: Position) {
    return pos.y >= 0
      && pos.y < this.rows
      && pos.x >= 0
      && pos.x < this.cols;
  }

  //ぷよをボードに配置
  putPuyo(puyo: Puyo) {
    if (!this.isInGameArea(puyo.position))
      return;
    console.log(puyo);
    this._board[puyo.position.y][puyo.position.x] = puyo;
  }

  //空セルを配置
  putEmpty(pos: Position) {
    this._board[pos.y][pos.x] = EmptyCell.INSTANCE;
  }

  testdump() {
    const dumpCell = (cell: Cell) => {
      if (cell === EmptyCell.INSTANCE)
        return "_";
      return "p";
    }
    const header = " :" + [...Array(this.cols).keys()].join(" ");
    const body = this._board.map((row, i) => {
      return `${i}:` + row.map(dumpCell).join(" ");
    });

    console.log([header, ...body]);
  }
}
