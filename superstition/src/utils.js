const showRandomScene = (currentSceneHandler) => {
    function getRandom(max){
        return Math.floor(Math.random() * (max));
    }
    const currentScene = currentSceneHandler.sceneManager.scene.fnScene
    const gameScenes = window.gameScenes;

    //Pick a random game scene
    let randomIndex = getRandom(gameScenes.length);
    while(gameScenes[randomIndex] == currentScene)
        randomIndex = getRandomInt(gameScenes.lenght);
    currentSceneHandler.sceneManager.showScene(gameScenes[randomIndex]);
}