import { Entity } from './entity.js';
import { Sprite } from './sprites.js';

export class Player extends Entity {
    #game;

    constructor(game) {
        super();
        this.#game = game;
        const idleSprite = new Sprite('./images/player_idle.png', .6, 525, 525);
        const runSprite = new Sprite('./images/player_run.png', .6, 525, 525, true, 2);
        this.sprites = {idle: idleSprite, run: runSprite};
        this.sprite = idleSprite;
        this.position = {x: 525, y: 525};
        this.moveSpeed = 4;
    }

    destroy(){
        this.#game.gameOver();
    }

    update() {
        this.sprite = this.#game.input.isMoving ? this.sprites.run : this.sprites.idle;
        this.move(this.#game.input.playerDirection, this.moveSpeed);
        console.log(this.position);
    }
}