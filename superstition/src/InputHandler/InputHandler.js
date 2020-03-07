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
            const highestPrediction
            console.log(predictionProb , maxPrediction)
            // const prediction = PoseRecognition.prediction;
            // for (let i = 0; i < 6; i++) {
            //     const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            //     console.log(classPrediction)
            // }
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