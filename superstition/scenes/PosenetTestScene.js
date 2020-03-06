




function PoseNetScene() {
    let input;


    this.setup = function () {
        input = new InputHandler();
        input.addEventListener("jump", this.jump);
    }

    this.draw = function () 
    {
        //console.log("KUUUUREC");
        input.update();
        
    }

    this.jump = function()
    {
        console.log("jumping");
    }

}


