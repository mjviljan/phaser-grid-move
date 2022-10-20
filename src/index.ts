import { GameScene } from "./scenes/gameScene";

export const TILE_SIZE = 32;

export function startGame() {
  const config: Phaser.Types.Core.GameConfig = {
    title: "Grid move example",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: TILE_SIZE * 24,
      height: TILE_SIZE * 24,
    },
    parent: "game",
    scene: [GameScene],
  };

  return new Phaser.Game(config);
}
