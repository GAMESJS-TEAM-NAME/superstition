function TestScene(){
    let poseNet = new PoseRecognition();
    this.setup = ()=>{
        poseNet.setup();   
    }

    this.draw = ()=>{
        poseNet.update();
    }
}