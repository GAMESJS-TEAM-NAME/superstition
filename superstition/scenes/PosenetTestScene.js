




function PoseNetScene() {
    let video;
    let poseNet;
    let pose;
    let skeleton;


    this.setup = function () {
        createCanvas(640, 480);
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, this.modelLoaded);
        poseNet.on('pose', this.gotPoses);
    }


    this.gotPoses = function(poses) {
        if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
        }
    }
    
    this.modelLoaded = function() {
        console.log('poseNet ready');
    }
    
    this.draw = function () {

        // Flip video feed horizontally
        image(video, 0, 0, width / 2, height);
        translate(width, 0);
        scale(-1.0, 1.0);
        image(video, 0, 0);
        
        if (pose) {
            console.log(pose);
            var eyeR = pose.rightEye;
            var eyeL = pose.leftEye;
            var d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

            fill(255, 0, 0);

            ellipse(pose.nose.x, pose.nose.y, d);
            fill(0, 0, 255);

            ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
            ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                fill(0, 255, 0);
                ellipse(x, y, 16, 16);
            }

            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                strokeWeight(2);
                stroke(255);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
            }
        }
    }
}


