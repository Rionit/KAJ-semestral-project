import { Sprite } from './modules/sprites.js'
import { Player } from './modules/player.js'
import { Input } from './modules/input.js'
import { Bullet } from './modules/bullet.js'
import { Enemy } from './modules/enemy.js'
import { Audio } from './modules/audio.js'

let input = new Input();
let audio = new Audio();
let canvas = document.querySelector(".gameCanvas");
let ctx = canvas.getContext('2d');
let player = new Player(new Sprite('./images/player_test.png', .6, 525, 525, true, 2), input);

const spawns = [{x: 30, y: 525}, {x: 970, y: 525}, {x: 525, y: 30}, {x: 525, y: 970}]

let bullets = []
let enemies = []

const sprites = {
    background: new Sprite('./images/background.png'),
    player: player.sprite
};

let animFrame = 0;
let animationSpeed = 400;
let bulletTimer = 0;
const bulletRate = 8000; // Interval between bullets in milliseconds

function createCanvas(width, height){
    // Set canvas width and height
    canvas.width = width;
    canvas.height = height;
}

function setup(){
    enemies.push(new Enemy(new Sprite('./images/enemy.png', .6, 525, 30, true, 2), player, bullets, enemies));
    let width = 1000;
    let height = 1000;
    createCanvas(width, height);
    audio.play(audio.music);
}

function randomSpawnPoint() {
    return spawns[Math.floor(Math.random() * spawns.length)];
}

function randomTime(min, max) {
    return Math.random() * (max - min) + min;
}

let enemySpawnTimer = randomTime(3000, 8000); // Initial delay before spawning the first enemy
let elapsedTimeSinceSpawn = 0;

function draw(){
    for (const key in sprites) {
        const sprite = sprites[key];
        const { x, y } = sprite;

        if (sprite.animated) {
            ctx.drawImage(sprite.image, sprite.getFrameX(animFrame), 0, sprite.frameWidth, sprite.image.height, x - (sprite.width / 2), y - (sprite.height / 2), sprite.width, sprite.height);
        } else {
            ctx.drawImage(sprite.image, x, y, sprite.width, sprite.height);
        }
    }

    for(const enemy of enemies){
        ctx.drawImage(enemy.sprite.image, enemy.sprite.getFrameX(animFrame), 0, enemy.sprite.frameWidth, enemy.sprite.image.height, enemy.x - (enemy.sprite.width / 2), enemy.y - (enemy.sprite.height / 2), enemy.sprite.width, enemy.sprite.height);
    }

    for(const bullet of bullets){
        ctx.drawImage(bullet.sprite.image, bullet.x, bullet.y, bullet.sprite.width, bullet.sprite.height);
    }
}

function update(){
    player.update();

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.update();
        
        if (enemy.killed) {
            audio.playRandom(audio.booms);
            enemies.splice(i, 1);
            i--;
        }
    }

    
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.update();
        
        if (bullet.destroyed) {
            bullets.splice(i, 1);
            i--;
        }
    }

    if (input.isShooting) {
        if (bulletTimer >= bulletRate) {
            audio.play(audio.shoot);
            bullets.push(new Bullet(new Sprite('./images/bullet.png', 4), input.gunDirection, {...player.position}));
            bulletTimer = 0; // Reset the timer
        }
    }
    

    // Spawn enemies
    elapsedTimeSinceSpawn += animationSpeed;
    if (elapsedTimeSinceSpawn >= enemySpawnTimer) {
        const spawnPoint = randomSpawnPoint();
        enemies.push(new Enemy(new Sprite('./images/enemy.png', .6, spawnPoint.x, spawnPoint.y, true, 2), player, bullets, enemies));
        elapsedTimeSinceSpawn = 0;
        enemySpawnTimer = randomTime(30000, 60000); // Reset spawn timer for the next enemy
    }

    // Increment the bullet timer
    bulletTimer += animationSpeed;
}

var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    // request another frame
    requestAnimationFrame(animate);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);

        update();
        draw();

    }
}

setup();

const intervalId = setInterval(() => {
    animFrame++;
}, animationSpeed);

window.onload = function(){
    startAnimating(90);
};
