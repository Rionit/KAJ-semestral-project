export class Arcade {

    constructor() {
        this.arcade = document.querySelector('.arcade');
        this.animationID;

        this.collapse();
        this.applyTransform();

        window.addEventListener("click", this.handleArcadeClick.bind(this));

        window.addEventListener('popstate', event => {
            const state = event.state;
            if (state && state.expanded !== undefined) {
                if (state.expanded) {
                    this.expand();
                } else {
                    this.collapse();
                }
            } else if (state && state.angle !== undefined){
                this.transform.rotateY = state.angle;
            }
            this.applyTransform();
        });

        // didn't look pretty

        // this.arcade.addEventListener('mousemove', e => {
        //     if(!this.isExpanded)
        //         this.arcade.style.cursor = 'zoom-in';
        //     else 
        //         this.arcade.style.cursor = 'zoom-out';
        // });

        // this.arcade.addEventListener('mouseout', e => {
        //     this.arcade.style.cursor = 'default';
        // });
    }

    applyTransform(){
        const { scale, rotateX, rotateY, rotateZ, translateX, translateY, translateZ } = this.transform;

        this.arcade.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    }

    /* 
        custom animation using transitions, 
        because I couldn't switch fluidly from css animation to transition
        also this allows to stay in range <0, 360> in the rotateY, otherwise
        when user would click on arcade it would spin very fast a lot of degrees back to normal
        this bug actually happens if user manually clicks to rotate when expanded, but I was unable
        to fix that 
    */
    animation(){
        let len;
        if(this.transform.rotateY != -30) {
            this.arcade.style.transition = "all 0s linear";
            this.transform.rotateY = -30;
            len = 0;
        }else{
            this.arcade.style.transition = "all 10s linear";
            this.transform.rotateY += -360;
            len = 10000;
        }
        this.applyTransform();
        clearInterval(this.animationID);
        this.animationID = setInterval(this.animation.bind(this), len);
    }

    startAnimating(){
        this.animationID = setInterval(this.animation.bind(this), 10000);
    }
    
    stopAnimating(){
        this.arcade.style.transition = "all 0.5s";
        clearInterval(this.animationID);
    }

    expand() {
        this.stopAnimating();
        this.isExpanded = true;
        this.transform = {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            translateX: 0,
            translateY: -100,
            translateZ: 0
        }
    }

    collapse() {
        this.startAnimating();
        this.isExpanded = false;
        this.transform = {
            scale: 0.3,
            rotateX: -30,
            rotateY: -30,
            rotateZ: 0,
            translateX: 0,
            translateY: -900,
            translateZ: 0
        }
    }

    handleArcadeClick(event) {
        // Check if the click is on the canvas and the arcade is expanded
        if (event.target == document.querySelector('canvas') && this.isExpanded) {
            return;
        }
    
        const middleX = window.innerWidth / 2;
    
        if (Math.abs(middleX - event.clientX) < middleX / 2) {
            // expand or collapse if clicked in middle of screen
            if (!this.isExpanded) {
                this.expand();
                history.pushState({ expanded: true }, null, '#expanded');
            } else {
                this.collapse();
                history.pushState({ expanded: false }, null, '#collapsed');
            }
        } else if (event.clientX > middleX) {
            // Rotate right
            this.transform.rotateY += -90;
            history.pushState({ angle: this.transform.rotateY }, null, `#rotate${this.transform.rotateY}`);
        } else {
            // Rotate left
            this.transform.rotateY += 90;
            history.pushState({ angle: this.transform.rotateY }, null, `#rotate${this.transform.rotateY}`);
        }

        // Manual shifting of arcade so that it's centered
        // Only for side with leaderboard and sticky notes
        // Every other thing I tried didn't work
        if(this.isExpanded){
            const rem = (this.transform.rotateY / 90) % 4;
            if(rem == 1 || rem == -3) 
                this.transform.translateX = 250;
            else if (rem == -1 || rem == 3) 
                this.transform.translateX = -250;
            else 
                this.transform.translateX = 0;
        }
    
        this.applyTransform();
    }
    
}