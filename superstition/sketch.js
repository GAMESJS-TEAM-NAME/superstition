


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    window.gameScenes = [CatScene , CarScene , CrackScene];
    var mgr = new SceneManager();
    mgr.wire();
    //TODO change scene
    loadScenes(mgr);
    mgr.showScene(GhostScene);
    window.debugView = false;

}

function loadScenes(sceneManager){
    const scenes = window.gameScenes;
    for(let scene of scenes){
        sceneManager.addScene(scene);
    }
}

