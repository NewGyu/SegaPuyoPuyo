import Emittery from 'emittery'


export type GameState = "start" | "falling" | "erasing"
  | "newPuyo" | "puyopuyo" | "gameover";

interface Transition {
  from: GameState
  to: GameState
}

const TransitionMap: Transition[] = [
  { from: "start", to: "newPuyo" },
  { from: "newPuyo", to: "puyopuyo" },
  { from: "newPuyo", to: "gameover" },
  { from: "puyopuyo", to: "falling" },
  { from: "falling", to: "erasing" },
  { from: "erasing", to: "falling" },
  { from: "erasing", to: "newPuyo" }
]

export class GameStateMachine {
  private current: GameState = "start";
  private readonly emitter = new Emittery.Typed<never, GameState>();
  on = this.emitter.on.bind(this.emitter);

  get currentStete() { return this.current }
  //状態遷移する
  transit(nextState: GameState) {
    if (!TransitionMap.find(e => e.from === this.current && e.to === nextState))
      throw new Error(`InvalidTransition: ${this.current}=>${nextState} `);

    console.log(`${this.current} => ${nextState}`)
    this.current = nextState;
    this.emitter.emit(nextState);
  }
}
