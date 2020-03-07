function MainMenu(){
    this.setup = ()=>{
        bg = loadImage("./assets/backgrounds/menu.png");
    }

    

    this.draw = ()=>{
        background(bg);
        const playerModel = this.sceneManager.player();
        playerModel.draw();
        if(keyIsPressed)
            showRandomScene(this);
    }
}