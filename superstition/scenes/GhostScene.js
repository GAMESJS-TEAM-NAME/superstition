function GhostScene() {
    let ghosts;
    let ghostWidth = 100;
    let ghostHeight = 250;
    let toReset = false;
    let inputHandler = null; 
    let numGhosts = Math.floor(random(3, 5));
    let removedIndex = 0;

    this.sceneSet = (scene) => {
        numGhosts = random(3, 5);

        for (let i = 0; i < numGhosts; i++) {
            let ghost = createSprite(random(ghostWidth, width), random(ghostHeight, height));
            let ghostAnimation = ghost.addAnimation('floating', './assets/ghost/ghost1.png', './assets/ghost/ghost2.png');
            ghostAnimation.frameDelay = 20;
            ghosts.add(ghost);
        }

        toReset = true;
        this.sceneManager.showScene(catScene);
    }

    this.setup = () => {
        ghosts = new Group();

        for (let i = 0; i < numGhosts; i++) {
            let ghost = createSprite(random(ghostWidth, width), random(ghostHeight, height));
            ghost.addAnimation('floating', './assets/ghost/ghost1.png', './assets/ghost/ghost2.png');
            ghosts.add(ghost);
        }

        inputHandler = new InputHandler();
    }

    function reset() {
        toReset = false;
    }

    let toShowInfoText = true;
    
    this.draw = () => {
        if (toReset)
            reset();
        // console.log(numGhosts);
        background(100, 200, 200);

        for (let i = 0; i < numGhosts; i++) {
            let g = ghosts[i];
            g.position.y += sin(frameCount/10);
        }

        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);

        if (toShowInfoText) {
            push();
            fill(0, 255, 0);
            textSize(34);
            text("Raise your hand to salt and destroy!", width / 2, height / 4);
            pop();
        }

        if (inputHandler.checkSalting()) {
            console.log("salting");
            // ghosts[removedIndex]. 
        }

        drawSprites(ghosts);
    }

}