function CarScene() {
    let car;
    let bg;
    let player;
    let carSpeed = 0.001;
    let carAcceleration = 1;
    const carSize = height / 10000;
    let toReset = false;

    this.keyPressed = () => {
        if (key.toUpperCase() == "D") {
            window.debugView = !window.debugView;
        }
    }

    this.setup = () => {
        window.debugView = true;

        bg = loadImage("./assets/backgrounds/street_desert.png");
        // bg = loadImage("./assets/backgrounds/street_synth.png");
        car = createSprite(width / 2, height / 1.7, 0, 0);
        car.addAnimation("wheels", "./assets/car/vwcar1.png", "./assets/car/vwcar2.png");
        car.scale = carSize;
        player = new PlayerModel(color(255, 0, 0));
    }

    this.draw = () => {
        if (toReset)
            reset();

        console.log(car.scale, + " " + width / 2000);

        car.visible = true;
        background(150);
        image(bg, 0, 0, width, height);
        if (car.scale > width / 2000) {
            drawSprites();
            if (PoseRecognition.pose) {
                this.gameOver();
            }
            else {
                this.winScreen();
            }
        } else {
            car.changeAnimation("wheels");
            drawSprites();
            updateScale();
            player.draw();
        }
    }

    function updateScale() {
        carAcceleration += 0.1;
        car.scale += carSpeed * carAcceleration;
    }

    function reset() {
        car.position.x = width / 2
        car.position.y = height / 1.7
        carAcceleration = 1;
        car.scale = carSize;

        toReset = false;
        win = false;
        loss = false;
    }

    this.winScreen = () => {
        console.log("you win - car");
        toReset = true;
        car.visible = false;
        this.sceneManager.showScene(CatScene);
    }
    this.gameOver = () => {
        toReset = true;
        car.visible = false;
        this.sceneManager.showScene(GameOverScene);
    }

}
