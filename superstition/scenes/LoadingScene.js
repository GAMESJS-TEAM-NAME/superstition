function LoadingScene(){
    this.setup = ()=>{
        // poseNet.setup();
        
    }
    this.draw = async ()=>{
        background(120);
        drawText("Loading..." , width / 2 , height / 2 , 18 , 0);

        if(PoseRecognition.isLoaded){
            background(255);
            showRandomScene(this);
            // this.sceneManager.showScene(MainMenu);
            // this.sceneManager.showScene(CatScene);
        }
    }
}