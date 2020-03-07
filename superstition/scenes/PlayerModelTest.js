function PlayerModelTest() {
    let player;
    this.setup = function()
    {
        player = new PlayerModel(color(255,0,0));
    }

    this.draw = function () 
    {
        background(220);
        player.draw();
    }



}