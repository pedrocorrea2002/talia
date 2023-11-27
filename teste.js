// //* ESCUTANDO VÍDEO
// const video = document.querySelector('#video-container');
// var canvas = document.createElement('canvas');
// var context = canvas.getContext('2d');

// console.log(navigator)

// navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function (stream) {
//         // var video = document.createElement('video');
//         video.srcObject = stream;
//         video.play();

//         amostras = []
//         frames = []

//         //* PEGANDO FRAMES E CONVERTENDO EM UMA MATRIZ DE PIXELS
//         setInterval(function () {
//             //* PEGANDO IMAGEM
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//             let imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
//             let data = imageData.data;

//             //* CONVERTENDO ESSA IMAGEM PARA UMA MATRIZ DE PIXELS
//             let matrizPixels = [];
//             for (let i = 0; i < video.videoHeight; i++) {
//                 let linha = [];
//                 for (var j = 0; j < video.videoWidth; j++) {
//                     1 * 4
//                     let index = (i * video.videoWidth + j) * 4; // Cada pixel tem 4 componentes (R, G, B, A)     
//                     let pixel = [data[index], data[index + 1], data[index + 2], data[index + 3]];
//                     linha.push(pixel);
//                 }
//                 matrizPixels.push(linha);
//             }

            
//             //* JOGANDO ESSA MATRIZ EM UMA LISTA DE FRAMES
//             frames.push(matrizPixels)
            
//             //* QUANDO ESSA LISTA TIVER 30 FRAMES, ESSA IMAGEM É JOGADA NA LISTA DE FRAMES
//             if (frames.length == 30) {
//                 amostras.push(frames)
//                 frames = []
//             }
//             console.log(frames.length,"-",amostras.length)

//             if(amostras.length == 5){
//                 amostras = []
//             }
//         }, 1000 / 15);


//         // 480x640
//     })
//     .catch(function (err) {
//         console.log('Ocorreu um erro: ' + err.name + ': ' + err.message);
//     });

//^ -----------------------------------------------------
import {
    HandLandmarker,
    PoseLandmarker,
    FilesetResolver
} from "./static/libraries/vision_bundle.js"

const vision = await FilesetResolver.forVisionTasks(
    // path/to/wasm/root
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);
const handLandmarker = await HandLandmarker.createFromOptions(
    vision,
    {
    baseOptions: {
        modelAssetPath: "hand_landmarker.task"
    },
    numHands: 2
});

await handLandmarker.setOptions({ runningMode: "video" });

let lastVideoTime = -1;
function renderLoop() {
  const video = document.getElementById("video");

  if (video.currentTime !== lastVideoTime) {
    const detections = handLandmarker.detectForVideo(video);
    processResults(detections);
    lastVideoTime = video.currentTime;
  }

  requestAnimationFrame(() => {
    renderLoop();
  });
}