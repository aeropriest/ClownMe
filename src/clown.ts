export class Clown{
    constructor(private rendering_context: CanvasRenderingContext2D){}

    private drawHead(pose: Pose){
        const leftEye = pose.keypoints.find((keypoint)=> keypoint.name === 'left_eye')
        const rightEye = pose.keypoints.find((keypoint)=> keypoint.name === 'right_eye')

        const leftMouth = pose.keypoints.find((keypoint)=> keypoint.name === 'mouth_left')
        const rightMouth = pose.keypoints.find((keypoint)=> keypoint.name === 'mouth_right')

        const nose = pose.keypoints.find((keypoint)=> keypoint.name === 'nose')

        this.rendering_context.fillStyle = 'red'
        this.rendering_context.strokeStyle = 'red'
        this.rendering_context.lineWidth = 5

        this.drawCircle(leftEye, 5)
        this.drawCircle(rightEye, 5)
        this.drawCircle(nose, 10)
        
    }
    public drawCircle(obj: Object, rad: number){
        if( obj ){
            this.rendering_context.beginPath();
            this.rendering_context.arc(obj.x - rad, obj.y -rad, rad, 0, 2*Math.PI);
            this.rendering_context.fill();
        }
    }
    public draw(pose: Pose){
        this.drawHead(pose)
    }

}