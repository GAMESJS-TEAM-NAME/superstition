//TODO 
/**
 * TODO 
 * Fix this file , is very ugly :(
 */




window.debug = true;

const PoseRecognition = {
    prediction: null,
    pose: null,
    run: () => {
        let model, webcam, ctx, labelContainer, maxPredictions;
        async function init() {
            const modelInfo = {
                model: './src/PoseRecognition/model/model.json',
                metadata: './src/PoseRecognition/model/metadata.json',
                weights: './src/PoseRecognition/model/weights.bin',
            };
            model = await tmPose.load(modelInfo.model, modelInfo.metadata);
            maxPredictions = model.getTotalClasses();

            // Convenience function to setup a webcam
            const width = 400;
            const height = 400;
            const flip = true; // whether to flip the webcam
            webcam = new tmPose.Webcam(width, height, flip); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            window.requestAnimationFrame(posenetLoop);
            const canvas = document.getElementById("posenetCanvas");
            console.log(canvas);
            canvas.width = width; canvas.height = height;
            ctx = canvas.getContext("2d");
        }

        async function posenetLoop(timestamp) {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(posenetLoop);
        }

        async function predict() {
            // Prediction #1: run input through posenet
            // estimatePose can take in an image, video or canvas html element
            const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
            // Prediction 2: run input through teachable machine classification model
            const prediction = await model.predict(posenetOutput);
            PoseRecognition.pose = pose;
            PoseRecognition.prediction = prediction;
            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                // console.log(classPrediction);
            }

            // finally draw the poses
            if(window.debug)
                drawPose(pose);
        }

        function drawPose(_pose) {
            if (webcam.canvas) {
                ctx.drawImage(webcam.canvas, 0, 0);
                // draw the keypoints and skeleton
                if (_pose) {
                    const minPartConfidence = 0.5;
                    tmPose.drawKeypoints(_pose.keypoints, minPartConfidence, ctx);
                    tmPose.drawSkeleton(_pose.keypoints, minPartConfidence, ctx);
                }
            }
        }
        init();
    }

}
