// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License")
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
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0"

const traducoes = document.getElementById("traducoes")
const metadados_sinais = document.getElementById("metadados-sinais")
const metadados_frames = document.getElementById("metadados-frames")
const botao_esqueleto = document.getElementById("botao-esqueleto")
const lista_historico = document.getElementById("historico-palavras")

let poseLandmarker = undefined
let handLandmarker = undefined
let runningMode = "IMAGE"
let enableWebcamButton = null
let webcamRunning = false
let sinais = []
let amostra = []
let gravando = true
let processando = false
let show_landmarks = true
const gif_loading = "<img id='loading' src='/static/styles/loading-circles-acs-rectangles.webp'/>"

//* ADICIONANDO ESCUTA NO BOTÃO DO ESQUELETO
botao_esqueleto.addEventListener("click", hideShow_landmarks)

function hideShow_landmarks(){
  show_landmarks = !show_landmarks

  if(show_landmarks){
    botao_esqueleto.style.background = 'white'
    botao_esqueleto.style.border = '5px #333 solid'
    botao_esqueleto.style.display = 'flex'
    botao_esqueleto.style.justifyContent = 'center'
    botao_esqueleto.style.alignItems = 'center'
  }else{
    botao_esqueleto.style.background = '#333'
    botao_esqueleto.style.border = ''
  }
}

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createLandmarkers = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  )
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU"
    },
    runningMode: runningMode,
    numHands: 2,
    min_hand_detection_confidence: 0.3
  })
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
      delegate: "GPU"
    },
    runningMode: runningMode,
    numPoses: 1,
    min_pose_presence_confidence: 0.7
  })
}

createLandmarkers()

const video = document.getElementById("video-container")
const canvasElement = document.getElementById("output_canvas")

const canvasCtx = canvasElement.getContext("2d")
const drawingUtils = new DrawingUtils(canvasCtx)

// Checando se a câmera é está disponível para acesso
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia

//Se a câmera estiver disponível para acesso é adicionado uma escuta de click nela, se não é informado um mensagem
if (hasGetUserMedia()) {
  enableWebcamButton = document.getElementById("botao-play")
  enableWebcamButton.addEventListener("click", enableCam)
} else {
  // console.warn("getUserMedia() is not supported by your browser")
  //! COLOCAR UMA POP-UP DE ERRO
}

// // Enable the live webcam view and start detection.
function enableCam(event) {
  //* ADICIONA O LOADING
  // videoBox.innerHTML += gif_loading

  if (!handLandmarker || !poseLandmarker) {
    console.log("Wait! objectDetector not loaded yet.")
    return
  }

  if (processando == true) {
    return
  }

  if (sinais.length == 5 && sinais[-1] && sinais[-1].length == 30) {
    sinais = []
  }

  if (webcamRunning === true) {
    webcamRunning = false
    document.getElementById("botao-play-icon").src = "https://cdn4.iconfinder.com/data/icons/round-buttons/128/red_play.png"
    metadados_sinais.innerText = ""
    metadados_frames.innerText = ""
    traducoes.innerText = ""

    // enableWebcamButton.innerText = "ENABLE PREDICTIONS"
  } else {
    webcamRunning = true
    document.getElementById("botao-play-icon").src = "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/stop_button_play-256.png"
    // enableWebcamButton.innerText = "DISABLE PREDICTIONS"
  }

  // getUsermedia parameters.
  const constraints = {
    video: true
  }

  // Activate the webcam stream.
  if (!processando) {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream
      video.addEventListener("loadeddata", predictWebcam)
      gravando = false
    })
  }
}

let lastVideoTime = -1
let resultsHands = undefined
let resultsPose = undefined

