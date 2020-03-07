function LoadingScene(){
    this.setup = ()=>{
        // poseNet.setup();   
    }

    

    this.draw = async ()=>{
        background(120);
        fill(0);
        text("Loading..." , width/2 , height/2);
        if(PoseRecognition.isLoaded){
            background(255);
            this.sceneManager.showScene(PlayerModelTest);
        }
    }
}