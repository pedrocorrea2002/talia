import cv2 #PERMITE ACESSAR A WEBCAM - Ao instalar o mediapipe, ele já vem atrelado
import os #AJUDA A TRABALHAR COM PASTAS E ENDEREÇOS DE PASTA DO PRÓPRIO COMPUTADOR
from static.utils.functions.npy_to_keypoints import npy_to_keypoints
import static.utils.functions.draw_lines as dl
import csv
import numpy as np

sequence_length = 30 #Números de frames por amostra

#* carregando sinais de exemplo
sinais_exemplo = []
gestos_csv = os.path.join("gestos2.csv")
with open(gestos_csv, newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=';', quotechar='|')

    for row in spamreader:
        sinais_exemplo.append(row)

def modal_feeder(frames):# Loop de frames
    #* percorrendo linhas já divididas por ;
    for frame in frames:
        path_name = os.path.join("exemplos",frame[0])

        if os.path.exists(path_name) == False:
            os.mkdir(path_name)

        print(np.array(frame[-225:]))

        pose_kps, leftHand_kps, rightHand_kps = npy_to_keypoints(np.array(frame[-225:]).astype(float))

        # DECLARANDO AQUI PARA LIMPARA A IMAGEM A CADA FRAME
        image_black = cv2.imread(os.path.join(f"black.jpg"))
        
        # DESENHANDO PONTOS DO CORPO
        for pose_kp in pose_kps :
            pose_x = int(pose_kp.x * 500)
            pose_y = int(pose_kp.y * 500)
            cv2.circle(image_black, (pose_x,pose_y), 5, (0,255,255), -1)

        # DESENHANDO PONTOS DA MÃO ESQUERDA
        for lHand in leftHand_kps :
            lHand_x = int(lHand.x * 500)
            lHand_y = int(lHand.y * 500)
            cv2.circle(image_black, (lHand_x,lHand_y), 5, (256,20,0), -1)

        # DESENHANDO PONTOS DA MÃO DIREITA
        for rHand in rightHand_kps :
            rHand_x = int(rHand.x * 500)
            rHand_y = int(rHand.y * 500)
            cv2.circle(image_black, (rHand_x,rHand_y), 5, (256,20,0), -1)

        # DESENHANDO LINHAS
        dl.draw_lines(image_black, "pose", pose_kps)
        dl.draw_lines(image_black, "left_hand", leftHand_kps)
        dl.draw_lines(image_black, "right_hand", rightHand_kps)
        
        image_name = os.path.join(path_name,f'{frame[2]}.png')
        cv2.imwrite(image_name,image_black)
        
modal_feeder(sinais_exemplo)