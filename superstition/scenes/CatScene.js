function CatScene() {
    let cat;
    let catWidth = 50;
    let catHeight = 50;
    const catScale = height / 5000;
    let catVelocity = 8;
    let toReset = false;
    let inputHandler = null;

    this.setup = () => {
        bg = loadImage("./assets/backgrounds/cat_level.png");
        cat = createSprite(-catWidth, height / 1.3, catWidth, catHeight);
        //cat.shapeColor = color(22, 25, 22);
        inputHandler = new InputHandler();
        let catAnimation = cat.addAnimation("test_animation", 
                                            "./assets/cat/cat_walk1.png", 
                                            "./assets/cat/cat_walk3.png");
        catAnimation.frameDelay = 4;        
        cat.scale = catScale
        cat.velocity.x = catVelocity;
    }

    function reset(){
        console.log("Resetting cat...");
        toReset = false;
        cat.visible = true;
        cat.position.x = -catWidth;
    }
    
    let toShowInfoText = true;

    this.draw = () => {
        console.log(cat.position.x);

        if (toReset) 
            reset();

        image(bg, 0, 0, width, height);
        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);

        if (toShowInfoText) {
            push();
            fill(0 , 255 , 0);
            textSize(34);
            text("Quick! rotate!", width / 2, height / 4);
            pop();
        }

        if (inputHandler.checkRotate()) {
            console.log("You win!");
            cat.visible = false;
            toReset = true;
            this.sceneManager.showScene(CarScene);
        }

        if (cat.position.x > width + catWidth) {
            cat.visible = false;
            toReset = true;
            this.sceneManager.showScene(GameOverScene);
        }

        cat.changeAnimation("test_animation");
        drawSprites();
    }

    this.keyPressed = ()=>{
        if(key.toUpperCase() == "D"){
            window.debugView = !window.debugView;
        }
    }
}