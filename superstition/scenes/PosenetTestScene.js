
function PoseNetScene() {
    let input;
    let player;

    this.setup = function () {
        input = new InputHandler();
        player = new PlayerModel(color(255,0,0));
        input.addEventListener("jump", this.jump);
    }

    this.draw = function () 
    {
        background(255);
        input.update();
        player.draw();
    }

    this.jump = function()
    {
        console.log("jumping");
    }

}


