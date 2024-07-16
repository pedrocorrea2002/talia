
import os

pasta = os.path.join("Gestos_ajudantes")

for a in os.listdir(pasta):
    subpasta = os.path.join(pasta,a)

    if(len(os.listdir(subpasta)) != 160) :
        print(f"{len(os.listdir(subpasta))} => {a}")

# os.rename()