import csv
import os
import numpy as np

with open("gestos.csv","w",newline="") as gestosFile:
    gestowriter = csv.writer(gestosFile, delimiter=';',
                            quotechar='"', quoting=csv.QUOTE_MINIMAL)
    
    DATA_PATH = os.path.join("Gestos_ajudantes")

    for sinal in os.listdir(DATA_PATH):
        PATH_AMOSTRAS = os.path.join(DATA_PATH,sinal)

        for amostra in os.listdir(PATH_AMOSTRAS):
            PATH_FRAMES = os.path.join(PATH_AMOSTRAS,amostra)

            for frame in os.listdir(PATH_FRAMES):
                PATH_FRAME = os.path.join(PATH_FRAMES,frame)
                lista = np.load(PATH_FRAME)
                lista = list(lista)
                linha = [sinal,amostra,frame.replace('.npy','')]
                linha += lista

                gestowriter.writerow(linha)
            