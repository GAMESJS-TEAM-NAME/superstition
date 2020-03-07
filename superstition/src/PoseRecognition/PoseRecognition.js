window.debugView = true;

const PoseRecognition = {
    isLoaded: false,
    prediction: null,
    prevPose: null,
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
            const width = 150;
            const height = 150;
            window.posenetCanvasWidth = 150;
            window.posenetCanvasHeight = 150;
            webcam = new tmPose.Webcam(width, height, true); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            window.requestAnimationFrame(posenetLoop);
            _canvas = document.getElementById("posenetCanvas");
            _canvas.width = width; _canvas.height = height;
            ctx = _canvas.getContext("2d");
        }

        async function posenetLoop(timestamp) {
            //Show debug canvas
            _canvas.hidden = !window.debugView;
            webcam.update(); 
            await predict();
            window.requestAnimationFrame(posenetLoop);
        }

        async function predict() {
            PoseRecognition.prevPose = PoseRecognition.pose;
            const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
            PoseRecognition.isLoaded = true;
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
