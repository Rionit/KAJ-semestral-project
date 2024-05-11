export class Audio{
    constructor() {
        this.music = document.getElementById('backgroundMusic');
        let boom1 = document.getElementById('boomSound1');
        let boom2 = document.getElementById('boomSound2');
        this.booms = [boom1, boom2]
        this.shoot = document.getElementById('shootSound');
    }

    playRandom(array){
        this.playOneShot(array[Math.floor(Math.random()*array.length)]);
    }

    // plays the sound just once as a new instance
    // multiple can be playing at the same time
    playOneShot(sound){
        sound.cloneNode(true).play();
    }

    // can be playing only one at a time
    play(sound){
        sound.play();
    }

    resume(sound){
        if(sound.paused){
            sound.play();
        } 
    }

    pause(sound){
        if(!sound.paused){
            sound.pause();
        } 
    }

    stop(sound){
        sound.pause();
        sound.currentTime = 0;
    }
}