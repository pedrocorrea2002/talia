//* ESCUTANDO VÍDEO
const videoContainer = document.querySelector('#video-container');
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

console.log(navigator)

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        amostras = []
        frames = []

        //* PEGANDO FRAMES E CONVERTENDO EM UMA MATRIZ DE PIXELS
        setInterval(function () {
            //* PEGANDO IMAGEM
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            var imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
            var data = imageData.data;

            videoContainer.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';

            //* CONVERTENDO ESSA IMAGEM PARA UMA MATRIZ DE PIXELS
            var matrizPixels = [];
            for (var i = 0; i < video.videoHeight; i++) {
                var linha = [];
                for (var j = 0; j < video.videoWidth; j++) {
                    1 * 4
                    var index = (i * video.videoWidth + j) * 4; // Cada pixel tem 4 componentes (R, G, B, A)     
                    var pixel = [data[index], data[index + 1], data[index + 2], data[index + 3]];
                    linha.push(pixel);
                }
                matrizPixels.push(linha);
            }

            console.log(matrizPixels)

            //* JOGANDO ESSA MATRIZ EM UMA LISTA DE FRAMES
            frames.push(matrizPixels)

            //* QUANDO ESSA LISTA TIVER 30 FRAMES, ESSA IMAGEM É JOGADA NA LISTA DE FRAMES
            if (frames.length == 30) {
                amostras.push(frames)
                frames = []
            }

        }, 1000 / 15);


        // 480x640
    })
    .catch(function (err) {
        console.log('Ocorreu um erro: ' + err.name + ': ' + err.message);
    });

