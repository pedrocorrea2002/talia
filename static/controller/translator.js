// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
    PoseLandmarker,
    HandLandmarker,
    FilesetResolver,
    DrawingUtils
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
  
  // const barra_sinais = document.getElementById("barra_sinais");
  
  let poseLandmarker = undefined;
  let handLandmarker = undefined;
  let runningMode = "IMAGE";
  let enableWebcamButton = null;
  let webcamRunning = false;
  let sinais = [];
  let amostra = [];
  let gravando = true;
  let show_landmarks = true;
  
  // Before we can use HandLandmarker class we must wait for it to finish
  // loading. Machine Learning models can be large and take a moment to
  // get everything needed to run.
  const createLandmarkers = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numHands: 2
    });
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numPoses: 1
    });
  };

  createLandmarkers();
  
  const video = document.getElementById("video-container");
  const canvasElement = document.getElementById(
    "output_canvas"
  );
  const canvasCtx = canvasElement.getContext("2d");
  const drawingUtils = new DrawingUtils(canvasCtx);
  
  // Checando se a câmera é está disponível para acesso
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  //Se a câmera estiver disponível para acesso é adicionado uma escuta de click nela, se não é informado um mensagem
  if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementsByClassName("webcamButton")[0];
    enableWebcamButton.addEventListener("click", enableCam);
  } else {
    // console.warn("getUserMedia() is not supported by your browser");
    //! COLOCAR UMA POP-UP DE ERRO
  }
  
  // // Enable the live webcam view and start detection.
  function enableCam(event) {
    console.log("wait a minute")

    if (!handLandmarker || !poseLandmarker) {
      console.log("Wait! objectDetector not loaded yet.");
      return;
    }

    if(sinais.length == 5 && sinais[-1].length == 30){
      sinais = []
    }
  
    if (webcamRunning === true) {
      webcamRunning = false;
      // enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
      webcamRunning = true;
      // enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }
  
    // getUsermedia parameters.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);

      console.log("aaa")
      document.getElementById("botao-play-icon").src = "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/stop_button_play-256.png"
    });
  }
  
  let lastVideoTime = -1;
  let resultsHands = undefined;
  let resultsPose = undefined;

  async function predictWebcam() {
    console.log("predict")

    canvasElement.style.width = video.videoWidth;;
    canvasElement.style.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;
    let frame = []
    
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await handLandmarker.setOptions({ runningMode: "VIDEO" });
      await poseLandmarker.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      resultsHands = handLandmarker.detectForVideo(video, startTimeMs);
      resultsPose = poseLandmarker.detectForVideo(video, startTimeMs);
    }
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // DESENHANDO PONTOS DA MÃO E PASSANDO PARA O ARRAY
    for (const hand_landmark of resultsHands.landmarks) {
      // Desenhando o esqueleto ou não, conforme escolha do usuário
      if(show_landmarks){
        drawingUtils.drawLandmarks(hand_landmark, { color: "#FF0000", lineWidth: 2 });
        drawingUtils.drawConnectors(hand_landmark, HandLandmarker.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5
        });
      }

      for(const point in hand_landmark){
        frame += point.x
        frame += point.y
        frame += point.z
      }
    }
    
    let maos_faltantes = 2 - resultsHands.landmarks.length

    for(let index = 0; index < (maos_faltantes*21 + 1); index++){
      frame += 0
      frame += 0
      frame += 0
    }

    
    canvasCtx.save()

    // Percorrendo pontos do corpo
    if (resultsPose.landmarks) {
      console.log("resultsPose: ",resultsPose.landmarks)
      for (const pose_landmark of resultsPose.landmarks) {
        // Desenhando o esqueleto ou não, conforme escolha do usuário
        if(show_landmarks){
          drawingUtils.drawLandmarks(pose_landmark, {
            radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
          });
          drawingUtils.drawConnectors(pose_landmark, PoseLandmarker.POSE_CONNECTIONS);
        }

        
        for(const point in pose_landmark){
          frame += point.x
          frame += point.y
          frame += point.z
        }
      };
    }else{
      for(let index = 0; index < 34; index++){
        frame += 0
        frame += 0
        frame += 0
      }
    }

    if(gravando){
      amostra.push(frame)

      if(amostra.length == 30){
        sinais.push(amostra)
        amostra = []

        // barra_sinais.innerHTML += "<div class='marcador_sinal'></div>"
        console.log(`frame: ${frame} |frame`)
        console.log(`${frame.length} -- ${amostra.length} -- ${sinais.length}`)

        // if(sinais.length == 5 && sinais[4].length == 30){
        //   gravando = false
        // }
      }
    }
  
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }
  


  //PARECE SER ALGO NA MÃO