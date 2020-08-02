import { FallingPuyo, PuyoColor, FixedPuyo, Puyo } from "~/models/Puyo";

describe("GameBoard", () => {
  it("can check out of area", () => {
    const board = new GameBoard(2, 3);

    expect(board.isInGameArea({ x: 0, y: 0 })).toBeTruthy();
    expect(board.isInGameArea({ x: 1, y: 1 })).toBeTruthy();
    expect(board.isInGameArea({ x: 1, y: 2 })).toBeTruthy();
    expect(board.isInGameArea({ x: 2, y: 2 })).toBeFalsy();
    expect(board.isInGameArea({ x: 0, y: -1 })).toBeFalsy();
  })

  it("initial puyoList is empty", () => {
    //given
    const board = new GameBoard(6, 7);

    //then
    expect(board.puyoList).toStrictEqual([])
  })

  it("can put puyo", () => {
    //given
    const board = new GameBoard(6, 7);
    const mockEmitFunc = jest.fn();

    const puyos: Puyo[] = [
      new FallingPuyo(PuyoColor.Blue, { x: 1, y: 1 }, mockEmitFunc),
      new FallingPuyo(PuyoColor.Red, { x: 1, y: 0 }, mockEmitFunc),
      new FixedPuyo(PuyoColor.Purple, { x: 5, y: 6 }, mockEmitFunc)
    ]
    //when
    puyos.forEach(p => board.putPuyo(p));
    //then
    expect(board.isEmptyCell({ x: 0, y: 0 })).toBeTruthy();
    expect(board.isEmptyCell({ x: 1, y: 1 })).toBeFalsy();
    expect(board.cell({ x: 1, y: 1 })).toStrictEqual(puyos[0]);
    expect(board.cell({ x: 1, y: 0 })).toStrictEqual(puyos[1]);
    expect(board.cell({ x: 5, y: 6 })).toStrictEqual(puyos[2]);

    //左上から行ごとにリスト化される
    expect(board.puyoList).toStrictEqual([puyos[1], puyos[0], puyos[2]]);
  })
})
