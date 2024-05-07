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

    playOneShot(sound){
        sound.cloneNode(true).play();
    }

    play(sound){
        // console.log("playing sound " + sound.src);
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