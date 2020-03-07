function GameOverScene(){
    this.setup = ()=>{
        console.log("Game over setup...");
    }

    this.draw = ()=>{
        if(keyIsPressed){
            showRandomScene(this);
        }   
        background(255);
        drawText("Game Over!" , width / 2 , height / 2 , 34 , 0);
        drawText("Score: " + this.sceneManager.score , width / 2 , height / 2 + 100 , 28 , 0);
        drawText("Press any key to retry..." , width/2 , height / 2 + 200 , 14 , 0);
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