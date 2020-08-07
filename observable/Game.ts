import Vue from "vue"
import { Stage } from "~/models/Stage"
import { GameBoard } from "~/models/GameBoard";
import { AppSettings } from "~/settings/settings";
import { Puyo, FallingPuyoPuyo } from "~/models/Puyo";


class GameState {
  available = false;
  puyoList = Array<Puyo>();
  fallingPuyoPuyo: FallingPuyoPuyo | null = null;
  start = () => stage.start();
}

//Reaciveなオブジェクトにするため
export const Game = Vue.observable(new GameState());

const stage = new Stage(
  new GameBoard(AppSettings.stageCols, AppSettings.stageRows)
)

stage.on('started', () => {
  Game.available = true;
})

stage.on('new puyo is put', ({ newPuyoPuyo }) => {
  Game.fallingPuyoPuyo = newPuyoPuyo;
  Game.puyoList = stage.board.puyoList;
})

stage.on("doing puyopuyo", () => {
  playingLoop();
})

function playingLoop() {
  const grounded = stage.freeFall({ direction: undefined, rotate: undefined });
  Game.fallingPuyoPuyo = stage.fallingPuyoPuyo;
  if (!grounded) {
    requestAnimationFrame(playingLoop)
  }
}
