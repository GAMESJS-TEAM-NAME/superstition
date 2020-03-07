
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    var mgr = new SceneManager();
    mgr.wire();
    //TODO change scene
    mgr.showScene(LoadingScene);
    window.debugView = false;

}

