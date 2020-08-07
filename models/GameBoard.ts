import { Puyo, CellPosition } from "./Puyo"

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

  constructor(public readonly cols: number, public readonly rows: number) {
    //Initialize game board
    let b = new Array<Array<Cell>>(rows);
    for (let i = 0; i < b.length; i++) {
      b[i] = new Array<Cell>(cols).fill(EmptyCell.INSTANCE);
    }
    this._board = b;
  }

  get puyoList() {
    return this._board.map(row => {
      return row.filter(cell => cell !== EmptyCell.INSTANCE).map(cell => cell as Puyo)
    }).flat();
  }

  cell(pos: CellPosition) {
    if (!this.isInGameArea(pos))
      return EmptyCell.INSTANCE;
    return this._board[pos.y][pos.x];
  }

  isEmptyCell(pos: CellPosition) {
    return (this.cell(pos) == EmptyCell.INSTANCE)
  }

  //指定されたposはゲームエリア内であればtrue
  isInGameArea(pos: CellPosition) {
    return pos.y >= 0
      && pos.y < this.rows
      && pos.x >= 0
      && pos.x < this.cols;
  }

  //ぷよをボードに配置
  putPuyo(puyo: Puyo) {
    if (!this.isInGameArea(puyo.cellPos))
      return;
    console.log(puyo);
    this._board[puyo.cellPos.y][puyo.cellPos.x] = puyo;
  }

  //空セルを配置
  putEmpty(pos: CellPosition) {
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
