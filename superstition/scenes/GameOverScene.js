function GameOverScene(){
    this.setup = ()=>{
        
    }

    this.draw = ()=>{
        if(keyIsPressed){
            this.sceneManager.showScene(CrackScene);
        }   
        console.log("Game over");
        background(255);
        push();
        fill(0);
        textSize(34);
        text("Game Over!" , width/2 , height/2);
        textSize(14);
        text("Press any key to retry..." , width/2 , height / 2 + 200);
        pop();
    }

}