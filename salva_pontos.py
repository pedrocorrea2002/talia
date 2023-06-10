import cv2 #PERMITE ACESSAR A WEBCAM - Ao instalar o mediapipe, ele já vem atrelado
import mediapipe as mp #FAZ A PARTE DE RECONHECER CORPO, ROSTO E MÃOS E DEFINIR A LOCALIZAÇÃO DE MARCADORES COM BASE NESSE RECONHECIMENTO
import os #AJUDA A TRABALHAR COM PASTAS E ENDEREÇOS DE PASTA DO PRÓPRIO COMPUTADOR
import numpy as np #AJUDA A TRABALHAR COM DIFERENTES ARRAYS
import time
from Functions import mediapipe_detection as md
from Functions import draw_landmarks as dl
from Functions import extract_keypoints as ek

#Variáveis do mediapipe
mp_holistic = mp.solutions.holistic #Possui modelos de marcadores do corpo, mãos e rosto
mp_drawing = mp.solutions.drawing_utils #Desenha esses marcadores na tela

# Coletando nomes dos gestos que cujo as imagens serão capturadas
gestos_nomes = []
gesto = ""
while gesto != "exit" :
    gesto = input("Digite o nome de um gesto que deseja detectar: ")
    gestos_nomes.append(gesto) if gesto != "exit" else ""

#DATA_PATH é uma pasta que vai guardar amostras de gestos salvos como arrays do numpy
DATA_PATH = os.path.join('Gestos') #Pasta que vai guardar todos os gestos
actions = np.array(gestos_nomes) #Cada String aqui é uma pasta, que representa 1 sinal específico da LIBRAS
no_sequences = 120 #Número de amostras por gesto
sequence_length = 30 #Números de frames por amostra

# Criando pastas
for action in actions:
    for sequence in range(no_sequences):
        try:
            os.makedirs(os.path.join(DATA_PATH,action, str(sequence)))
        except:
            pass

# Instanciando a câmera
cap = cv2.VideoCapture(0)

# Acessando modelo Holistic do mediapipe
# Testado outros valores para o min_detection_confidence e min_tracking_confidence, melhor deixar 0.5 para os 2 por hora
with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:

    # Loop de sinais
    for action in actions:
        #DELAY ANTES DE COMEÇAR
        for x in reversed(range(10)):
            success, image = cap.read()
            cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
            cv2.putText(image, f'Em {x} segundos: {action}', (15, 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

            cv2.imshow("Captura", image)
            cv2.waitKey(1000)

        # Loop de amostras ("Vídeos")
        for sequence in range(no_sequences):
            # Loop de frames
            for frame_num in range(sequence_length):
                # Coletando o conteúdo capturado pela câmera
                # Frame é a imagem capturada em si
                # success é só um boooleano que indica se a câmera foi detectada com sucesso ou não
                # o read() precisa está dentro desse for para fazer uma captura por frame_num de cada sequence de cada action
                success, frame = cap.read()

                # Parando o código caso a câmera não foi detectada
                if not success:
                    print("Câmera não detectada!")
                    exit()

                # Fazendo detecções dos pontos
                image, results = md.mediapipe_detection(frame, holistic)

                # Inserindo pontos na imagem
                dl.draw_landmarks(image, results)

                # Legendas que indicam qual amostra e gesto está sendo coletado
                # UTIL PARA SABER QUANDO COMEÇA E QUANDO TERMINA CADA COLETA
                if frame_num == 0:
                    cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
                    cv2.putText(image, 'INICIANDO COLETA', (120, 200),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                    cv2.putText(image, f'Demonstrando "{action}" -- amostra numero {sequence} -- {frame_num}', (15, 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
                    cv2.waitKey(
                        2000)  # Mandando esperar para ter tempo de você voltar pra posição original antes de começar a próxima coleta
                else:
                    cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
                    cv2.putText(image, f'Demonstrando "{action}" -- amostra numero {sequence} -- {frame_num}', (15, 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

                # Salvando marcadores coletados do frame na pasta específica deles
                keypoints = ek.extract_keypoints(results)  # Montando array de coordenadas
                npy_path = os.path.join(DATA_PATH, action, str(sequence),
                                        str(frame_num))  # Pasta onde o frame será salvo
                np.save(npy_path, keypoints)

                # Esse é o comando que mostra na tela o frame capturado
                # "Captura" é o nome da telinha que abre
                # Essa telinha trava caso o loop for interrompido
                # Sempre que for usar esse comando parece ser bom fazer dentro de um loop, mesmo que seja exibido uma imagem fixa
                # TESTADO: Mesmo que aja outro loop após o termino desse a telinha também para de responder
                # A janela com imagem travar não é culpa do término da execução do código em si e sim do término do loop
                cv2.imshow("Captura", image)

                # Encerra o loop quando é apertado a tecla "q"
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break

    cap.release()  # Para de monitorar a câmera
    cv2.destroyAllWindows()  # Fecha todas as telas do cv2.imshow(), mesmo que elas não estejam respondendo
