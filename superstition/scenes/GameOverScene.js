function GameOverScene(){
    let gameOver;
    let toReset;

    this.setup = ()=>{
        console.log("Game over setup...");
        gameOver = createSprite(width/2, height / 3, 0, 0);
        let gameOverAnim = gameOver.addAnimation("overTxtFlicker", "./assets/hints/game_over1.png", "./assets/hints/game_over2.png")
        gameOverAnim.frameDelay = 5;
        gameOver.scale = width / 4000;        
    }

    function reset() {
        toReset = false;
        gameOver.visible = true;
    }

    this.draw = ()=>{
        if (toReset)
            reset();

        if(keyIsPressed){
            toReset = true;
            gameOver.visible = false;
            showRandomScene(this);
        }   

        background(26, 26, 51);
        gameOver.changeAnimation("overTxtFlicker");
        //drawText("Game Over!" , width / 2 , height / 2 , 34 , 0);
        fill(126, 169, 152);
        drawText("Score: " + this.sceneManager.score , width / 2 , height / 2 + 100);
        drawText("Press any key to retry" , width/2 , height / 2 + 200, 24);
        drawSprite(gameOver);
        // push();
        // fill(0);
        // textSize(34);
        // textAlign(CENTER , CENTER);
        // text("Game Over!" , width/2 , height/2);
        // textSize(14);
        // text("Press any key to retry..." , width/2 , height / 2 + 200);
        // pop();
    }

}