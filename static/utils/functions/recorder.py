import cv2
import numpy as np
import mediapipe as mp
import os
import shutil
from flask import redirect, url_for
from static.utils.functions import mediapipe_detection as md
from static.utils.functions import draw_landmarks as dl
from static.utils.functions import extract_keypoints as ek

def recorder(hash, action, folder_range):
    ACTION_PATH = os.path.join("users",hash,action)

    #* REMOVENDO DO RANGE TODAS AS AMOSTRAS QUE JÁ FORAM GRAVADAS E TAMBÉM AS INCOMPLETAS
    #* -------------------------------------------------------------------------------------------
    #* A ideia é resolver um problema que ocorre quando o usuário recarrega a página enquanto está
    #* gravando, o range permanece o mesmo, fazendo com que possa haver repetição de amostras que
    #* já foram gravadas antes do usuário carregar a página
    #* -------------------------------------------------------------------------------------------
    #* DETALHE: Se o usuário recarregar a página antes de terminar de gravar uma amostra, essa
    #* amostra ficará com menos de 30 .npy e deverá ser excluída para evitar problemas
    #* -------------------------------------------------------------------------------------------
    VERIFY_PATH = os.path.join(ACTION_PATH,"normal")
    VERIFY_PATH_VIRADO = os.path.join(ACTION_PATH,"virado")
    for amostra_velha in os.listdir(VERIFY_PATH):      
        pasta_amostra = os.path.join(VERIFY_PATH,amostra_velha)
        pasta_virado = os.path.join(VERIFY_PATH_VIRADO,amostra_velha)

        if len(os.listdir(pasta_amostra)) != 30:
            shutil.rmtree(pasta_amostra, ignore_errors=True)

            if os.path.exists(pasta_virado):
                shutil.rmtree(pasta_virado, ignore_errors=True)

        elif int(amostra_velha) in folder_range:
                folder_range.remove(int(amostra_velha))

        
    print(f"folder_range: {folder_range}")


    #* Declarando variáveis necessárias
    mp_holistic = (mp.solutions.holistic)  #? Possui modelos de marcadores do corpo, mãos e rosto
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW) #? Instânciando câmera
    sequence_length = 30 #? número de frames por amostra

    # Executa enquanto a webcam está ativa
    while cap.isOpened():
        # Coletando o conteúdo capturado pela câmera
        # Frame é a imagem capturada em si
        # ret é só um boooleano
        ret, frame = cap.read()
        
        # Acessando modelo Holistic do mediapipe
        # Testado outros valores para o min_detection_confidence e min_tracking_confidence, melhor deixar 0.5 para os 2 por hora
        with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            #Se eu uso o mesmo holistic para imagens normais e para imagens invertidas, o holistic se perde, porque ele fica tentando acompanhar seu movimento e acaba passando por duas imagens totalmente diferentes
            with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic_rh_v:
                
                # #DELAY ANTES DE COMEÇAR A ENSINAR O SINAL
                for x in reversed(range(10)):
                    success, image = cap.read()
                    cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
                    cv2.putText(image,f"Em {x} segundos: {action}",(15, 20),cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,(255, 255, 255),1,cv2.LINE_AA)
                    
                    (flag, encodedImage) = cv2.imencode(".jpg", frame)
                    if not flag:
                        continue
                    yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                        bytearray(encodedImage) + b'\r\n')
                    
                for sequence in folder_range:
                    #* CRIANDO PASTA DA AMOSTRA
                    os.mkdir(os.path.join(ACTION_PATH,"normal",str(sequence)))
                    os.mkdir(os.path.join(ACTION_PATH,"virado",str(sequence)))
                    
                    for frame_num in range(sequence_length):
                        success, frame = cap.read()
                        
                        # Fazendo detecções dos pontos
                        image_h_v, results_h_v = md.mediapipe_detection(frame, holistic) #amostras originais
                        image_rh_v, results_rh_v = md.mediapipe_detection(cv2.flip(frame, 1), holistic_rh_v) #amostras invertidas na horizontal

                        # Inserindo pontos na imagem
                        dl.draw_landmarks(image_h_v, results_h_v)
                        
                        # Legendas que indicam qual amostra e gesto está sendo coletado
                        # UTIL PARA SABER QUANDO COMEÇA E QUANDO TERMINA CADA COLETA
                        if frame_num == 0:
                            cv2.rectangle(image_h_v, (0, 0), (640, 40), (245, 117, 16), -1)
                            cv2.putText(image_h_v, 'INICIANDO COLETA', (120, 200),
                                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                            cv2.putText(image_h_v, f'Demonstrando "{action}" -- amostra numero {sequence} -- {frame_num}', (15, 20),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
                            cv2.waitKey(
                                2000)  # Mandando esperar para ter tempo de você voltar pra posição original antes de começar a próxima coleta
                        else:
                            cv2.rectangle(image_h_v, (0, 0), (640, 40), (245, 117, 16), -1)
                            cv2.putText(image_h_v, f'Demonstrando "{action}" -- amostra numero {sequence} -- {frame_num}', (15, 20),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

                        # Montando array de coordenadas
                        keypoints_h_v = ek.extract_keypoints(results_h_v) #amostras originais
                        keypoints_rh_v = ek.extract_keypoints(results_rh_v) #amostras invertidas na horizontal

                        # Pasta onde o frame será salvo
                        npy_path_h_v = os.path.join(ACTION_PATH,"normal",str(sequence),str(frame_num)) #amostras originais
                        npy_path_rh_v = os.path.join(ACTION_PATH,"virado",str(sequence),str(frame_num)) #amostras invertidas na horizontal

                        np.save(npy_path_h_v, keypoints_h_v) #amostras originais
                        np.save(npy_path_rh_v, keypoints_rh_v) #amostras invertidas na horizontal

                        (flag, encodedImage) = cv2.imencode(".jpg", image_h_v)
                        if not flag:
                            continue
                        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                            bytearray(encodedImage) + b'\r\n')
                        
                redirect(url_for("sample_recorder"))

    if cap.isOpened() == False:
            black_image = np.zeros((450,640,3), np.uint8)

            cv2.rectangle(black_image, (0, 0), (640, 40), (245, 117, 16), -1)
            cv2.putText(black_image, f'CAMERA NAO DETECTADA', (15, 20),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

            (flag, encodedImage) = cv2.imencode(".jpg", black_image)
            if flag:
                yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                    bytearray(encodedImage) + b'\r\n')
                


#^ EM ALGUNS CASOS SE É DADO F5 NA PÁGINA DO GRAVADOR ELE DÁ O ERRO
'''
  File "C:\Users\pedro\OneDrive\Documentos\Python\teste_flask\static\utils\functions\recorder.py", line 82, in recorder
    image_h_v, results_h_v = md.mediapipe_detection(frame, holistic) #amostras originais
  File "C:\Users\pedro\OneDrive\Documentos\Python\teste_flask\static\utils\functions\mediapipe_detection.py", line 5, in mediapipe_detection
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # converte a imagem do esquema de cores BGR para o esquema RGB
cv2.error: OpenCV(4.8.1) D:\a\opencv-python\opencv-python\opencv\modules\imgproc\src\color.cpp:182: error: (-215:Assertion failed) !_src.empty() in function 'cv::cvtColor'
'''

#^ O celular pega a camera do pc, se eu entro no gravador pelo celular