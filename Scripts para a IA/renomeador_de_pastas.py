#Código para trocar nome de pastas de amostras quando for necessário juntar amostras que possuem o mesmo número

import os

nome_gesto = input("Nome da pasta do gesto: ")
#nro_inicio_atual = int(input("Número atual da primeira amostra: "))
nro_inicio = int(input("Número que deve possuir a primeira amostra após a edição: "))
nro_inicio_original = nro_inicio

DATA_PATH = os.path.join('Gestos_ajudantes')

# for gesto in os.listdir(DATA_PATH):
#     nro_inicio = nro_inicio_original

for amostra in os.listdir(os.path.join(DATA_PATH,nome_gesto)) :
    amostra_pasta = os.path.join(DATA_PATH,nome_gesto, str(amostra))
    amostra_novoNome = os.path.join(DATA_PATH,nome_gesto, str(nro_inicio))
    os.rename(amostra_pasta, amostra_novoNome)

    nro_inicio = nro_inicio + 1