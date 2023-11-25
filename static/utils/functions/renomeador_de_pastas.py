#Código para trocar nome de pastas de amostras quando for necessário juntar amostras que possuem o mesmo número

import os

def renomeador_de_pastas(hash,pasta,action):
    DATA_PATH = os.path.join('users',hash,action,pasta)
    nro_inicio = 0

    if os.path.exists(DATA_PATH):
        for amostra in os.listdir(os.path.join(DATA_PATH)) :
            amostra_pasta = os.path.join(DATA_PATH,str(amostra))
            amostra_novoNome = os.path.join(DATA_PATH,f"quase_{nro_inicio}")

            os.rename(amostra_pasta, amostra_novoNome)
            nro_inicio = nro_inicio + 1

            print("em cima: " + amostra_novoNome)

        nro_inicio = 0

        for amostra in os.listdir(os.path.join(DATA_PATH)) :
            amostra_pasta = os.path.join(DATA_PATH,str(amostra))
            amostra_novoNome = os.path.join(DATA_PATH,str(nro_inicio))

            os.rename(amostra_pasta, amostra_novoNome)
            nro_inicio = nro_inicio + 1

            print("em baixo: " + amostra_novoNome)
        