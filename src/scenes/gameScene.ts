import { TILE_SIZE } from "../index";

export class GameScene extends Phaser.Scene {
  player!: Phaser.GameObjects.GameObject;

  constructor() {
    super({key: "GameScene"});
  }

  preload() {
    this.load.image("player", "assets/images/man.png");
  }

  create() {
    this.add.sprite(TILE_SIZE * 10, TILE_SIZE * 10, "player");
  }
}
