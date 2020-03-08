const showRandomScene = (currentSceneHandler) => {
    function getRandom(max) {
        return Math.floor(Math.random() * (max));
    }
    const gameScenes = window.gameScenes;
    let randomIndex = getRandom(gameScenes.length);
    while (randomIndex === window.prevRandomIndex)
        randomIndex = getRandom(gameScenes.length);

    window.prevRandomIndex = randomIndex;

    currentSceneHandler.sceneManager.showScene(gameScenes[randomIndex]);
}

//TODO pe60 da go napravi
const calculateScale = (val) => {

}

const drawText = (str, x, y, size = 34)=>{
    //fill(color);
    textSize(size);
    textAlign(CENTER, CENTER);
    text(str, x, y);
}
