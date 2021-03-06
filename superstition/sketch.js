function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    window.gameScenes = [CatScene , CarScene , CrackScene, GhostScene];
    var mgr = new SceneManager();
    mgr.wire();
    //TODO change scene
    loadScenes(mgr);
    mgr.showScene(LoadingScene);
    window.debugView = true;
    mgr.player = new PlayerModel(color(100,60,150), width*0.1, height);
    mgr.score = 0;


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight , true);
}

function loadScenes(sceneManager){
    const scenes = window.gameScenes;
    for(let scene of scenes){
        sceneManager.addScene(scene);
    }
}

