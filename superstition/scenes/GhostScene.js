function GhostScene() {
    let mills;
    let saltShaker;
    let ghost
    let toReset = false;
    let inputHandler = null; 
    let ghostScale;
    const maxHp = 255;
    let bg;

    this.sceneSet = (scene) => {
        // mills = millis();
      
        ghost.visible = false;
        saltShaker.visible = false;
        

        if(scene){
            this.sceneManager.showScene(scene);
        }else
            showRandomScene(this);
    }

    this.setup = () => {
        bg = loadImage('./assets/backgrounds/basement_lighter.png');
        mills = millis();
        
        ghost = createSprite(random(width / 2 - 300, width / 2 + 300), random(height / 2 + 200, height / 2 + 200));
        let ghostAnimation = ghost.addAnimation('floating', './assets/ghost/ghost1.png', './assets/ghost/ghost2.png');
        ghostAnimation.frameDelay = 10;   
        ghostScale = width / random(2000, 3000);
        ghost.scale = ghostScale;
        if (Math.random() > 0.5)
            ghost.mirrorX(-1);

        saltShaker = createSprite(0, 0, 0, 0);
        saltShaker.addAnimation("salting", "./assets/saltshaker/saltshaker.png");
        saltShaker.scale = width / 3000;
        saltShaker.visible = false;
        inputHandler = new InputHandler();
    }

    function reset() {
        console.log("Resetting ghosts");
        toReset = false;
        ghost.visible = true;
        ghost.position.x = random(width / 2, width / 1.5);
        ghost.position.x = random(width / 2, width / 1.5);
    }

    this.winScreen = () => {
        toReset = true;
        ghost.visible = false;
        saltShaker.visible = false;
        showRandomScene(this);
        // this.sceneManager.showScene(CrackScene);
    }

    this.gameOver = () => {
        toReset = true;
        ghost.visible = false;
        saltShaker.visible = false;
        this.sceneManager.showScene(GameOverScene);
        //showRandomScene(this);
    }

    let toShowInfoText = true;
    let hp = maxHp;
    
    this.draw = () => {
        let time = millis() - mills;

        if (time > 7000) {
            console.log("loss");
            this.gameOver();
            return;
       }
        // console.log(ghostDamage);
        if (toReset)
            reset();
        // console.log(numGhosts);
        image(bg, 0, 0, width, height);

        // console.log(ghosts.length);
        
        if (toShowInfoText) {
            push();
            fill(0, 255, 0);
            textSize(34);
            text("Raise your hand to salt and destroy!", width / 4  , height / 4);
            pop();
        }
        
        if (hp < 10) 
            this.winScreen();
        else {
            ghost.position.y += sin(frameCount/10);
        
            
            let wrist = inputHandler.checkSalting();
            let salting = false;

            if (wrist) {
                let saltShakerX = map(wrist.x , 0 , window.posenetCanvasWidth , 0 , width);
                let saltShakerY = map(wrist.y , 0 , window.posenetCanvasHeight , 0 , height);

                saltShaker.visible = true;
                saltShaker.velocity.x = (saltShakerX - saltShaker.position.x) / 10;
                saltShaker.velocity.y = (saltShakerY - saltShaker.position.y) / 10;

                drawSprite(saltShaker);
                push();
                if (Math.abs(saltShakerX - ghost.position.x) < 200 &&
                    saltShakerY < ghost.position.y) {
                    if (hp > 0) {
                        hp -= 4;
                    } else {
                        console.log("game over");
                        hp = maxHp;
                    }
                    salting = true;
                    console.log("salting")
                }  else {
                    salting = false;
                }
                console.log(hp);
            }
            if (hp <= 250 && salting == false) {
                console.log("not salting");
                hp += 2;
            }
        }
            
        tint(255, hp);
        ghost;
        drawSprite(ghost);
        
        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);
    }
}