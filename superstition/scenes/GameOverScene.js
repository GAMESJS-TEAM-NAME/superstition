function GameOverScene(){
    this.setup = ()=>{
        console.log("Game over");
        background(255);
        push();
        fill(0);
        textSize(34);
        text("Game Over!" , width/2 , height/2);
        pop();
    }

    this.draw = ()=>{
        
    }

}