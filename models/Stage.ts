import { GameBoard } from "./GameBoard"
import { Puyobserver, PuyoEvent } from "./PuyoEvent";
import { AppSettings } from "~/settings/settings";
import { FallingPuyoPuyo } from "./Puyo";

class Stage {
  private readonly _observer: Puyobserver;
  private _stackedEvents: PuyoEvent.AnyEvent[] = new Array();
  private readonly pushEvent = this._stackedEvents.push;

  constructor(
    public board: GameBoard,
    observer: Puyobserver
  ) {
    this._observer = observer

    this._observer.on("moved", this.onMoved.bind(this));
    this._observer.on("erased", this.onErased.bind(this));
    this._observer.on("createdNew", this.onCreatedNew.bind(this));

  }

  putNewPuyo() {
    const initialPosition = { x: 2, y: 0 };
    if (!this.board.isEmptyCell(initialPosition))
      return;

    const newPuyoPuyo = new FallingPuyoPuyo(initialPosition, this._observer.emit.bind(this));
    this._observer.emit("createdNew", { newPuyo: newPuyoPuyo.centerPuyo });
    this._observer.emit("createdNew", { newPuyo: newPuyoPuyo.movablePuyo });
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
    this.board.putPuyo(event.newPuyo);
    this.pushEvent(event);
    this.board.testdump()
  }

}

export const STAGE = new Stage(
  new GameBoard(AppSettings.stageCols, AppSettings.stageRows),
  new Puyobserver()
)


