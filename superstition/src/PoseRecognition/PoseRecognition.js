class PoseRecognition {
    constructor() {
        this.poseNet = null;
        this.video = null;
        this.onPoses = this.onPoses.bind(this);
        this.isLoaded = false;
        this.pose = null;
        this.prevPose = null;
        this.isDebug = true;
    }

    setup() {
        this.video = createCapture(VIDEO);
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, _ => {
            this.isLoaded = true;
        });
        this.poseNet.on('pose', this.onPoses);
    }

    update() {
        background(255);
        if (this.isDebug && this.pose) {
            // console.log("Jump" , this.checkDuck() , "Duck" , this.checkJump());
            const video = this.video;
            translate(video.width, 0);
            scale(-1.0, 1.0);
            image(video, 0, 0);
            const pose = this.pose;

            const leftHip = pose.leftHip;
            const rightHip = pose.rightHip;
            fill(0, 255, 0);
            stroke(255, 0, 0);
            strokeWeight(15);
            line(leftHip.x, leftHip.y, rightHip.x, rightHip.y);

            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                fill(0, 255, 0);
                strokeWeight(2);
                ellipse(x, y, 16, 16);
            }
        }
    }

    onPoses(poses) {
        if (poses.length) {
            this.prevPose = this.pose;
            this.pose = poses.filter(e=> e.pose.score > 0.2)[0].pose;
        }
    }

    getKeypoints() {
        // console.log(this.pose)
        return this.pose;
    }

    checkJump() {
        if (this.pose && this.prevPose) {
            const hipY = (this.pose.leftHip.y + this.pose.rightHip.y) / 2;
            const prevHipY = (this.prevPose.leftHip.y + this.prevPose.rightHip.y) / 2;
            return ((hipY - prevHipY > 50));
        }
        return false;
    }

    checkDuck(){
        if (this.pose && this.prevPose) {
            const hipY = (this.pose.leftHip.y + this.pose.rightHip.y) / 2;
            const prevHipY = (this.prevPose.leftHip.y + this.prevPose.rightHip.y) / 2;
            // console.log((hipY - prevHipY));
            return ((hipY - prevHipY < -50));
        }
        return false;
    }
}