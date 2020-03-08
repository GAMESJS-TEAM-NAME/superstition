function GhostScene() {
    let mills;
    let saltShaker;
    let ghost
    let toReset = false;
    let inputHandler = null;
    let ghostScale;
    let ghostSpeed = -5;
    const leftBound = width / 2 - width / 4;
    const rightBound = width / 2 + width / 4;
    const maxHp = 255;
    let attackDamage = 10;
    let bg;
    let defaultTimer = 7000;
    let timer = defaultTimer;
    let time;
    let sign = -1;
    let toShowInfoText = true;
    let hp = maxHp;

    this.sceneSet = (scene) => {
        ghost.visible = false;
        saltShaker.visible = false;
        // this.sceneManager.showScene(GhostScene); 
        if (scene) {
            this.sceneManager.showScene(scene);
        } else
            showRandomScene(this);
    }

    this.setup = () => {
        bg = loadImage('./assets/backgrounds/basement_lighter.png');
        mills = millis();

        ghost = createSprite(random(leftBound, rightBound), height / 2 + 200);
        let ghostAnimation = ghost.addAnimation('floating', './assets/ghost/ghost1.png', './assets/ghost/ghost2.png');
        ghostAnimation.frameDelay = 10;
        ghostScale = width / random(2000, 3000);
        ghost.scale = ghostScale;
        if (Math.random() < 0.5) {
            ghostSpeed = -ghostSpeed;
            ghost.mirrorX(-1);
        }

        saltShaker = createSprite(0, 0, 0, 0);
        saltShaker.addAnimation("salting", "./assets/saltshaker/saltshaker.png");
        saltShaker.scale = width / 3000;
        saltShaker.visible = false;
        inputHandler = new InputHandler();
    }

    function reset() {
        console.log("Resetting ghosts");
        toReset = false;
        hp = maxHp;
        mills = millis();
        ghost.visible = true;
        ghost.position.x = random(width / 2, width / 1.5);
    }

    this.winScreen = () => {
        toReset = true;
        ghost.visible = false;
        saltShaker.visible = false;
        
        this.sceneSet(null);
        // showRandomScene(this);
        // this.sceneManager.showScene(CrackScene);
    }

    this.gameOver = () => {
        toReset = true;
        ghost.visible = false;
        saltShaker.visible = false;
        // this.sceneManager.showScene(GameOverScene);
        this.sceneSet(GameOverScene);
        return;
    }

    this.draw = () => {
        console.log("Score:" , this.sceneManager.score , timer);
        //Score dependent timer
        timer = defaultTimer - (this.sceneManager.score * 100);
        time = millis() - mills;

        if (toReset)
            reset();


        if (time >= timer) {
            console.log("Game over");
            this.gameOver();
            return;
        }
        // console.log(ghostDamage);
        
        // console.log(numGhosts);
        image(bg, 0, 0, width, height);

        // console.log(ghosts.length);

        if (toShowInfoText) {
            push();
            fill(0, 255, 0);
            drawText("Raise your hand to salt and destroy!" , width / 2 , height/4 , 34);
            pop();
        }

        if (hp < 10)
            this.winScreen();
        else {
            ghost.position.y += sin(frameCount / 10) * 2;

            // console.log("ghost pos" + ghost.position.x + " width: " + (width / 2 + 400));
            
            if (ghost.position.x > (rightBound) ||
                ghost.position.x < (leftBound)) {
                ghostSpeed = -ghostSpeed;
                ghost.mirrorX(sign);
                sign = -sign;
            }

            ghost.setSpeed(ghostSpeed, 1);

            let wrist = inputHandler.checkSalting();
            let salting = false;

            if (wrist) {
                let saltShakerX = map(wrist.x, 0, window.posenetCanvasWidth, 0, width);
                //let saltShakerY = map(wrist.y , 0 , window.posenetCanvasHeight , 0 , height);
                let saltShakerY = height / 3;

                //ellipse(wrist.x, wrist.y, 50);

                saltShaker.visible = true;
                saltShaker.velocity.x = (saltShakerX - saltShaker.position.x) / 10;
                saltShaker.velocity.y = (saltShakerY - saltShaker.position.y) / 10;

                drawSprite(saltShaker);
                push();
                if (Math.abs(saltShakerX - ghost.position.x) < 200 &&
                    saltShakerY < ghost.position.y) {
                    if (hp > 0) {
                        hp -= attackDamage;
                    } 
                    else{

                    }
                    // else {
                    //     console.log("game over");
                    //     hp = maxHp;
                    // }
                    salting = true;
                    console.log("salting")
                } else {
                    salting = false;
                }
            }
            if (hp <= 250 && salting == false) {
                console.log("not salting");
                hp += attackDamage / 2;
            }
        }

        tint(255, hp);
        ghost;
        drawSprite(ghost);

        let rectSize = map(time, 0, timer, width, 0);

        push();
        fill(color(255, 255, 255, 100));
        noStroke();
        rect(0, height - height * 0.05, rectSize, height * 0.05);
        pop();

        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);
        this.sceneManager.player.draw();
    }

    this.keyPressed = ()=>{
        if (key.toUpperCase() == "D") {
            window.debugView = !window.debugView;
        }
        if(window.debugView){
            if(key.toUpperCase() == "W"){
                this.sceneManager.score++;
            }
            else if(key.toUpperCase() == "S"){
                this.sceneManager.score--;
            }
        }
    }
}