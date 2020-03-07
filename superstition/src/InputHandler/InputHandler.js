class InputHandler extends EventTarget
{
    constructor(){
        super()
        this.minConfidence = 0.7;
    }

    checkPraying(){
        if(PoseRecognition.pose != null){
            let leftWrist = {
                x: PoseRecognition.pose.keypoints[9].position.x,
                y: PoseRecognition.pose.keypoints[9].position.y
            }
            let rightWrist = {
                x: PoseRecognition.pose.keypoints[10].position.x,
                y: PoseRecognition.pose.keypoints[10].position.y
            }
            const distBetweenWrist = dist(leftWrist.x , leftWrist.y , rightWrist.x , rightWrist.y)
            if(distBetweenWrist < 50){
                return true;
            }
        }
        return false;
    }

    checkSalting(){
        if(PoseRecognition.pose != null){
            let leftWrist = {
                x: PoseRecognition.pose.keypoints[9].position.x,
                y: PoseRecognition.pose.keypoints[9].position.y
            }
            let rightWrist = {
                x: PoseRecognition.pose.keypoints[10].position.x,
                y: PoseRecognition.pose.keypoints[10].position.y
            }
            let nose = {
                x: PoseRecognition.pose.keypoints[0].position.x,
                y: PoseRecognition.pose.keypoints[0].position.y
            }
            // const leftWristNoseDist = dist(leftWrist.x , leftWrist.y , nose.x , nose.y);
            // const rightWristNoseDist = dist(rightWrist.x , rightWrist.y , nose.x , nose.y);
            // console.log("Dist" , );
            let a = (leftWrist.y < nose.y);
            let b = (rightWrist.y < nose.y);
            //XOR
            if(a)
                return leftWrist
            if(b)
                return rightWrist
        }
        return false;
    }

    checkJump(){
        if(PoseRecognition.pose != null && PoseRecognition.prevPose != null){
            let hip = {
                y1: PoseRecognition.pose.keypoints[11].position.y,
                y2: PoseRecognition.pose.keypoints[12].position.y
            };
            let prevHip ={
                y1: PoseRecognition.prevPose.keypoints[11].position.y,
                y2: PoseRecognition.prevPose.keypoints[12].position.y
            };
            const hipAvg = (hip.y1 + hip.y2) / 2;
            const prevHipAvg = (prevHip.y1 + prevHip.y2) / 2;
            return ( hipAvg - prevHipAvg < -10 );
        }
        return false;
    }

    checkRotate(){
        if(PoseRecognition.pose != null){
            let rightShoulder =  {
                x: PoseRecognition.pose.keypoints[6].position.x,
                y: PoseRecognition.pose.keypoints[6].position.y
            };
            let lefttShoulder =  {
                x: PoseRecognition.pose.keypoints[5].position.x,
                y: PoseRecognition.pose.keypoints[5].position.y
            };
            const distBetweenShouders = dist(lefttShoulder.x , lefttShoulder.y , rightShoulder.x , rightShoulder.y);
            return (distBetweenShouders < 15);
        }
        return false;
    }

   
    update()
    {
        // console.log(this.checkJump())
        // if(PoseRecognition.prediction != null){
            // const predictionProb = PoseRecognition.prediction.map(e => parseFloat(e.probability.toFixed(2)));
            // const maxPredictionProb = Math.max(...predictionProb);
            // const highestPrediction = PoseRecognition.prediction.filter(e => e.probability.toFixed(2) == maxPredictionProb)[0];
            // console.log(highestPrediction.className);
            // this.dispatchEvent(new Event(highestPrediction.className))   
        // }
            
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