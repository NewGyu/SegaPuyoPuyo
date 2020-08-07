import { GameBoard } from "./GameBoard"
import { FallingPuyoPuyo } from "./Puyo";
import { GameStateMachine, GameState } from "./GameStateMachine";
import { StageEventObserver } from "./StageEvent";
import { AppSettings } from "~/settings/settings";

const fallingSpeed = AppSettings.playerFallingSpeed;
const fallingPlus = AppSettings.playerDownSpeed;

export class Stage {
  private readonly _observer: StageEventObserver = new StageEventObserver();
  public on = this._observer.on.bind(this._observer);
  private emitStageEvent = this._observer.emit.bind(this._observer);

  private readonly _stateMachine: GameStateMachine = new GameStateMachine();
  private transitState = this._stateMachine.transit.bind(this._stateMachine);
  private onState = this._stateMachine.on.bind(this._stateMachine);
  private _fallingPuyoPuyo: FallingPuyoPuyo | null = null;

  get fallingPuyoPuyo() { return this._fallingPuyoPuyo }

  constructor(
    public board: GameBoard,
  ) {
    this.onState("newPuyo", () => {
      const initialPosition = { x: 2, y: 0 };
      if (!this.board.isEmptyCell(initialPosition)) {
        this.transitState("gameover");
        return;
      }

      this._fallingPuyoPuyo = new FallingPuyoPuyo(initialPosition);
      this.emitStageEvent("new puyo is put", { newPuyoPuyo: this._fallingPuyoPuyo })
      return this.transitState("puyopuyo");
    });

    this.onState("puyopuyo", () => {
      this.emitStageEvent("doing puyopuyo");
    })
  }

  //開始する
  start() {
    this.transitState("newPuyo");
    this.emitStageEvent("started");
  }

  /**
   * 落ちぷよを自由落下させる
   * @param ctrl 落ちぷよ中の操作
   * @returns 着床したらtrue
   */
  freeFall(ctrl: PuyoCtrl): boolean {
    if (!this.fallingPuyoPuyo)
      return true;
    if (this._stateMachine.currentStete !== "puyopuyo")
      return true;

    //落下速度で落ちたらどこに到達するか先に計算
    const moved = this.fallingPuyoPuyo.fallingDown(AppSettings.playerDownSpeed);

    const bottomLine = this.board.rows - 1;
    if (moved.centerPuyo.cellPos.y > bottomLine
      || moved.movablePuyo.cellPos.y > bottomLine
    ) {
      //落ちた先が最下層ラインを超えるなら着床
      this.transitState("falling");
      this.emitStageEvent("end control")
      return true;
    }

    //落ちを確定
    this._fallingPuyoPuyo = moved;
    return false;
  }

  //Fixedぷよを落とす
  freeDrop() {

  }

  //消せるぷよを消す
  erase() {

  }

}

export interface PuyoCtrl {
  direction: "left" | "right" | "dows" | undefined
  rotate: "clock" | "counterClock" | undefined
}
