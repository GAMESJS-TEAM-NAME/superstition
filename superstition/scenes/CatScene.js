function CatScene() {
    let cat;
    let catWidth = 50;
    let catHeight = 50;
    let catVelocity = 8;
    let toReset = false;
    let inputHandler = null;

    this.setup = () => {
        cat = createSprite(-catWidth, height / 1.1, catWidth, catHeight);
        cat.shapeColor = color(22, 25, 22);
        bg = loadImage("./assets/backgrounds/city.png");
        inputHandler = new InputHandler();
        // let catAnimation = cat.addAnimation("test_animation", 
        //                                     "./assets/cat/test_cat0001.png", 
        //                                     "./assets/cat/test_cat0002.png");
        // catAnimation.frameDelay = 10;        
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

        // if(inputHandler.checkRotate()){
            if(keyIsPressed && key.toUpperCase() == "W"){
            console.log("You win korega!");
            cat.visible = false;
            toReset = true;
            this.sceneManager.showScene(CarScene);
        }

        if (cat.position.x > width + catWidth) {
            cat.visible = false;
            toReset = true;
            this.sceneManager.showScene(GameOverScene);
        }

        // cat.changeAnimation("test_animation");
        drawSprites();
    }
    this.keyPressed = ()=>{
        if(key.toUpperCase() == "D"){
            window.debugView = !window.debugView;
        }
    }

    function displayText(text) {
        push();
        fill(255);
        textSize()
        pop();
    }
}