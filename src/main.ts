//1. start the webcam and display it width="640" height="480"
//2. draw om top of webcam feed
//3. pose estimation with tensoflow.js
//4. hello world version of clown
//5. map the clown to the pose
//6. 
import './style.css'
import * as poseDetection from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-backend-webgl'
import { Clown } from './clown';

const camera = document.getElementById('camera')!;
const canvas = document.getElementById('scene')!;

var canvas_drawing_context = canvas.getContext("2d");
// canvas_drawing_context.fillStyle = "#FF0000";
// canvas_drawing_context.fillRect(0, 0, 200, 100);


async function initCamera() {
  console.log('camera')
  const videoStream = await navigator.mediaDevices.getUserMedia({
    video:{
      facingMode: 'user',
      width: {ideal: window.innerWidth},
      height: {ideal: window.innerHeight},
    },
    audio: false
  })

  let onCameraReady : (ready: boolean) => void;

  const cameraReadyPromise = new Promise((resolve) => onCameraReady = resolve)

  camera.onloadedmetadata = () => onCameraReady(true)
  camera.srcObject = videoStream

  return cameraReadyPromise
}


async function start(){
  await initCamera();
  const detector = await initPoseDetection()
  const clown = new Clown(canvas_drawing_context)

  async function render(){
    const poses = await detector.estimatePoses(camera)
    canvas_drawing_context.clearRect(0, 0, window.innerWidth, window.innerHeight) 
    if( poses[0] ){
      clown.draw(poses[0])
    }
        
    requestAnimationFrame(render)
  }

  render()
}

async function initPoseDetection() {
  const model = poseDetection.SupportedModels.BlazePose;
  const detector = await poseDetection.createDetector(model!,{
    //runtime:'mediapipe' //good performance on laptop but bad on iPhone
    runtime: 'tfjs',
    modelType: 'lite',//what version of blaze model to use, lite is lithest but also least accurate, // checkout for most accurate one
    maxPoses: 1,//can detect more than one pose 
  } as poseDetection.BlazePoseTfjsModelConfig);

  return detector
}

start();