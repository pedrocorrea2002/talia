import cv2 #PERMITE ACESSAR A WEBCAM - Ao instalar o mediapipe, ele já vem atrelado
import mediapipe as mp #FAZ A PARTE DE RECONHECER CORPO, ROSTO E MÃOS E DEFINIR A LOCALIZAÇÃO DE MARCADORES COM BASE NESSE RECONHECIMENTO
import numpy as np
import pyttsx3
from keras import models
from Functions import mediapipe_detection as md
from Functions import draw_landmarks as dl
from Functions import extract_keypoints as ek

# Carregando modelo treinado
model = models.load_model("gestos.h5")

# Iniciando voz
engine = pyttsx3.init()

#Variáveis do mediapipe
mp_holistic = mp.solutions.holistic #Possui modelos de marcadores do corpo, mãos e rosto
mp_drawing = mp.solutions.drawing_utils #Desenha esses marcadores na tela

#Variáveis de detecção
sequence = [] #Vai conter os 30 frames
sentence = [] #Vai conter um histórico de traduções feitas
threshold = 0.8 #Taxa mínima de confiança necessária no resultado para o resultado ser exibido
gestos_nomes = ['Carlos','Victor','Rafael','Pedro','Oi']
actions = np.array(gestos_nomes)
res = [0]

# Instanciando a câmera
cap = cv2.VideoCapture(0)  # É nessa linha que a câmera é acessada

# Acessando modelo Holistic do mediapipe
# [!!!testar esses dois parametros depois]
with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    # Executa enquanto a webcam está ativa
    while cap.isOpened():
        # Coletando o conteúdo capturado pela câmera
        # Frame é a imagem capturada em si
        # ret é só um boooleano
        ret, frame = cap.read()

        # Fazendo detecções
        image, results = md.mediapipe_detection(frame, holistic)
        dl.draw_landmarks(image, results)

        #2) Lógica da predição
        keypoints = ek.extract_keypoints(results)
        sequence.append(keypoints)

        # garantindo que o sequence conterá sempre apenas os últimos 30 frames coletados
        sequence = sequence[-30:]

        if len(sequence) == 30:
            res = model.predict(np.expand_dims(sequence, axis=0))[0]

        ##### 3) Visualizando resultado #####
        #Checa se o grau de confiança da tradução é maior que 0.4
        if res[np.argmax(res)] > threshold:
            # Caso ainda não existam palavras no array, é adicionado dentro do else
            if len(sentence) > 0:
                # É checado se a palavra atual é igual a palavra anterior, se sim é ignorado a tradução para evitar repetição
                if actions[np.argmax(res)] != sentence[-1]:
                    sentence.append(actions[np.argmax(res)])
                    engine.say(actions[np.argmax(res)])
                    engine.runAndWait() #DIZENDO A TRADUÇÃO
            else:
                sentence.append(actions[np.argmax(res)])
                engine.say(actions[np.argmax(res)])
                engine.runAndWait() #DIZENDO A TRADUÇÃO


        # Garantindo que só serão exibidas as últimas 5 palavras traduzidas
        if len(sentence) > 5:
            sentence = sentence[-5:]

        # Exibindo as 5 últimas traduções na tela
        cv2.rectangle(image, (0,0), (640,40), (245,117,16), -1)
        cv2.putText(image, ' '.join(sentence), (3,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)

        # Esse é o comando que mostra na tela o frame capturado
        # "Captura" é o nome da telinha que abre
        # Essa telinha trava caso o loop for interrompido
        # Sempre que for usar esse comando parece ser bom fazer dentro de um loop igual a esse
        # Mesmo que seja exibido uma imagem fixa
        # TESTADO: Mesmo que aja outro loop em seguida a telinha também para de responder
        # Então não é culpa do término da execução do código em si e sim do término do loop
        cv2.imshow("Captura", image)

        # Encerra o loop quando é apertado a tecla "q"
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()  # Para de monitorar a câmera
    cv2.destroyAllWindows()  # Fecha todas as telas do cv2.imshow(), mesmo que elas não estejam respondendo