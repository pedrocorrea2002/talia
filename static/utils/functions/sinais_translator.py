import numpy as np
from keras import models
from lista_gestos import lista_nomes

#* variáveis globais
model = models.load_model("gestos5.h5")
threshold = 0.9
actions = np.array(lista_nomes)

def sinais_translator(input):
    #* normalizando dados
    pred_array = np.array(input).reshape(1,1,6750)
    # pred_mean = np.mean(pred_array)
    # pred_std = np.std(pred_array)
    # epsilon = 1e-10

    # pred_array = (pred_array - pred_mean) / (pred_std + epsilon)

    #* traduzindo
    resp = model.predict(pred_array)[0]

    if resp[np.argmax(resp)] > threshold and actions[np.argmax(resp)][0] != "_" :
        return actions[np.argmax(resp)]
    else:
        return ""


#^ EM ALGUNS CASOS SE É DADO F5 NA PÁGINA DO GRAVADOR ELE DÁ O ERRO
#
#   File "C:\Users\pedro\OneDrive\Documentos\Python\teste_flask\static\utils\functions\recorder.py", line 82, in recorder
#     image_h_v, results_h_v = md.mediapipe_detection(frame, holistic) #amostras originais
#   File "C:\Users\pedro\OneDrive\Documentos\Python\teste_flask\static\utils\functions\mediapipe_detection.py", line 5, in mediapipe_detection
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # converte a imagem do esquema de cores BGR para o esquema RGB
# cv2.error: OpenCV(4.8.1) D:\a\opencv-python\opencv-python\opencv\modules\imgproc\src\color.cpp:182: error: (-215:Assertion failed) !_src.empty() in function 'cv::cvtColor'
#