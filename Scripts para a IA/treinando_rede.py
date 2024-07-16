import os #AJUDA A TRABALHAR COM PASTAS E ENDEREÇOS DE PASTA DO PRÓPRIO COMPUTADOR
import csv
import numpy as np #AJUDA A TRABALHAR COM DIFERENTES ARRAYS
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical

#Acessando a pasta raiz para poder importar a pasta "Functions"
# parent = os.path.realpath(__file__)
# sys.path.append(parent.replace('//Scripts para a IA//treinando_rede.py',''))

#import lista_gestos as lg

#* Coletando nomes dos gestos que cujo as imagens serão capturadas
#* DATA_PATH é uma pasta que vai guardar frames de amostras de gestos salvos como arrays do numpy
#DATA_PATH = os.path.join('Gestos_ajudantes') #Pasta que vai guardar todos os gestos
#actions = np.array(lg.lista_nomes) #Cada String aqui é uma pasta, que representa 1 sinal específico da LIBRAS
#no_sequences = 160 #Número de amostras por gesto
#sequence_length = 30 #Números de frames por amostra

#* Criando um mapa de gestos com index e valor
#label_map = {label:num for num, label in enumerate(actions)}

# sequences, labels = [], [] #sequences são a entrada(x) e labels são as saídas(y)
# for action in actions:
#     for sequence in range(no_sequences):
#         window = [] #cada windows é uma amostra contendo 30 frames
#         for frame_num in range(sequence_length):
#             res = np.load(os.path.join(DATA_PATH, action, str(sequence), f"{frame_num}.npy"))
#             print(os.path.join(DATA_PATH, action, str(sequence), f"{frame_num}.npy --  {len(res)}"))
#             window.append(res) #cada res é um frame
#         sequences.append(window)
#         labels.append(label_map[action])

sinais = []
labels = []

ab = os.path.join("gestos.csv")

with open(ab, newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=';', quotechar='|')
    sinal_coord = 0
    amostra = []
    sinal = ""
    sinal_anterior = " "
    id_sinal = -1

    for frame in spamreader:
      sinal = frame[0]
      frame = frame[-225:]

      if sinal != sinal_anterior:
        id_sinal = id_sinal + 1
        sinal_anterior = sinal

      if len(amostra) != 6525 :
        amostra += list(np.array(frame).astype(float))
      else:
        amostra += list(np.array(frame).astype(float))
        labels.append(id_sinal)
        sinais.append(amostra)
        amostra = []

x = np.array(sinais)
y = to_categorical(labels).astype(int) #? define um array de 0s e 1s específico para cada categoria

#* normalizando as entradas
x_mean = np.mean(x)
x_std = np.std(x)
epsilon = 1e-10

x_norm = (x - x_mean) / (x_std + epsilon)
x_norm = x_norm.reshape(1920,1,6750)

#* separando entradas e saídas de treino e de teste
x_train, x_test, y_train, y_test = train_test_split(x_norm,y,test_size=0.1)

#* Salvando dados de treino
if os.path.exists("Dados de teste") == False :
    os.makedirs("Dados de teste")
npy_path = os.path.join("Dados de teste//x_test_norm")  # Pasta onde o frame será salvo
np.save(npy_path, x_test)

npy_path = os.path.join("Dados de teste//y_test")  # Pasta onde o frame será salvo
np.save(npy_path, y_test)

#* Criando e treinando rede neural LSTM
from keras.models import Sequential
from keras.layers import LSTM, Dense
from keras.callbacks import EarlyStopping, TensorBoard

log_dir = os.path.join('logs')
earlyStop = EarlyStopping(monitor='loss',restore_best_weights=True, mode='min', start_from_epoch=30, patience=10, min_delta=0.1)
tensorB = TensorBoard(log_dir=log_dir)

ultimos_loss = []
ultimos_accuracy = []
loss = 100
accuracy = 0

while loss > 0.2 or accuracy < 0.9 :
   #* Criando camadas
	model = Sequential()

	#* 64 lstm units que não necessariamente é o número de camadas
	#* com return_sequences você está especificando que uma camada precisa retornar algo para a camada seguinte usar
	#* cada linha dessas é uma camada
	#* a terceira camada LSTM não retorna nada porque a camada seguinte é uma camada densa e não precisa desse retorno
	model.add(LSTM(units=128, activation='relu', return_sequences=True, input_shape=(1,6750))) #aqui o número de neurônios será equivalente a 30 * 225
	model.add(LSTM(units=256, activation='relu', return_sequences=True))
	model.add(LSTM(units=128, activation='relu', return_sequences=True))
	model.add(LSTM(units=256, activation='relu', return_sequences=False))
	model.add(Dense(units=64, activation='relu'))
	model.add(Dense(units=128, activation='relu'))
	model.add(Dense(units=64, activation='relu'))
	model.add(Dense(units=len(set(labels)), activation='softmax'))

	#* Após serem definidas as configurações das camadas da rede, ela é compilada
	#* Segundo o cara do vídeo a loss sendo "categorical_crossentropy" é bom para quando você tem um multiplas 	clasificações
	#* Para classificações entre duas opções é possível usar binary_crossentropy
	#* model.compile(optimizer="Adam", loss='categorical_crossentropy', metrics=['categorical_accuracy'])
	model.compile(optimizer="Adam", loss='categorical_crossentropy', metrics=['categorical_accuracy'])
	
	#* TREINANDO MODELO
	model.fit(x_train, y_train, epochs=150, callbacks=[earlyStop])
	loss,accuracy = model.evaluate(x_test,y_test)
	print(f"accuracy: {accuracy}")
	print(f"loss: {loss}")

model.save('gestos.h5')
