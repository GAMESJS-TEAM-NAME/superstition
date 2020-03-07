function CarScene() {
    // let bloodImg;
    // let blood;
    let car;
    let bg;
    let player;
    let carSpeed = 0.001;
    let carAcceleration = 1;
    let carSize = height / 10000;
    let hint;
    let winText;
    let win = false;
    let loss = false;
    let loaded = false;

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

        // bg = loadImage("./assets/backgrounds/street_desert.png");
        bg = loadImage("./assets/backgrounds/street_synth.png");
        
        car = createSprite(width / 2, height / 1.7, 0, 0);
        car.addAnimation("wheels", "./assets/car/vwcar1.png", "./assets/car/vwcar2.png");
        // car.addAnimation("wheels", "./assets/car/car1.png", "./assets/car/car2.png");
        car.scale = carSize;

        // winText = createSprite(width / 2, height / 2, 0, 0);
        // let winTextAnimation = winText.addAnimation("flickerWin", "./assets/winScreen/gj1.png", "./assets/winScreen/gj2.png");
        // winTextAnimation.frameDelay = 10;
        // winText.scale = height / 2000;

        hint = createSprite(width / 2, height / 2, 0, 0);
        let hintAnimation = hint.addAnimation("flickerHint", "./assets/hints/hint1.png", "./assets/hints/hint2.png");
        hintAnimation.frameDelay = 10;
        hint.scale = height / 2000;

        winText = loadAnimation("./assets/winScreen/gj1.png", "./assets/winScreen/gj2.png");
        // winAnimation.frameDelay = 10;

        player = new PlayerModel(color(255, 0, 0));
    }
    
    this.draw = () => {
        if (PoseRecognition.pose || loaded) {
            loaded = true;
            hint.visible = false;
            car.visible = true;

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
                // if(keyIsPressed){
                //     const k = key.toUpperCase();
                //     if(k == "W"){
                //         win = true;
                //     }else if(k == "L"){
                //         lose = true;
                //     }
                // }
            } else {
                car.changeAnimation("wheels");
                drawSprites();
                updateScale();
                player.draw();
            }

        } else if (!loaded) {
            loadingHint();
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

    function reset() {
        car.position.x = width / 2
        car.position.y = height / 1.7
        car.visible = false;
    }

    this.winScreen = () => {
        reset();
        console.log("you win - car");
        background(39, 44, 72);
        animation(winText, width / 2, height / 1.7);
        setTimeout(_=>{
            winText.stop();
            this.sceneManager.showScene(CatScene);
        } , 2000);
    }

    function loadingHint() {
        background(39, 44, 72);
        car.visible = false;
        hint.changeAnimation("flickerHint");
        drawSprites();
    }

    this.gameOver = () => {
        // blood.visible = true;
        // if (blood.position.y < height / 1.5) 
        //     blood.position.y += 8;
        // drawSprites();
        car.visible = false;
        background(39, 44, 72);
        displayText("dead", width / 10, width / 2, height / 3.5);
        setTimeout(_=>{
            this.sceneManager.showScene(GameOverScene);
        } , 2000);
    }

}
