import cv2
import mediapipe as mp
from static.utils.functions import mediapipe_detection as md
from static.utils.functions import draw_landmarks as dl
from static.utils.functions import extract_keypoints as ek

def recorder(hash, no_sequences, action, folder_range):
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    # Cores das barras das 5 palavras mais prováveis
    colors = [
        (245, 117, 16),
        (117, 245, 16),
        (16, 117, 245),
        (50, 245, 50),
        (150, 245, 150),
    ]
    
    sequence_length = 30

    # Variáveis do mediapipe
    mp_holistic = (
        mp.solutions.holistic
    )  # Possui modelos de marcadores do corpo, mãos e rosto

    with mp_holistic.Holistic(
        min_detection_confidence=0.5, min_tracking_confidence=0.5
    ) as holistic:
        # Executa enquanto a webcam está ativa
        while cap.isOpened():
            # Coletando o conteúdo capturado pela câmera
            # Frame é a imagem capturada em si
            # ret é só um boooleano
            ret, frame = cap.read()

            # for x in reversed(range(10)):
            #     success, image = cap.read()
            #     cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
            #     cv2.putText(image,f"Em {x} segundos: {action}",(15, 20),cv2.FONT_HERSHEY_SIMPLEX,
            #         0.5,(255, 255, 255),1,cv2.LINE_AA)

            #     cv2.imshow("Captura", image)
            #     cv2.waitKey(1000)
            
            for frame_num in range(sequence_length):
                success, frame = cap.read()

                (flag, encodedImage) = cv2.imencode(".jpg", frame)
                if not flag:
                    continue
                yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                    bytearray(encodedImage) + b'\r\n')
