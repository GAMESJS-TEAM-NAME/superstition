class PoseNet{
    constructor(){
        this.onPoses = this.onPoses.bind(this);
        this.isLoaded = false;
    }


    onPoses(poses){

    }

    setup(){
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, _=>{
            this.isLoaded = true;
        });
        poseNet.on('pose', this.onPoses);
    }

}