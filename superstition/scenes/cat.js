function CatScene(){
    let cat;
    let catWidth;
    let catHeight;
    let catVelocity = 8;

    this.setup = ()=>{
        console.log(this.sceneManager);
        
        cat = createSprite( -catWidth, height/ 1.1, catWidth, catHeight);
        cat.shapeColor = color(22, 25, 22);
        bg = loadImage("./assets/backgrounds/city.png");

        // let catAnimation = cat.addAnimation("test_animation", 
        //                                     "./assets/cat/test_cat0001.png", 
        //                                     "./assets/cat/test_cat0002.png");
        // catAnimation.frameDelay = 10;

        cat.velocity.x = catVelocity;
    }

    this.draw = ()=>{
        

        image(bg, 0, 0, width, height);

        if (cat.position.x > width + catWidth) {
            console.log("you lose");
            cat.position.x = -catWidth;
        }
        
        // cat.changeAnimation("test_animation");
        drawSprites();
    }
}