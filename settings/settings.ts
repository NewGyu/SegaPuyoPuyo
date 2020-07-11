// 設定を記載しておくクラス
export namespace AppSettings {
  const defaultPuyoImgWidth = 40; // ぷよぷよ画像の幅
  const defaultPuyoImgHeight = 40; // ぷよぷよ画像の高さ

  export const fontHeight = 33;

  export const stageCols = 6; // ステージの横の個数
  export const stageRows = 12; // ステージの縦の個数

  // フィールドサイズ追加
  // 高さが全部入るように調整
  export const puyoImgHeight = (window.innerHeight - fontHeight) / stageRows
  export const puyoImgWidth = puyoImgHeight;

  export const stageBackgroundColor = '#ffffff'; // ステージの背景色
  export const scoreBackgroundColor = '#24c0bb'; // スコアの背景色

  export const freeFallingSpeed = 16; // 自由落下のスピード
  export const erasePuyoCount = 4; // 何個以上揃ったら消えるか
  export const eraseAnimationDuration = 30; // 何フレームでぷよを消すか

  export const puyoColors = 4; // 何色のぷよを使うか
  export const playerFallingSpeed = 0.9; // プレイ中の自然落下のスピード
  export const playerDownSpeed = 15; // プレイ中の下キー押下時の落下スピード
  export const playerGroundFrame = 20; // 何フレーム接地したらぷよを固定するか
  export const playerMoveFrame = 10; // 左右移動に消費するフレーム数
  export const playerRotateFrame = 10; // 回転に消費するフレーム数

  export const zenkeshiDuration = 150; // 全消し時のアニメーションミリセカンド
  export const gameOverFrame = 3000; // ゲームオーバー演出のサイクルフレーム
}
