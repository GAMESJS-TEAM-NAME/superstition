class InputHandler {
    checkPraying() {
        if (PoseRecognition.pose != null) {
            let leftWrist = {
                x: PoseRecognition.pose.keypoints[9].position.x,
                y: PoseRecognition.pose.keypoints[9].position.y
            }
            let rightWrist = {
                x: PoseRecognition.pose.keypoints[10].position.x,
                y: PoseRecognition.pose.keypoints[10].position.y
            }

            let leftEar = {
                x: PoseRecognition.pose.keypoints[3].position.x,
                y: PoseRecognition.pose.keypoints[3].position.y
            }
            let rightEar = {
                x: PoseRecognition.pose.keypoints[4].position.x,
                y: PoseRecognition.pose.keypoints[4].position.y
            }
            const distBetweenWrist = dist(leftWrist.x, leftWrist.y, rightWrist.x, rightWrist.y)
            const distBetweenEars = dist(leftEar.x , leftEar.y , rightEar.x , rightEar.y);
            if (distBetweenWrist <= distBetweenEars * 1.5) {
                return true;
            }
        }
        return false;
    }

    checkSalting() {
        if (PoseRecognition.pose != null) {
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
            return leftWrist.y > rightWrist.y ? rightWrist : leftWrist;
        }
        return false;
    }

    checkJump() {
        if (PoseRecognition.pose != null && PoseRecognition.prevPose != null) {
            let hip = {
                y1: PoseRecognition.pose.keypoints[11].position.y,
                y2: PoseRecognition.pose.keypoints[12].position.y
            };
            let prevHip = {
                y1: PoseRecognition.prevPose.keypoints[11].position.y,
                y2: PoseRecognition.prevPose.keypoints[12].position.y
            };
            const hipAvg = (hip.y1 + hip.y2) / 2;
            const prevHipAvg = (prevHip.y1 + prevHip.y2) / 2;
            return (hipAvg - prevHipAvg < -10);
        }
        return false;
    }

    checkRotate() {
        if (PoseRecognition.pose != null) {
            let rightShoulder = {
                x: PoseRecognition.pose.keypoints[6].position.x,
                y: PoseRecognition.pose.keypoints[6].position.y
            };
            let lefttShoulder = {
                x: PoseRecognition.pose.keypoints[5].position.x,
                y: PoseRecognition.pose.keypoints[5].position.y
            };
            const distBetweenShouders = dist(lefttShoulder.x, lefttShoulder.y, rightShoulder.x, rightShoulder.y);
            return (distBetweenShouders < 15);
        }
        return false;
    }

}