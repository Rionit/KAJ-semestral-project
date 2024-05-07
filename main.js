import { Sprite } from './modules/sprites.js';
import { Player } from './modules/player.js';
import { Input } from './modules/input.js';
import { Bullet } from './modules/bullet.js';
import { Enemy } from './modules/enemy.js';
import { Audio } from './modules/audio.js';
import { Leaderboard } from './modules/leaderboard.js';
import { Arcade } from './modules/arcade.js';
import { GPS } from './modules/gps.js';

class Game {
    constructor() {
        this.input = new Input();
        this.audio = new Audio();
        this.leaderboard = new Leaderboard();
        this.arcade = new Arcade();
        this.gps = new GPS();
        this.canvas = document.querySelector(".gameCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(new Sprite('./images/player_test.png', .6, 525, 525, true, 2), this);
        this.titleScreen = new Sprite('./images/title_screen.png');

        this.spawns = [
            {x: 30, y: 465}, {x: 30, y: 525}, {x: 30, y: 585},      // WEST
            {x: 970, y: 465}, {x: 970, y: 525}, {x: 970, y: 585},   // EAST
            {x: 465, y: 30}, {x: 525, y: 30}, {x: 585, y: 30},      // NORTH
            {x: 465, y: 970}, {x: 525, y: 970}, {x: 585, y: 970}    // SOUTH
        ];

        this.bullets = [];
        this.enemies = [];

        this.sprites = {
            background: new Sprite('./images/background.png'),
            player: this.player.sprite
        };

        this.intervalId = null; 
        this.isPlaying = false;
        this.animFrame = 0;
        this.animationSpeed = 400;
        this.bulletTimer = 0;
        this.bulletRate = 8000; // Interval between bullets in milliseconds

        this.score = 0;

        this.enemySpawnTimer = this.randomTime(3000, 8000); // Initial delay before spawning the first enemy
        this.elapsedTimeSinceSpawn = 0;

        this.setup();
    }

    setup() {
        let width = 1000;
        let height = 1000;
        this.createCanvas(width, height);
        this.drawSprite(this.titleScreen);
    }

    gameOver() {

        this.pauseAnimating();

        const playerName = prompt("Game Over! Enter your name:");

        if (playerName && playerName.trim() !== "") {
            this.leaderboard.addPlayer(playerName, this.score);
            this.restart();
        } else {
            alert("Please enter a valid name.");
            this.gameOver();
        }
    }

    restart() {
        // Reset score to zero
        this.score = 0;

        // Delete all enemies and bullets
        this.enemies = [];
        this.bullets = [];

        // Reset input
        this.input.reset();

        // Put player in the center
        this.player.position.x = this.canvas.width / 2;
        this.player.position.y = this.canvas.height / 2;

        this.intervalId = setInterval(() => {
            this.animFrame++;
        }, this.animationSpeed);
    }

    createCanvas(width, height) {
        // Set canvas width and height
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas.addEventListener('mousedown', e => this.canvas.className = "clicked");

        this.canvas.addEventListener('mouseover', e => {
            this.canvas.style.cursor = 'pointer';
        });

        this.canvas.addEventListener('mouseout', e => {
            this.canvas.style.cursor = 'default';
        });

        this.canvas.addEventListener('animationiteration', e => {
            this.canvas.style.filter = 'drop-shadow(0px 0px 100px ' + this.calculateAverageColor(true) + ')';
        });

        this.canvas.addEventListener('click', e => {
            this.handleKeyOrClick(e);
        });
   
        document.addEventListener('keypress', e => {
            this.handleKeyOrClick(e);
        });
    }

    handleKeyOrClick(e){
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.startAnimating(90);
        }
    }

