function PlayerModelTest() {

    this.draw = function () {
        background(220);

        if (PoseRecognition.pose) {

            let arms = {
                left: {
                    shoulder: {
                        x: PoseRecognition.pose.keypoints[5].position.x,
                        y: PoseRecognition.pose.keypoints[5].position.y
                    },
                    elbow: {
                        x: PoseRecognition.pose.keypoints[7].position.x,
                        y: PoseRecognition.pose.keypoints[7].position.y
                    },
                    wrist: {
                        x: PoseRecognition.pose.keypoints[9].position.x,
                        y: PoseRecognition.pose.keypoints[9].position.y
                    }
                },
                right: {
                    shoulder: {
                        x: PoseRecognition.pose.keypoints[6].position.x,
                        y: PoseRecognition.pose.keypoints[6].position.y
                    },
                    elbow: {
                        x: PoseRecognition.pose.keypoints[8].position.x,
                        y: PoseRecognition.pose.keypoints[8].position.y
                    },
                    wrist: {
                        x: PoseRecognition.pose.keypoints[10].position.x,
                        y: PoseRecognition.pose.keypoints[10].position.y
                    }
                }
            }

            let legs = {
                left: {
                    hip: {
                        x: PoseRecognition.pose.keypoints[11].position.x,
                        y: PoseRecognition.pose.keypoints[11].position.y
                    },
                    knee: {
                        x: PoseRecognition.pose.keypoints[13].position.x,
                        y: PoseRecognition.pose.keypoints[13].position.y
                    },
                    foot: {
                        x: PoseRecognition.pose.keypoints[15].position.x,
                        y: PoseRecognition.pose.keypoints[15].position.y
                    }
                },
                right: {
                    hip: {
                        x: PoseRecognition.pose.keypoints[12].position.x,
                        y: PoseRecognition.pose.keypoints[12].position.y
                    },
                    knee: {
                        x: PoseRecognition.pose.keypoints[14].position.x,
                        y: PoseRecognition.pose.keypoints[14].position.y
                    },
                    foot: {
                        x: PoseRecognition.pose.keypoints[16].position.x,
                        y: PoseRecognition.pose.keypoints[16].position.y
                    }
                }
            }

            let head = {
                x: PoseRecognition.pose.keypoints[0].position.x,
                y: PoseRecognition.pose.keypoints[0].position.y
            }




            push();
            stroke(0);
            strokeWeight(10)
            noFill();
            translate(width / 2, height / 2);
            //draw left arm
            bezier(
                arms.left.wrist.x,
                arms.left.wrist.y,
                arms.left.elbow.x,
                arms.left.elbow.y,
                arms.left.elbow.x,
                arms.left.elbow.y,
                arms.left.shoulder.x,
                arms.left.shoulder.y
            );
            //draw right arm
            bezier(
                arms.right.wrist.x,
                arms.right.wrist.y,
                arms.right.elbow.x,
                arms.right.elbow.y,
                arms.right.elbow.x,
                arms.right.elbow.y,
                arms.right.shoulder.x,
                arms.right.shoulder.y
            );
            //draw left leg
            bezier(
                legs.left.foot.x,
                legs.left.foot.y,
                legs.left.knee.x,
                legs.left.knee.y,
                legs.left.knee.x,
                legs.left.knee.y,
                legs.left.hip.x,
                legs.left.hip.y
            );
            //draw right leg
            bezier(
                legs.right.foot.x,
                legs.right.foot.y,
                legs.right.knee.x,
                legs.right.knee.y,
                legs.right.knee.x,
                legs.right.knee.y,
                legs.right.hip.x,
                legs.right.hip.y
            );

            // let bodyX = head.x;
            // let bodyY = (head.y + (legs.left.foot.y + legs.right.foot.y) / 2) / 2;
            // let bodyHeight = Math.abs(head.y - (legs.left.foot.y + legs.right.foot.y) / 2)*0.7;
            let bodyWidth = Math.abs(arms.right.shoulder.x - arms.left.shoulder.x)*1.3;

            // console.log(Math.abs(arms.right.shoulder.x - arms.left.shoulder.x));

            push();
            fill(0);
            // ellipse(
            //     bodyX,
            //     bodyY,
            //     bodyWidth,
            //     bodyHeight

            // )

            beginShape();
            curveVertex(head.x, head.y);
            curveVertex(arms.right.shoulder.x, arms.right.shoulder.y);
            curveVertex(legs.right.hip.x, legs.right.hip.y);
            curveVertex(legs.left.hip.x, legs.left.hip.y);
            curveVertex(arms.left.shoulder.x, arms.left.shoulder.y);
            curveVertex(head.x, head.y);
            endShape();

            ellipse(
                head.x,
                head.y,
                bodyWidth
            )


            pop();

            pop();


        }

    }



}