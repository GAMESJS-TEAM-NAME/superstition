function CatScene() {
    let cat;
    let catWidth = 50;
    let catHeight = 50;
    const catScale = height / 5000;
    let catVelocity = 8;
    let toReset = false;
    let inputHandler = null;
    let bg = null;
    let toShowInfoText = true;

    this.setup = () => {
        bg = loadImage("./assets/backgrounds/cat_level.png");
        cat = createSprite(-catWidth, height / 1.3, catWidth, catHeight);
        inputHandler = new InputHandler();
        let catAnimation = cat.addAnimation("walking_animation", 
                                            "./assets/cat/cat_walk1.png", 
                                            "./assets/cat/cat_walk3.png");
        catAnimation.frameDelay = 4;        
        cat.scale = catScale
    }

    function reset(){
        toReset = false;
        cat.visible = true;
        toShowInfoText = true;
        cat.position.x = -catWidth;
    }
    this.draw = () => {
        console.log("Score:" , this.sceneManager.score)

        if (toReset) 
            reset();

        cat.velocity.x = catVelocity * (this.sceneManager.score / 10 + 1);

        image(bg, 0, 0, width, height);
        
        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);

        if (toShowInfoText) {
            drawText("Quick! Rotate!" , width / 2 ,200 , 34 , color(0 , 0 , 0))
        }

        if (inputHandler.checkRotate()) {
            cat.visible = false;
            toReset = true;
            this.sceneManager.score++;
            // showRandomScene(this);
            this.sceneManager.showScene(CatScene);

        }

        if (cat.position.x > width + catWidth) {
            cat.visible = false;
            toReset = true;
            this.sceneManager.showScene(CatScene);
            // this.sceneManager.showScene(GameOverScene);
        }

        cat.changeAnimation("walking_animation");
        drawSprites();
        this.sceneManager.player.draw();
    }

    this.keyPressed = ()=>{
        if(key.toUpperCase() == "D"){
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