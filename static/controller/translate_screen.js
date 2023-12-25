import {
  PoseLandmarker,
  HandLandmarker,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0"

const traducoes = document.getElementById("traducoes")
const metadados_sinais = document.getElementById("metadados-sinais")
const metadados_frames = document.getElementById("metadados-frames")
const botao_play = document.getElementById("botao-play-icon")
const botao_esqueleto = document.getElementById("botao-esqueleto")
const lista_historico = document.getElementById("historico-palavras")
const video_screen = document.getElementById("video-container") //? camada do vídeo da pessoa
const canvasElement = document.getElementById("output_canvas") //? camada do esqueleto
const gif_loading = "<img id='loading' src='/static/styles/loading-circles-acs-rectangles.webp'/>"

let poseLandmarker = undefined
let handLandmarker = undefined
let webcamRunning = false
let sinais = []
let amostra = []
let gravando = true
let processando = false
let show_landmarks = true
let lastVideoTime = -1
let resultsHands = undefined
let resultsPose = undefined
const canvasCtx = canvasElement.getContext("2d")
const drawingUtils = new DrawingUtils(canvasCtx)

//* Adicionando escuta no botão do esqueleto
botao_esqueleto.addEventListener("click", hideShow_landmarks)

//* Função para mostrar e ocultar o esqueleto
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

//* Antes de usar as classes HandLandmarker e PoseLandmarker, nós devemos esperar elas terminarem de carregar
//* Os modelos de Machine Learning usados aqui são pesados e podem levar um tempo para estarem prontos para uso
const createLandmarkers = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  )
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: 2,
    min_hand_detection_confidence: 0.3
  })
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numPoses: 1,
    min_pose_presence_confidence: 0.7
  })
}

createLandmarkers()

//TODO: criar notificação para caso a câmera não esteja disponível
//* Checando se a câmera é está disponível para acesso
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia

//* Se a câmera estiver disponível para acesso é adicionado uma escuta de click no botão responsável por ativá-la
//* se não, é informado é mostrado uma notificação
if (hasGetUserMedia()) {
  botao_play.addEventListener("click", enableCam)
} else {
  // console.warn("getUserMedia() is not supported by your browser")
  //! COLOCAR UMA POP-UP DE ERRO
}

// // Enable the live webcam view and start detection.

//* Liga e desliga a câmera
function enableCam(event) {
  //* ADICIONA O LOADING
  // videoBox.innerHTML += gif_loading

  if (!handLandmarker || !poseLandmarker) {
    console.log("Wait! objectDetector not loaded yet.")
    return
  }

  //^ se a tradução estiver processando o botão de play não deve fazer nada
  if (processando == true) {
    return
  }

  // if (sinais.length == 5 && sinais[-1] && sinais[-1].length == 30) {
  // }
  
  if (webcamRunning === true) {
    webcamRunning = false
    botao_play.src = "https://cdn4.iconfinder.com/data/icons/round-buttons/128/red_play.png"
    metadados_sinais.innerText = ""
    metadados_frames.innerText = ""
    traducoes.innerText = ""
    sinais = []

    // enableWebcamButton.innerText = "ENABLE PREDICTIONS"
  } else {
    webcamRunning = true
    botao_play.src = "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/stop_button_play-256.png"
    // enableWebcamButton.innerText = "DISABLE PREDICTIONS"
  }

  // getUsermedia parameters.
  const constraints = {
    video: true
  }

  // Activate the webcam stream.
  if (!processando) {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video_screen.srcObject = stream
      video_screen.addEventListener("loadeddata", getMovements)
      gravando = true
    })
  }
}

//* Desenha o esqueleto
//* Coleta a coordenadas dos pontos do corpo da pessoa
//* Faz a tradução de até 5 sinais pro vez
//* Mostra tradução na tela
//* Salva a tradução no histórico
async function getMovements() {
  // if(document.getElementById("loading")){
  //   document.getElementById("loading").remove()
  // }

  //* Ajustando tamanho do vídeo caso o celular esteja em pé ou deitado
  if(video_screen.videoHeight < video_screen.videoWidth){ //* deitado
    canvasElement.width = video_screen.offsetHeight * 4/3
    canvasElement.height = video_screen.offsetHeight
    video_screen.style.aspectRatio = "4/3"
  }else{ //* em pé
    canvasElement.width = video_screen.offsetHeight * 3/4
    canvasElement.height = video_screen.offsetHeight
    video_screen.style.aspectRatio = "3/4"
  }
  let frame = []
  
  let startTimeMs = performance.now()
  if (lastVideoTime !== video_screen.currentTime) {
    lastVideoTime = video_screen.currentTime
    resultsHands = handLandmarker.detectForVideo(video, startTimeMs)
    resultsPose = poseLandmarker.detectForVideo(video, startTimeMs)
  }
  
  canvasCtx.save()
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

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

  if (gravando) {
    console.log(`${frame.length} -- ${amostra.length} -- ${sinais.length}`)

    amostra.push(frame)
    metadados_frames.innerText = `imagens capturadas ${amostra.length}/30`

    if (amostra.length == 30) {
      sinais.push(amostra)
      metadados_sinais.innerText = `${sinais.length} sinais`
      amostra = []

      // console.log(`frame: ${frame} |frame`)

      if (sinais.length == 5 && sinais[4].length == 30) {
        gravando = false
        processando = true
        traducoes.innerText = "Processando tradução ..."
        webcamRunning = false
        botao_play.src = "https://cdn4.iconfinder.com/data/icons/round-buttons/128/red_play.png"
        botao_play.style.filter = "grayscale(100%)"
        botao_play.style.cursor = "default"
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
        canvasCtx.save()

        //* ENVIANDO REQUISIÇÃO PARA O SERVIDOR PYTHON
        getTranslation()
      }
    }
  }

  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    setTimeout(() => {
      window.requestAnimationFrame(getMovements)
    }, 1000 / 15)
  } else {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
  }
}

//* enviando lista de coordenadas do pontos e pegando a tradução
function getTranslation(){
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
      botao_play.style.filter = "grayscale(0%)"
      botao_play.style.cursor = "pointer"
      processando = false
      sinais = []
      frame = []
  })
}