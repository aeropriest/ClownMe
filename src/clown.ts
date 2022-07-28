export class Clown{
    constructor(private rendering_context: CanvasRenderingContext2D){}

    private drawHead(pose: Pose){
        const leftEye = pose.keypoints.find((keypoint)=> keypoint.name === 'left_eye')
        const rightEye = pose.keypoints.find((keypoint)=> keypoint.name === 'right_eye')
    }
}