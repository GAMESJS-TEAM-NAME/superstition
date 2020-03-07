function CrackScene() {
    let person;
    let personWidth = 50;
    let personHeight = 150;
    let personVelocity = 8;
    let toReset = false;
    let inputHandler = null;

    this.setup = () => {
        person = createSprite(-personWidth, height / 1.2, personWidth, personHeight);
        person.shapeColor = color(22, 255, 22);
        bg = loadImage("./assets/backgrounds/city.png");
        inputHandler = new InputHandler();
        person.velocity.x = personVelocity;
    }

    function reset() {
        console.log("Resetting crack...");
        toReset = false;
        person.visible = true;
        person.position.x = -personWidth;
    }

    let toShowInfoText = true;
    let crackPos = { x: width / 2, y: height - 100, radius: 50 };

    this.draw = () => {
        if (toReset)
            reset();

        image(bg, 0, 0, width, height);
        ellipse(crackPos.x, crackPos.y, crackPos.radius);
        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);

        if (toShowInfoText) {
            push();
            fill(0, 255, 0);
            textSize(34);
            text("Jump over the cracks!", width / 2, height / 4);
            pop();
        }

        // if(inputHandler.checkRotate()){
        if (keyIsPressed && key.toUpperCase() == "W") {
            console.log("You win korega!");
            person.visible = false;
            toReset = true;
            this.sceneManager.showScene(CarScene);
        }

        const isJumped = inputHandler.checkJump();
        console.log(isJumped);
        if(isJumped){
            person.velocity.y = -personVelocity * 2;
            setTimeout(_=>{
                person.velocity.y = personVelocity * 2;
            } , 250)
        }

        if(person.position.y >= height / 1.2){
            person.position.y = height / 1.2;
        }


        if (person.position.x > width + personWidth) {
            person.position.x = 0;
            // person.visible = false;
            // toReset = true;
            // this.sceneManager.showScene(GameOverScene);
        }

        drawSprites();
    }
    this.keyPressed = () => {
        if (key.toUpperCase() == "D") {
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