import cv2 #PERMITE ACESSAR A WEBCAM - Ao instalar o mediapipe, ele já vem atrelado
import os #AJUDA A TRABALHAR COM PASTAS E ENDEREÇOS DE PASTA DO PRÓPRIO COMPUTADOR
import numpy as np
from Functions import npy_to_keypoints as nk
from Functions import draw_lines as dl
import time

# Pegando respostas do usuário
nome_gesto = input("Nome do gesto: ")
sequence_length = 30 #Números de frames por amostra

#vendo se a pasta Gestos_ajudantes existe
if os.path.exists("Gestos_ajudantes") == False :
    print("A pasta 'Gestos_ajudantes' ainda não foi gerada!")
    exit()

# vendo se o gesto que deseja exibir existe na pasta Gestos_ajudantes
if os.path.exists(f"Gestos_ajudantes\\{nome_gesto}") == False :
    print(f"A pasta '{nome_gesto}' não foi encontrada dentro da pasta 'Gestos_ajudantes'!")
    exit()

# CONTAGEM REGRESSIVA
for a in reversed(range(10)) :
    # parece que ele não deixa carregar a mesma imagem de novo
    image_main = cv2.imread(os.path.join(f"black.jpg"))
    cv2.putText(image_main, f"{a}", (200, 200),
                    cv2.QT_FONT_NORMAL, 0.4, (255, 255, 255), 10, cv2.LINE_AA)
    cv2.imshow("Captura", image_main)
    time.sleep(1)

for sequence in os.listdir(os.path.join(f"Gestos_ajudantes\\{nome_gesto}")):
    sequence = int(sequence)
    
    # Loop de frames
    for frame_num in range(sequence_length):
        # verificando se um tal frame existe na pasta da amostra da vez
        if os.path.exists(f"Gestos_ajudantes\\{nome_gesto}\\{sequence}\\{frame_num}.npy") == False :
            print(f"O frame '{frame_num}' não foi encontrada dentro da pasta '{sequence}'!")
            exit()

        # Lendo imagem
        npyFile = os.path.join(f"Gestos_ajudantes\\{nome_gesto}\\{sequence}\\{frame_num}.npy")
        npyArray = np.load(npyFile)
        pose_kps, leftHand_kps, rightHand_kps = nk.npy_to_keypoints(npyArray)

        # DECLARANDO AQUI PARA LIMPARA A IMAGEM A CADA FRAME
        image_black = cv2.imread(os.path.join(f"black.jpg"))
        
        # DESENHANDO PONTOS DO CORPO
        for pose_kp in pose_kps :
            pose_x = int(pose_kp.x * 450)
            pose_y = int(pose_kp.y * 450)
            cv2.circle(image_black, (pose_x,pose_y), 5, (0,255,255), -1)

         # DESENHANDO PONTOS DA MÃO ESQUERDA
        for lHand in leftHand_kps :
            lHand_x = int(lHand.x * 450)
            lHand_y = int(lHand.y * 450)
            cv2.circle(image_black, (lHand_x,lHand_y), 5, (256,20,0), -1)

        # DESENHANDO PONTOS DA MÃO DIREITA
        for rHand in rightHand_kps :
            rHand_x = int(rHand.x * 450)
            rHand_y = int(rHand.y * 450)
            cv2.circle(image_black, (rHand_x,rHand_y), 5, (256,20,0), -1)

        # DESENHANDO LINHAS
        dl.draw_lines(image_black, "pose", pose_kps)
        dl.draw_lines(image_black, "left_hand", leftHand_kps)
        dl.draw_lines(image_black, "right_hand", rightHand_kps)

        #LEGENDA
        quem_gravou = "Rafael" if sequence in range(0,39) else (
                "Carlos" if sequence in range(40,79) else (
                    "Victor" if sequence in range(80,119) else "Pedro"
                )
            ) 
        
        legenda = f"{nome_gesto.upper()} gravado por {quem_gravou.upper()} => amostra {sequence} / frame {frame_num}"
        cv2.putText(image_black, legenda, (3, 460),
                         cv2.QT_FONT_NORMAL, 0.4, (255, 255, 255), 1, cv2.LINE_AA)

        cv2.imshow("Captura", image_black)
        time.sleep(0.06)

        # estava dando um bug ao tentar adicionar uma pausa em branco aqui, não sei o pq
        if frame_num == 29 :
            time.sleep(2)

        if cv2.waitKey(10) & 0xFF == ord('q'):
                break

cv2.destroyAllWindows()  # Fecha todas as telas do cv2.imshow(), mesmo que elas não estejam respondendo