async function predictWebcam() {
  // if(document.getElementById("loading")){
  //   document.getElementById("loading").remove()
  // }

  //* Ajustando tamanho do vídeo caso o celular esteja em pé ou deitado
  if(video.videoHeight < video.videoWidth){ //* deitado
    canvasElement.width = video.offsetHeight * 4/3
    canvasElement.height = video.offsetHeight
    document.getElementsByClassName("video_screen")[0].style.aspectRatio = "4/3"
  }else{ //* em pé
    canvasElement.width = video.offsetHeight * 3/4
    canvasElement.height = video.offsetHeight
    document.getElementsByClassName("video_screen")[0].style.aspectRatio = "3/4"
  }
  let frame = []

  // Now let's start detecting the stream.
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO"
    await handLandmarker.setOptions({ runningMode: "VIDEO" })
    await poseLandmarker.setOptions({ runningMode: "VIDEO" })
  }
  let startTimeMs = performance.now()
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime
    resultsHands = handLandmarker.detectForVideo(video, startTimeMs)
    resultsPose = poseLandmarker.detectForVideo(video, startTimeMs)
  }
  canvasCtx.save()
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

  // DESENHANDO PONTOS DA MÃO E PASSANDO PARA O ARRAY
  for (const hand_landmark of resultsHands.landmarks) {
    // Desenhando o esqueleto ou não, conforme escolha do usuário
    if (show_landmarks) {
      drawingUtils.drawLandmarks(hand_landmark, { color: "#FF0000", lineWidth: 2 })
      drawingUtils.drawConnectors(hand_landmark, HandLandmarker.HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5
      })
    }

    hand_landmark.forEach((point) => {
      frame.push(point.x)
      frame.push(point.y)
      frame.push(point.z)
    })
  }

  let maos_faltantes = 2 - resultsHands.landmarks.length

  if (maos_faltantes != 0) {
    for (let index = 0; index < (maos_faltantes * 21); index++) {
      frame.push(0)
      frame.push(0)
      frame.push(0)
    }
  }


  canvasCtx.save()

  // Percorrendo pontos do corpo
  if (resultsPose.landmarks.length != 0) {
    // console.log("resultsPose: ",resultsPose.landmarks)
    for (const pose_landmark of resultsPose.landmarks) {
      // Desenhando o esqueleto ou não, conforme escolha do usuário
      if (show_landmarks) {
        drawingUtils.drawLandmarks(pose_landmark, {
          radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
        })
        drawingUtils.drawConnectors(pose_landmark, PoseLandmarker.POSE_CONNECTIONS)
      }

      pose_landmark.forEach((point) => {
        frame.push(point.x)
        frame.push(point.y)
        frame.push(point.z)
      })
    }
  } else {
    for (let index = 0; index < 33; index++) {
      frame.push(0)
      frame.push(0)
      frame.push(0)
    }
  }

  if (gravando) {
    console.log(`${frame.length} -- ${amostra.length} -- ${sinais.length}`)

    amostra.push(frame)
    metadados_frames.innerText = `imagens capturadas ${amostra.length}/30`

    if (amostra.length == 30) {
      sinais.push(amostra)
      metadados_sinais.innerText = `${sinais.length} sinais`
      amostra = []

      // console.log(`frame: ${frame} |frame`)

      if (sinais.length == 1 && sinais[0].length == 30) {
        gravando = false
        processando = true
        traducoes.innerText = "Processando tradução ..."
        webcamRunning = false
        document.getElementById("botao-play-icon").src = "https://cdn4.iconfinder.com/data/icons/round-buttons/128/red_play.png"
        document.getElementById("botao-play-icon").style.filter = "grayscale(100%)"
        document.getElementById("botao-play-icon").style.cursor = "default"
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
        canvasCtx.save()

        //* ENVIANDO REQUISIÇÃO PARA O SERVIDOR PYTHON
        fetch('/translator', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(sinais)
        }).then(response => response.json())
          .then(content => {
            console.log("data:", content)

            if(content.result == ""){
              traducoes.innerText = "Sem tradução!"
            }else{
              traducoes.innerText = content.result
            }

            lista_historico.innerHTML += `<p class='historico-phrase'>${content.result}</p>`
            document.getElementById("botao-play-icon").style.filter = "grayscale(0%)"
            document.getElementById("botao-play-icon").style.cursor = "pointer"
            processando = false
            sinais = []
            frame = []
          })
      }
    }
  }

  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    setTimeout(() => {
      window.requestAnimationFrame(predictWebcam)
    }, 1000 / 15)
  } else {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
  }
}