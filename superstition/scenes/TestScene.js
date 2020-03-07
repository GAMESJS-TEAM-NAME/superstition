function TestScene(){
    // let poseNet = new PoseRecognition();
    let input = new InputHandler();
    this.setup = async ()=>{
        // poseNet.setup();   
    }

    this.draw = async ()=>{
        // poseNet.update();
        input.update();
    }
}