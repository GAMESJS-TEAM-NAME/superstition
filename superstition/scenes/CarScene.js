function CarScene() {
    let car;
    let bg;
    let dream;
    let carSpeed = 0.0001;
    let carAcceleration = 1;
    const carSize = height / 10000;
    let toReset = false;
    let toShowInfoText = true;

    this.keyPressed = () => {
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

    this.setup = () => {
        bg = loadImage("./assets/backgrounds/car_city.png");
        dream = loadImage("./assets/backgrounds/dream.png");
        // bg = loadImage("./assets/backgrounds/street_synth.png");
        car = createSprite(width / 2, height / 1.7, 0, 0);
        car.addAnimation("wheels", "./assets/car/car_outline1.png", "./assets/car/car_outline2.png");
        car.scale = carSize;
    }

    this.draw = () => {
        if (toReset)
            reset();

        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);

        if (toShowInfoText) {
            push();
            drawText("Jump away from the car!", width / 2, 200, 34, color(255, 0 , 0))
            pop();
        }
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
            this.updateScale();
            image(dream, 0, 0, width, height);
            this.sceneManager.player.draw();
        }

    }

    this.updateScale = ()=>{
        console.log(this.sceneManager.score);
        // carAcceleration += 0.1;
        carAcceleration += (this.sceneManager.score / 10 + 0.1);
        car.scale += carSpeed * carAcceleration;
    }

    function reset() {
        car.position.x = width / 2
        car.position.y = height / 1.7
        carAcceleration = 1;
        car.scale = carSize;
        toShowInfoText = true;

        toReset = false;
        win = false;
        loss = false;
    }

    this.winScreen = () => {
        toReset = true;
        car.visible = false;
        this.sceneManager.score++;
        showRandomScene(this);
        return;
        // this.sceneManager.showScene(CarScene);
    }
    this.gameOver = () => {
        toReset = true;
        car.visible = false;
        this.sceneManager.showScene(GameOverScene);
        // this.sceneManager.showScene(CarScene);
        return;
    }

}
