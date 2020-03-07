function PlayerModelTest() {
    let input;


    this.setup = function () {
        input = new InputHandler();
        input.addEventListener("jump", this.jump);
    }

    this.draw = function () {
        //console.log("KUUUUREC");
        input.update();

        let arms = {
            left: {
                shoulder: {
                    x: 70,
                    y: 50
                },
                elbow: {
                    x: 50,
                    y: 90
                },
                wrist: {
                    x: 70,
                    y: 110
                }
            },
            right: {
                shoulder: {
                    x: 110,
                    y: 50
                },
                elbow: {
                    x: 130,
                    y: 90
                },
                wrist: {
                    x: 110,
                    y: 110
                }
            }
        }

        let legs = {
            left: {
                hip: {
                    x: 70,
                    y: 150
                },
                knee: {
                    x: 50,
                    y: 190
                },
                foot: {
                    x: 70,
                    y: 210
                }
            },
            right: {
                hip: {
                    x: 110,
                    y: 150
                },
                knee: {
                    x: 130,
                    y: 190
                },
                foot: {
                    x: 110,
                    y: 210
                }
            }
        }

        let head = {
            x: 90,
            y: 50
        }



        background(220);
        push();
        stroke(0);
        strokeWeight(4)
        noFill();

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
        pop();
        
        let bodyX = head.x;
        let bodyY = (head.y + (legs.left.foot.y + legs.right.foot.y )/2)/2;
        let bodyHeight = Math.abs(head.y - (legs.left.foot.y + legs.right.foot.y )/2);
        let bodyWidth = Math.abs(arms.right.shoulder.x - arms.right.shoulder.y);

        push();
        fill(0);
        ellipse(
            bodyX,
            bodyY,
            bodyWidth,
            bodyHeight
            
        )
        
        pop();

    }

    this.jump = function () {
        console.log("jumping");
    }

}