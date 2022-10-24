import { TILE_SIZE, WORLD_SIZE } from "../index";

enum MoveDirection {
  None = 0,
  Up = 1,
  Right = (1 << 1),
  Down = (1 << 2),
  Left = (1 << 3)
}

type DirectionDelta = {
  x: number,
  y: number
}

const DirectionDeltas = {
  Up: {x: 0, y: -1},
  Right: {x: 1, y: 0},
  Down: {x: 0, y: 1},
  Left: {x: -1, y: 0}
}

export class GameScene extends Phaser.Scene {
  player!: Phaser.GameObjects.Sprite;
  obstacleLayer!: Phaser.Tilemaps.TilemapLayer;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  #moves: DirectionDelta[] = [];
  #playerPos = {x: 3, y: 3};
  #playerMoving = MoveDirection.None;

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
    let moveDirs = MoveDirection.None;

    if (this.cursors.left!.isDown) {
      moveDirs |= MoveDirection.Left;
    }
    if (this.cursors.right!.isDown) {
      moveDirs |= MoveDirection.Right;
    }
    if (this.cursors.up!.isDown) {
      moveDirs |= MoveDirection.Up;
    }
    if (this.cursors.down!.isDown) {
      moveDirs |= MoveDirection.Down;
    }

    const newDir = moveDirs & ~this.#playerMoving;

    if (newDir > 0) {
      if (newDir & MoveDirection.Left)
        this.#moves.push(DirectionDeltas.Left);
      if (newDir & MoveDirection.Right) {
        this.#moves.push(DirectionDeltas.Right);
      }
      if (newDir & MoveDirection.Up)
        this.#moves.push(DirectionDeltas.Up);
      if (newDir & MoveDirection.Down)
        this.#moves.push(DirectionDeltas.Down);
    }

    if (this.#moves.length > 0) {
      this.tryToMoveTo(this.#moves.shift() as DirectionDelta);
    }

    this.#playerMoving = moveDirs;
  }

  tryToMoveTo(dir: DirectionDelta) {
    if (this.isDirectionBlocked(dir) || this.isOutOfBound(dir)) return;

    this.#playerPos.x += dir.x;
    this.#playerPos.y += dir.y;

    this.player.x = this.#playerPos.x * TILE_SIZE;
    this.player.y = this.#playerPos.y * TILE_SIZE;
  }

  isDirectionBlocked = (dir: DirectionDelta) => !!this.obstacleLayer.getTileAt(this.#playerPos.x + dir.x, this.#playerPos.y + dir.y);

  isOutOfBound = (dir: DirectionDelta) =>
    this.#playerPos.x + dir.x < 0 ||
    this.#playerPos.y + dir.y < 0 ||
    this.#playerPos.x + dir.x >= WORLD_SIZE ||
    this.#playerPos.y + dir.y >= WORLD_SIZE;
}
