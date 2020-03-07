//TODO 
/**
 * TODO 
 * Fix this file , is very ugly :(
 */




window.debugView = true;

const PoseRecognition = {
    prediction: null,
    pose: null,
    run: () => {
        let model, webcam, ctx, _canvas;
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
            _canvas = document.getElementById("posenetCanvas");
            console.log(_canvas);
            
            _canvas.width = width; _canvas.height = height;
            ctx = _canvas.getContext("2d");
        }

        async function posenetLoop(timestamp) {
            //Show debug canvas
            _canvas.hidden = !window.debugView;
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(posenetLoop);
        }

        async function predict() {
            const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
            const prediction = await model.predict(posenetOutput);
            PoseRecognition.pose = pose;
            PoseRecognition.prediction = prediction;
            
            // Only draw keypoints when in debug mode
            if(window.debugView)
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
