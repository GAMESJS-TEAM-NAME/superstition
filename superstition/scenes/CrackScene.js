function CrackScene() {
    let person;
    let personWidth = 50;
    let personHeight = 150;
    let personVelocity = 5;
    let jumpSpeed = 6;
    let toReset = false;
    let inputHandler = null;
    let img = null;
    let crackPos = null;
    
    this.sceneSet = (scene)=> {
        person.position.x = 0;
        person.visible = false;
        toReset = true;
        if(scene){
            this.sceneManager.showScene(scene);
        }else
            showRandomScene(this);
    }

    this.setup = () => {
        crackPos = { x: random(width/2 - 200 , width / 2 + 200), y: height - 100, radius: 50 };
        person = createSprite(-personWidth, height / 1.2, personWidth, personHeight);
        person.shapeColor = color(22, 255, 22);
        person.addAnimation("running", "./assets/crack/char_anim/walkin1.png","./assets/crack/char_anim/walkin6.png");
        person.addAnimation("jumping", "./assets/crack/char_anim/jump1.png","./assets/crack/char_anim/jump3.png");
        person.scale = 0.2;
        bg = loadImage("./assets/backgrounds/crackbg.png");
        img = loadImage("./assets/crack/crack.png");
        inputHandler = new InputHandler();
        person.velocity.x = personVelocity;
    }

    function reset() {
        toReset = false;
        crackPos.x = random(width/2 - 300 , width / 2 + 300);
        person.visible = true;
        toShowInfoText = true;
        person.position.x = -personWidth;
    }

    let toShowInfoText = true;
    

    this.draw = () => {
        if (toReset)
            reset();

        image(bg, 0, 0, width, height);

        push();
        imageMode(CENTER);
        image(img, crackPos.x, crackPos.y, crackPos.radius*4, crackPos.radius*4)
        pop();

        setTimeout(_ => {
            toShowInfoText = false;
        }, 2000);

        if (toShowInfoText) {
            push();
            drawText("Jump over the crack" , width / 2 ,200 , 34 , color(0 , 255 , 0))
            pop();
        }
        const isJumped = inputHandler.checkJump();

        //Double jump "bug" is here
        if (isJumped) {
            //Jump
            person.velocity.y = -personVelocity * jumpSpeed + 5;
            person.velocity.x = personVelocity * jumpSpeed;
            setTimeout(_ => {
                person.velocity.y = personVelocity * jumpSpeed;
                person.velocity.x = personVelocity;
            }, 250)
        }

        let defaultY = height / 1.2;

        //RETURN TO GROUND
        if (person.position.y >= defaultY) {
            person.position.y = defaultY;
        }
        if (dist(person.position.x, person.position.y, crackPos.x, crackPos.y) < crackPos.radius*2) {
            this.sceneSet(GameOverScene);
        }

        if(person.position.y === defaultY)
        {
            person.changeAnimation("running");

        }
        else if(person.position.y < defaultY)
        {
            //console.log("WEEEEEEEEEEEEEEEEEEEEEEE");
            person.changeAnimation("jumping");
        }


        if (person.position.x > width + personWidth) {
            this.sceneManager.score++;
            this.sceneSet(null);
        }

        drawSprites();
    }

    this.keyPressed = () => {
        if (key.toUpperCase() == "D") {
            window.debugView = !window.debugView;
        }
    }

    // function displayText(text) {
    //     push();
    //     fill(255);
    //     textSize()
    //     pop();
    // }
}