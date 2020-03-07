function TestScene(){
    // let poseNet = new PoseRecognition();
    let input = new InputHandler();
    let y;
    this.setup = ()=>{
        // poseNet.setup();   
        y = height / 2;
        input.addEventListener("jumping" , _=>{
            y = height / 2 - 200;
        })
        input.addEventListener("praying" , _=>{
            y = height / 2;
        })
    }

    

    this.draw = async ()=>{
        input.update();
        background(0);

        
        push();
        fill(255);
        text("KUREC" , width/2 , y);
        pop();
        
    }
}