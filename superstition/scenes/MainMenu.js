function MainMenu(){
    this.setup = ()=>{
        bg = loadImage("./assets/backgrounds/menu.png");
    }

    

    this.draw = ()=>{
        background(bg);
        if(keyIsPressed)
            showRandomScene(this);
    }
}