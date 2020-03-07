function GhostScene() {
    let ghosts;
    let toReset = false;
    let inputHandler = null; 
    let ghostScale;
    let numGhosts = Math.floor(random(3, 5));
    let removedIndex = numGhosts - 1;
    const maxHp = 255;
    let bg;

    this.sceneSet = (scene) => {
        numGhosts = random(3, 5);

        for (let i = 0; i < numGhosts; i++) {
            let ghost = createSprite(random(ghostWidth, width), random(ghostHeight, height));
            let ghostAnimation = ghost.addAnimation('floating', './assets/ghost/ghost1.png', './assets/ghost/ghost2.png');
            ghostAnimation.frameDelay = 10;
            ghost.scale = floor(random(0, 1)) ? (-ghostScale, ghostScale) : (ghostScale, ghostScale);
            ghosts.add(ghost);
        }

        toReset = true;
        this.sceneManager.showScene(catScene);
    }

    this.setup = () => {
        ghosts = new Group();
        bg = loadImage('./assets/backgrounds/basement.png');
        for (let i = 0; i < numGhosts; i++) {
            let ghost = createSprite(random(width / 6, width / 1.3), random(height / 6, height / 1.3));
            let ghostAnimation = ghost.addAnimation('floating', './assets/ghost/ghost1.png', './assets/ghost/ghost2.png');
            ghostAnimation.frameDelay = 10;   
            ghostScale = width / random(2000, 4000);
            ghost.scale = ghostScale

            if (Math.random() > 0.5)
                ghost.mirrorX(-1);
            
            ghosts.add(ghost);
        }

        inputHandler = new InputHandler();
    }

    function reset() {
        toReset = false;
    }

    let toShowInfoText = true;
    let hp = maxHp;
    
    this.draw = () => {
        if (toReset)
            reset();
        // console.log(numGhosts);
        image(bg, 0, 0, width, height);

        console.log(ghosts.length);
        
        if (toShowInfoText) {
            push();
            fill(0, 255, 0);
            textSize(34);
            text("Raise your hand to salt and destroy!", width / 4  , height / 4);
            pop();
        }
        
        if (ghosts.length == 0) 
            console.log("no ghosts");
        else {
            for (let i = 0; i < numGhosts; i++) {
                let g = ghosts[i];
                g.position.y += sin(frameCount/10);
            }
            
            push();
            let currGhost = ghosts[removedIndex];
            let wrist = inputHandler.checkSalting();
            if (wrist) {
                console.log(wrist);
                let saltShakerX = map(wrist.x , 0 , window.posenetCanvasWidth , 0 , width);
                let saltShakerY = map(wrist.y , 0 , window.posenetCanvasHeight , 0 , height);

                console.log(saltShakerX + " " + saltShakerY);
                fill(244);
                ellipse(saltShakerX, saltShakerY, 20, 20);

                if (hp > 0) {
                    console.log(hp);
                    hp -= 10;
                    tint(255, hp)
                    currGhost;
                } else {
                    hp = maxHp;
                    currGhost.remove();
                    removedIndex--;
                    numGhosts--;
                }
            }
                currGhost.debug = mouseIsPressed;
                drawSprite(currGhost);
                pop();
                
                for (let i = 0; i < removedIndex; i++) {
                    drawSprite(ghosts[i]);
                }
                // console.log(ghost);
                //}
            }
            // drawSprites(ghosts);
            
            setTimeout(_ => {
                toShowInfoText = false;
            }, 2000);
        }
        
    }