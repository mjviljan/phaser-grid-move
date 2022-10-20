import { TILE_SIZE } from "../index";

type DirectionDelta = {
  x: number,
  y: number
}

const Direction = {
  Up: {x: 0, y: -1},
  Right: {x: 1, y: 0},
  Down: {x: 0, y: 1},
  Left: {x: -1, y: 0}
}

export class GameScene extends Phaser.Scene {
  player!: Phaser.GameObjects.Sprite;
  obstacleLayer!: Phaser.Tilemaps.TilemapLayer;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  #playerPos = {x: 3, y: 3};
  #playerMoving = false;

  constructor() {
    super({key: "GameScene"});
  }

  preload() {
    this.load.image("bg-tiles", "assets/tilesets/world-tiles.png");
    this.load.image("player", "assets/images/character.png");
    this.load.tilemapTiledJSON("first-screen", `assets/maps/test-world.json`);
  }

  create() {
    const map = this.make.tilemap({key: "first-screen"});
    const tiles = map.addTilesetImage("bg-tiles");
    map.createLayer(0, tiles, 0, 0);
    this.obstacleLayer = map.createLayer(1, tiles, 0, 0);

    this.player = this.add.sprite(TILE_SIZE * this.#playerPos.x, TILE_SIZE * this.#playerPos.y, "player");
    this.player.setDisplayOrigin(0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.#playerMoving) {
      if (this.cursors.left!.isDown) {
        this.tryToMoveTo(Direction.Left)
      } else if (this.cursors.right!.isDown) {
        this.tryToMoveTo(Direction.Right)
      } else if (this.cursors.up!.isDown) {
        this.tryToMoveTo(Direction.Up)
      } else if (this.cursors.down!.isDown) {
        this.tryToMoveTo(Direction.Down)
      }
    }

    this.#playerMoving = (this.cursors.left!.isDown || this.cursors.right!.isDown || this.cursors.up!.isDown || this.cursors.down!.isDown);
  }

  tryToMoveTo(dir: DirectionDelta) {
    if (this.isDirectionBlocked(dir)) return;

    this.#playerPos.x += dir.x;
    this.#playerPos.y += dir.y;

    this.player.x = this.#playerPos.x * TILE_SIZE;
    this.player.y = this.#playerPos.y * TILE_SIZE;
  }

  isDirectionBlocked = (dir: DirectionDelta) => !!this.obstacleLayer.getTileAt(this.#playerPos.x + dir.x, this.#playerPos.y + dir.y);
}
