function CarScene(){
    let car;
    let carWidth
    let carHeight
    let carSpeed = 0.005;
    let carSize = height / 10000;

    let bg;
    let bloodImg;
    let blood;
    
    let player;

    this.setup = ()=>{
        console.log(this.sceneManager);

        bg = loadImage("./assets/backgrounds/street_desert.png");
        bloodImg = loadImage("./assets/backgrounds/blood.png");

        car = createSprite(width/2, height/1.7, carWidth, carHeight);
        car.shapeColor = color(22, 25, 122);

        blood = createSprite(width / 2, -height, width, height);
        blood.addImage(bloodImg);
        blood.scale = 1.15;
        
        // player = new PlayerModel(color(255,0,0));

        blood.visible = false;
        // bg = loadImage("./assets/backgrounds/cyberpunk_city.png");
        car.scale = carSize;

        car.addAnimation("test_animation", "./assets/car/car1.png", "./assets/car/car2.png");
    }

    function displayHint() {
        // strokeWeight(10);
        // stroke(51);
        fill(255);
        textSize(width / 10);
        textAlign(CENTER, CENTER);
        text("AVOID THE CAR", width/2, height/5);
    }

    function updateScale() {
        car.scale += carSpeed * car.scale * 3;
        car.position.y += 0.4;
    }

    function gameOver() {
        blood.visible = true;
        blood.position.y += 8;
    }

    function reset() {
        car.scale = carSize;
        blood.position.y = -height;
    }

    this.draw = ()=>{
        background(150);
        image(bg, 0, 0, width, height);

        // displayHint();

        if (mouseIsPressed) {
            reset();
        }
        
        // player.draw();

        car.changeAnimation("test_animation");

        if (car.scale > width / 3000 && blood.position.y < height / 1.5) {
            gameOver();
        } else if (blood.position.y > height / 1.7) {
            blood.visible = true;
        } else {
            updateScale();
        }

        drawSprites();
        // console.log(car.scale)
    }
}