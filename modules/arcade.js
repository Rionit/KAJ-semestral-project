export class Arcade {

    constructor() {
        this.arcade = document.querySelector('.arcade');
        this.animationID;

        this.collapse();
        this.applyTransform();

        this.arcade.addEventListener("click", this.handleArcadeClick.bind(this));

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
    
        // Check if the click is on the middle of the arcade
        const boundingRect = this.arcade.getBoundingClientRect();
        const middleX = boundingRect.left + boundingRect.width / 2;
    
        if (Math.abs(middleX - event.clientX) < 250) {
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