function CarScene() {
    let car;
    let bg;
    let bloodImg;
    let blood;
    let player;
    let carSpeed = 0.005;
    let carAcceleration = 1;
    let carSize = height / 10000;
    let hint = "AVOID THE CAR";
    let loaded = false;
    let loss = false;
    let win = false;

    this.setup = () => {
        // console.log(this.sceneManager);

        // bg = loadImage("./assets/backgrounds/cyberpunk_city.png");

        bg = loadImage("./assets/backgrounds/street_desert.png");
        bloodImg = loadImage("./assets/backgrounds/blood.png");
        
        car = createSprite(width / 2, height / 1.7, 0, 0);
        car.addAnimation("wheels", "./assets/car/car1.png", "./assets/car/car2.png");
        car.scale = carSize;
        
        // cloverImg = loadImage("./assets/clover/loading_clover.png");
        // clover = createSprite(width / 2, height / 2, 0, 0);
        // clover.addImage(cloverImg);

        hint = createSprite(width/ 2, height / 2, 0, 0);
        let hintAnimation = hint.addAnimation("flicker", "./assets/hints/hint1.png", "./assets/hints/hint2.png");
        hint.scale = height / 2000;
        hintAnimation.frameDelay = 10;

        blood = createSprite(width / 2, -height, 0, 0);
        blood.addImage(bloodImg);
        blood.scale = 1.15;
        blood.visible = false;

        player = new PlayerModel(color(255, 0, 0));
    }
    
    this.draw = () => {
        if (PoseRecognition.pose || loaded) {
            loaded = true;
            hint.visible = false;
            car.visible = true;
            
            // clover.visible = false;
            
            background(150);
            image(bg, 0, 0, width, height);

            if (loss) {
                gameOver();
            } else if (win) {
                winScreen();
            } else if (car.scale > width / 2000 && blood.position.y < height / 1.5) {
                drawSprites();
                if (PoseRecognition.pose) {
                    loss = true;
                }
                else {
                    win = true;
                }
            } else {
                car.changeAnimation("wheels");
                drawSprites();
                updateScale();
                player.draw();
            }

        } else if (!loaded) {
            background(39, 44, 72);
            // clover.visible = false;
            // clover.rotation += 3;
            car.visible = false;

            hint.changeAnimation("flicker");

            drawSprites();
            // displayText(hint, width / 10, width / 2, height / 3.5);
        }
        // console.log(car.scale)
    }

    function displayText(str, size, x, y) {
        // strokeWeight(10);
        // stroke(51);
        fill(254, 107, 2);
        textSize(size);
        textAlign(CENTER, CENTER);
        text(str, x, y);
    }

    function winScreen() {
        background(39, 44, 72);
        displayText("GJ", width / 10, width / 2, height / 3.5);
    }

    function updateScale() {
        carAcceleration += 0.1;
        car.scale += carSpeed * carAcceleration;
    }

    function gameOver() {
        blood.visible = true;
        if (blood.position.y < height / 1.5) 
            blood.position.y += 8;
        drawSprites();
    }
}
