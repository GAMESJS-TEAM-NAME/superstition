function CarScene() {
    // let bloodImg;
    // let blood;
    let car;
    let bg;
    let player;
    let carSpeed = 0.001;
    let carAcceleration = 1;
    let carSize = height / 10000;
    let hint = "AVOID THE CAR";
    let loaded = false;
    let loss = false;
    let win = false;

    this.keyPressed = ()=>{
        if(key.toUpperCase() == "D"){
            window.debugView = !window.debugView;
        }
    }

    this.setup = () => {
        window.debugView = true;
        // console.log(this.sceneManager);
        // bloodImg = loadImage("./assets/backgrounds/blood.png");
        // bg = loadImage("./assets/backgrounds/cyberpunk_city.png");
        
        // cloverImg = loadImage("./assets/clover/loading_clover.png");
        // clover = createSprite(width / 2, height / 2, 0, 0);
        // clover.addImage(cloverImg);

        // blood = createSprite(width / 2, -height, 0, 0);
        // blood.addImage(bloodImg);
        // blood.scale = 1.15;
        // blood.visible = false;

        bg = loadImage("./assets/backgrounds/street_desert.png");
        
        car = createSprite(width / 2, height / 1.7, 0, 0);
        car.addAnimation("wheels", "./assets/car/car1.png", "./assets/car/car2.png");
        car.scale = carSize;

        hint = createSprite(width / 2, height / 2, 0, 0);
        let hintAnimation = hint.addAnimation("flicker", "./assets/hints/hint1.png", "./assets/hints/hint2.png");
        hint.scale = height / 2000;
        hintAnimation.frameDelay = 10;


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
                this.gameOver();
            } else if (win) {
                this.winScreen();
            } else if (car.scale > width / 2000) {
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

    function updateScale() {
        carAcceleration += 0.1;
        car.scale += carSpeed * carAcceleration;
    }

    this.winScreen = ()=> {
        background(39, 44, 72);
        displayText("GJ", width / 10, width / 2, height / 3.5);
        setTimeout(_=>{
            this.sceneManager.showScene(CatScene);
        } , 2000);
    }

    this.gameOver = ()=>{
        // blood.visible = true;
        // if (blood.position.y < height / 1.5) 
        //     blood.position.y += 8;
        // drawSprites();

        background(39, 44, 72);
        displayText("dead", width / 10, width / 2, height / 3.5);
        setTimeout(_=>{
            this.sceneManager.showScene(GameOverScene);
        } , 2000);
    }
}
