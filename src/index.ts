import { GameScene } from "./scenes/gameScene";

export const TILE_SIZE = 32;
export const WORLD_SIZE = 24;

export function startGame() {
  const config: Phaser.Types.Core.GameConfig = {
    title: "Grid move example",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: TILE_SIZE * WORLD_SIZE,
      height: TILE_SIZE * WORLD_SIZE,
    },
    parent: "game",
    scene: [GameScene],
  };

  return new Phaser.Game(config);
}
