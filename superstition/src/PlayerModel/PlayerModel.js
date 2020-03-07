class PlayerModel {

    constructor(color)
    {
        this.color = color;
    }


    drawArms(arms) {
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
    }

    drawLegs(legs) {
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
    }

    drawBody(arms, legs, head) {
        beginShape();
        //curveVertex(head.nose.x, head.nose.y);
        curveVertex(head.right.eye.x, head.right.eye.y);
        curveVertex(head.right.ear.x, head.right.ear.y);
        curveVertex(arms.right.shoulder.x, arms.right.shoulder.y);
        curveVertex(legs.right.hip.x, legs.right.hip.y);
        curveVertex(legs.left.hip.x, legs.left.hip.y);
        curveVertex(arms.left.shoulder.x, arms.left.shoulder.y);
        curveVertex(head.left.ear.x, head.left.ear.y);
        curveVertex(head.left.eye.x, head.left.eye.y);
        
        //curveVertex(head.nose.x, head.nose.y);
        //Close up the shape
        endShape(CLOSE);


        // let bodyWidth = Math.abs(arms.right.shoulder.x - arms.left.shoulder.x) * 1.3;
        // ellipse(
        //     head.nose.x,
        //     head.nose.y,
        //     bodyWidth
        // )
    }

    draw() {
        if (PoseRecognition.pose) {

            //get the postitions
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
                nose:  {
                    x: PoseRecognition.pose.keypoints[0].position.x,
                    y: PoseRecognition.pose.keypoints[0].position.y
                },
                left:  {
                    eye: {
                        x: PoseRecognition.pose.keypoints[1].position.x,
                        y: PoseRecognition.pose.keypoints[1].position.y
                    },
                    ear: {
                        x: PoseRecognition.pose.keypoints[3].position.x,
                        y: PoseRecognition.pose.keypoints[3].position.y
                    }
                },
                right:  {
                    eye: {
                        x: PoseRecognition.pose.keypoints[2].position.x,
                        y: PoseRecognition.pose.keypoints[2].position.y
                    },
                    ear: {
                        x: PoseRecognition.pose.keypoints[4].position.x,
                        y: PoseRecognition.pose.keypoints[4].position.y
                    }
                }
            }

            console.log(PoseRecognition.pose);

            //Draw the model
            push();
            //Model settings
            stroke(this.color);
            strokeWeight(12)
            noFill();
            translate(width / 2, height / 2);

            this.drawArms(arms);
            this.drawLegs(legs);



            push();

            fill(this.color);
            noStroke();
            this.drawBody(arms, legs, head);
            pop();



            pop();
        }
    }



}