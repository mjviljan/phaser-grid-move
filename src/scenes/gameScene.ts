import { TILE_SIZE } from "../index";

export class GameScene extends Phaser.Scene {
  player!: Phaser.GameObjects.GameObject;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  #playerMoving = false;

  constructor() {
    super({key: "GameScene"});
  }

  preload() {
    this.load.image("player", "assets/images/man.png");
  }

  create() {
    this.player = this.add.sprite(TILE_SIZE * 10.5, TILE_SIZE * 10.5, "player");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.#playerMoving) {
      if (this.cursors.left!.isDown) {
        this.player.x -= TILE_SIZE;
      } else if (this.cursors.right!.isDown) {
        this.player.x += TILE_SIZE;
      }

      if (this.cursors.up!.isDown) {
        this.player.y -= TILE_SIZE;
      } else if (this.cursors.down!.isDown) {
        this.player.y += TILE_SIZE;
      }
    }

    this.#playerMoving = (this.cursors.left!.isDown || this.cursors.right!.isDown || this.cursors.up!.isDown || this.cursors.down!.isDown);
  }
}
