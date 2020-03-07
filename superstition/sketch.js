


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    window.gameScenes = [CatScene , CarScene , CrackScene];
    var mgr = new SceneManager();
    mgr.wire();
    //TODO change scene
    loadScenes(mgr);
    mgr.showScene(LoadingScene);
    window.debugView = false;
    mgr.player = new PlayerModel(color(255,60,150), width*0.1, height);


}

function loadScenes(sceneManager){
    const scenes = window.gameScenes;
    for(let scene of scenes){
        sceneManager.addScene(scene);
    }
}

