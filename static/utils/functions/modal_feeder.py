import cv2 #PERMITE ACESSAR A WEBCAM - Ao instalar o mediapipe, ele já vem atrelado
import os #AJUDA A TRABALHAR COM PASTAS E ENDEREÇOS DE PASTA DO PRÓPRIO COMPUTADOR
from static.utils.functions.npy_to_keypoints import npy_to_keypoints
import static.utils.functions.draw_lines as dl
import time

sequence_length = 30 #Números de frames por amostra

def modal_feeder(sinal_nome,sinais_exemplo):# Loop de frames
    frames = []
    image_list = []

    #* pegando apenas frames 
    for exemplo in sinais_exemplo:
        if exemplo.split(";")[0] == sinal_nome :
            frames.append(exemplo[-225:])
        if len(frames) == 30:
            break

    for frame_num, frame in enumerate(frames):
        pose_kps, leftHand_kps, rightHand_kps = npy_to_keypoints(frame)

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
        
        legenda = f"frame {frame_num}"
        cv2.putText(image_black, legenda, (3, 460),
                        cv2.QT_FONT_NORMAL, 0.4, (255, 255, 255), 1, cv2.LINE_AA)

        # cv2.imshow("Captura", image_black)
        # time.sleep(0.06)
        image_list.append(image_black)

        # estava dando um bug ao tentar adicionar uma pausa em branco aqui, não sei o pq
        if frame_num == 29 :
            return image_list

        if cv2.waitKey(10) & 0xFF == ord('q'):
                break

cv2.destroyAllWindows()  # Fecha todas as telas do cv2.imshow(), mesmo que elas não estejam respondendo