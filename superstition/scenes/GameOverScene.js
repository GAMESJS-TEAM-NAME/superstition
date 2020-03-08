function GameOverScene(){
    let gameOver;
    let toReset;
    let mills;
    let inputHandler;
    let maxPrayer = 2000;

    this.setup = ()=>{
        console.log("Game over setup...");
        gameOver = createSprite(width/2, height / 3, 0, 0);
        let gameOverAnim = gameOver.addAnimation("overTxtFlicker", "./assets/hints/game_over1.png", "./assets/hints/game_over2.png")
        gameOverAnim.frameDelay = 5;
        gameOver.scale = width / 4000;
        inputHandler = new InputHandler();   
        mills = millis();

    }

    function reset(){
        toReset = false;
        gameOver.visible = true;  
        mills = millis();
    }

    this.draw = ()=>{
        if (toReset)
            reset();

        if(!inputHandler.checkPraying())
        {
            mills = millis();
        }

        if(keyIsPressed || (millis() - mills > maxPrayer)){
            this.sceneManager.score = 0;
            toReset = true;
            gameOver.visible = false;
            // showRandomScene(this);
            //TODO 
            this.sceneManager.showScene(GhostScene);
        }   

        background(26, 26, 51);
        gameOver.changeAnimation("overTxtFlicker");

        fill(126, 169, 152);
        drawText("Score: " + this.sceneManager.score , width / 2 , height / 2 + 100);
        drawText("Pray for 2 seconds to retry" , width/2 , height / 2 + 200, 24);
        drawSprite(gameOver);

        

        let rectSize = map((millis() - mills), 0, maxPrayer, 0, width);
        rect(0, 0, rectSize, 0.1*height);

        this.sceneManager.player.draw();
    }

}