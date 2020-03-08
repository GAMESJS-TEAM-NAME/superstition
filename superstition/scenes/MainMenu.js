function MainMenu(){
    this.setup = ()=>{
        // bg = loadImage("./assets/backgrounds/menu.png");

        playButton = createSprite(width/2, height/1.8, 100, 100);
        playButton.setCollider('circle', 0, 0, width / 2.5);
        let btnAnim = playButton.addAnimation("btnFlicker", "./assets/menuScreen/menu_button1.png", "./assets/menuScreen/menu_button2.png");
        btnAnim.frameDelay = 5;
        playButton.scale = width / 4000;

        titleText = createSprite(width/2, height / 5, 0, 0);
        let titleAnim = titleText.addAnimation("titleFlicker", "./assets/menuScreen/title_text1.png", "./assets/menuScreen/title_text2.png")
        titleAnim.frameDelay = 5;
        titleText.scale = width / 4000;
    }


    this.draw = ()=>{
        background(26, 26, 51);
        //image(bg, 0, 0, width, height);
        //titleText.scale = width / 4000;

        console.log(playButton);
        if (playButton.overlapPoint(mouseX, mouseY)) {
            if (mouseIsPressed) {
                titleText.visible = false;
                playButton.visible = false;
                showRandomScene(this);
            }
            playButton.scale = width / 6000;
        } else {
            playButton.scale = width / 8000;
        }
        playButton.changeAnimation("btnFlicker");
        
        this.sceneManager.player.draw();
        // playButton.debug = mouseIsPressed;
        // const playerModel = this.sceneManager.player();
        // playerModel.draw();
        // if(keyIsPressed) {
            
        //     showRandomScene(this);
        // }
        
        drawSprites();
    }
}