    calculateAverageColor(randomOpacity=false) {
        var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var data = imageData.data;
        var pixelCount = data.length / 4; // Each pixel takes up 4 bytes (RGBA)

        var totalRed = 0;
        var totalGreen = 0;
        var totalBlue = 0;

        for (var i = 0; i < data.length; i += 4) {
            totalRed += data[i];
            totalGreen += data[i + 1];
            totalBlue += data[i + 2];
        }

        var averageRed = Math.round(totalRed / pixelCount);
        var averageGreen = Math.round(totalGreen / pixelCount);
        var averageBlue = Math.round(totalBlue / pixelCount);

        var opacity = Math.random() * (1 - 0.5) + 0.5;

        if (randomOpacity) 
            return 'rgba(' + averageRed + ',' + averageGreen + ',' + averageBlue + ',' + opacity + ')'; 
        else 
            return 'rgb(' + averageRed + ',' + averageGreen + ',' + averageBlue + ')';
    }

    randomSpawnPoint() {
        return this.spawns[Math.floor(Math.random() * this.spawns.length)];
    }

    randomTime(min, max) {
        return Math.random() * (max - min) + min;
    }

    drawSprite(sprite, x=0, y=0) {
        if (sprite.animated) {
            this.ctx.drawImage(
                sprite.image,
                sprite.getFrameX(this.animFrame),
                0,
                sprite.frameWidth,
                sprite.image.height,
                x - sprite.width / 2,
                y - sprite.height / 2,
                sprite.width,
                sprite.height
            );
        } else {
            this.ctx.drawImage(sprite.image, x, y, sprite.width, sprite.height);
        }
    }

    drawSprites(spriteArray) {
        for (const item of spriteArray) {
            this.drawSprite(item.sprite, item.x, item.y);
        }
    }

    draw() {
        for (const key in this.sprites) {
            const { x, y } = this.sprites[key];
            this.drawSprite(this.sprites[key], x, y);
        }

        this.drawSprites(this.enemies);
        this.drawSprites(this.bullets);

        document.querySelector("#score").textContent = `Score: ${this.score}`;
    }

    update() {
        this.player.update();

        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            enemy.update();

            if (enemy.killed) {
                this.score++;
                this.audio.playRandom(this.audio.booms);
                this.enemies.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            bullet.update();

            if (bullet.destroyed) {
                this.bullets.splice(i, 1);
                i--;
            }
        }

        if (this.input.isShooting) {
            if (this.bulletTimer >= this.bulletRate) {
                this.audio.play(this.audio.shoot);
                this.bullets.push(new Bullet(new Sprite('./images/bullet.png', 4), this.input.gunDirection, {...this.player.position}));
                this.bulletTimer = 0;
            }
        }

        this.elapsedTimeSinceSpawn += this.animationSpeed;
        if (this.elapsedTimeSinceSpawn >= this.enemySpawnTimer) {
            for (let e = 0; e < (Math.random() * (3 - 1) + 1); e++) {
                const spawnPoint = this.randomSpawnPoint();
                this.enemies.push(new Enemy(new Sprite('./images/enemy.png', .6, spawnPoint.x, spawnPoint.y, true, 2), this.player, this.bullets, this.enemies));
            }
            this.elapsedTimeSinceSpawn = 0;
            this.enemySpawnTimer = this.randomTime(5000, 100000);
        }

        this.bulletTimer += this.animationSpeed;
    }

    pauseAnimating() {
        clearInterval(this.intervalId);
    }

    startAnimating(fps) {
        let fpsInterval = 1000 / fps;
        let then = Date.now();
        let startTime = then;
        this.audio.play(this.audio.music);
        
        const animate = () => {
            requestAnimationFrame(animate);

            let now = Date.now();
            let elapsed = now - then;

            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);

                if(!this.input.paused) {
                    this.update();
                    this.draw();
                } else {
                    this.drawSprite(this.titleScreen);
                }
            }
        };

        this.intervalId = setInterval(() => {
            this.animFrame++;
        }, this.animationSpeed);

        animate();
    }
}

const game = new Game();
window.onload = () => game.setup();
