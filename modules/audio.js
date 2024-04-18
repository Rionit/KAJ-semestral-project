export class Audio{
    constructor() {
        this.music = document.getElementById('backgroundMusic');
        let boom1 = document.getElementById('boomSound1');
        let boom2 = document.getElementById('boomSound2');
        this.booms = [boom1, boom2]
        this.shoot = document.getElementById('shootSound');
    }

    playRandom(array){
        array[Math.floor(Math.random()*array.length)].cloneNode(true).play();
    }

    play(sound){
        sound.cloneNode(true).play();
    }

    repeat(sound){
        sound.cloneNode(true).play();
    }

    stop(sound){
        sound.stop();
    }
}