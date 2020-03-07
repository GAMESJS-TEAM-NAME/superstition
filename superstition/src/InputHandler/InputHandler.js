class InputHandler extends EventTarget
{
    constructor(){
        super()
        this.minConfidence = 0.7;
    }

   
    update()
    {
        if(PoseRecognition.prediction != null){
            const predictionProb = PoseRecognition.prediction.map(e => parseFloat(e.probability.toFixed(2)));
            const maxPredictionProb = Math.max(...predictionProb);
            const highestPrediction = PoseRecognition.prediction.filter(e => e.probability.toFixed(2) == maxPredictionProb)[0];
            console.log(highestPrediction.className);
            this.dispatchEvent(new Event(highestPrediction.className))   
        }
            
        //         this.dispatchEvent(new Event('jump'));
                

        //     if(keyPressed === 'A')
        //         this.dispatchEvent(new Event('left'));

        //     if(keyPressed === 'D')
        //         this.dispatchEvent(new Event('right'));

        //     if(keyPressed === 'S')
        //         this.dispatchEvent(new Event('duck'));
        // }
    }


}