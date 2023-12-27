import os
import hashlib
import json
import numpy as np
from flask import Flask, render_template, request, redirect, url_for,jsonify, Response
from flask_login import login_user, current_user, login_required, LoginManager

from static.utils.classes.userAuth_classes import UserAuthentication, UserRegistration
from static.utils.classes.user import user
from static.utils.functions.sinais_translator import sinais_translator
#from static.utils.functions.exibidor_de_amostra import exibidor_de_amostra
# from static.utils.functions.modal_feeder import modal_feeder
# from lista_gestos_funcionais import lista_nomes

# #* carregando sinais de exemplo
# sinais_exemplo = []
# gestos_csv = os.path.join("gestos2.csv")
# with open(gestos_csv, newline='') as csvfile:
#     spamreader = csv.reader(csvfile, delimiter=';', quotechar='|')

#     for row in spamreader:
#         sinais_exemplo.append(row)

#* configurando login
abacate = Flask(__name__)
abacate.config["SECRET_KEY"] = "secret"

login_manager = LoginManager()
login_manager.login_view = "home"
login_manager.init_app(abacate)

@login_manager.user_loader
def load_user(user_id):
    username, password = user_id
    return user(username, password)


@abacate.route("/")
def main():
    return redirect(url_for("home"))


@abacate.route("/home", methods=["GET", "POST"])
def home():
    # if hasattr(current_user,"username"):
    #     return redirect(url_for("translate_screen"))

    logon_form = UserRegistration()
    login_form = UserAuthentication()

    if (
        request.method == "POST"
        and request.form["button"] == "logon"
        and logon_form.validate_on_submit()
    ):
        # * CONVERTENDO O CONJUNTO username_password PARA MD5
        md5_conversor = hashlib.md5()

        user_hash = f"{logon_form.username.data}_{logon_form.password.data}".encode(
            "utf-8"
        )
        md5_conversor.update(user_hash)
        user_hash = md5_conversor.hexdigest()
        md5_conversor.update(logon_form.username.data.encode("utf-8"))
        username_hash = md5_conversor.hexdigest()
        final_hash = f"{username_hash}_{user_hash}"

        user_folder = os.path.join("users", final_hash)

        # * SE A PASTA EXISTE É AVISADO QUE O USUÁRIO JÁ EXISTE, SE NÃO É CRIADO A NOVA PASTA
        if os.path.exists(os.path.join(user_folder)):
            return render_template(
                "home.html",
                form_logon=logon_form,
                form_login=login_form,
                exist_user_logon=True,
                exist_user_login=True
            )
        else:
            os.mkdir(user_folder)
            login_user(user(logon_form.username.data, final_hash))
            return redirect(url_for("translate_screen"))

    elif (
        request.method == "POST"
        and request.form["button"] == "login"
        and login_form.validate_on_submit()
    ):
        # * CONVERTENDO O CONJUNTO username_password PARA MD5
        md5_conversor = hashlib.md5()

        user_hash = f"{login_form.username.data}_{login_form.password.data}".encode(
            "utf-8"
        )
        md5_conversor.update(user_hash)
        user_hash = md5_conversor.hexdigest()
        md5_conversor.update(login_form.username.data.encode("utf-8"))
        username_hash = md5_conversor.hexdigest()
        final_hash = f"{username_hash}_{user_hash}"

        user_folder = os.path.join("users", final_hash)

        # * SE A PASTA EXISTE O LOGIN É FEITO, SE ELA NÃO EXISTE O LOGIN É NEGADO
        if os.path.exists(os.path.join(user_folder)):
            login_user(user(login_form.username.data, final_hash))
            return redirect(url_for("translate_screen"))
        else:
            return render_template(
                "home.html",
                form_logon=logon_form,
                form_login=login_form,
                exist_user_logon=False,
                exist_user_login=False
            )

    return render_template(
        "home.html",
        form_logon=logon_form,
        form_login=login_form,
        exist_user_logon=False,
        exist_user_login=True,
    )

# @abacate.route("/big_buttons", methods=["GET"])
# @login_required
# def big_buttons():
#     return render_template("big_buttons.html", username=current_user.username)


# @abacate.route("/sample_recorder", methods=["GET", "POST"])
# @login_required
# def sample_recorder():
#     sample_form = SampleRecording()
    
#     print(sample_form.validate_on_submit())
#     print(sample_form.errors)
    
#     if(request.method == "POST" and sample_form.validate_on_submit()):
#         sample_name = sample_form.sample_name.data
#         length = sample_form.length.data
#         sample_folder = os.path.join("users",current_user.password,sample_name)
#         start_position = 0
        
#         # VENDO SE O SINAL JÁ FOI GRAVADO POR ESSE MESMO USUÁRIO
#         if os.path.exists(os.path.join(sample_folder)): #SE JÁ FOI GRAVADO
#             start_position = len(os.listdir(os.path.join(sample_folder,"normal")))
#         else: #SE NÃO
#             os.mkdir(sample_folder) # CRIANDO PÁGINA DA AMOSTRA
#             os.mkdir(os.path.join(sample_folder,"normal"))
#             os.mkdir(os.path.join(sample_folder,"virado"))

#         # renomeando as amostras já existentes
#         renomeador_de_pastas(current_user.password,"normal",sample_name)
#         renomeador_de_pastas(current_user.password,"virado",sample_name)
            
#         folder_range = range(start_position+length*2)[start_position:]
        
#         return redirect(url_for("sample_recording",folder_range=folder_range,hash=current_user.password, length=length, sample_name=sample_name))
        
#     return render_template("sample_recorder.html", username=current_user.username, form_sample=sample_form)

# @abacate.route("/sample_recording_<hash>")
# @login_required
# def sample_recording(hash):
#     # desconectando o usuário se ele não for o mesmo usuário que está gravando
#     if hash != current_user.password :
#         return redirect(url_for("sample_recorder"))
    
#     if request.method == "GET":
#         folder_range = request.args.get('folder_range')
#         length = request.args.get('length')
#         sample_name = request.args.get('sample_name')

#         return render_template("sample_recording.html", username=current_user.username, folder_range=folder_range, length=length, sample_name=sample_name, hash=hash)
#     else:
#         samples = json.loads(request.data)

#         print("samples: " + samples)

# @abacate.route("/video_feed_<hash>")
# @login_required
# def video_feed(hash):
#     # desconectando o usuário se ele não for o mesmo usuário que está gravando
#     if hash != current_user.password :
#         return redirect(url_for("sample_recorder"))
    
#     folder_range = request.args.get('folder_range')
#     folder_range = folder_range.replace('range(','').replace(')','').split(',')
#     folder_range = list(range(int(folder_range[0]),int(folder_range[1])))

#     sample_name = request.args.get('sample_name')

#     return Response(recorder(hash,sample_name,folder_range),
#         mimetype = "multipart/x-mixed-replace; boundary=frame")

# @abacate.route("/translate_screen", methods=["GET"])
# # @login_required
# def translate_screen():
#     return render_template('translate_screen.html',username=current_user.username)

# @abacate.route("/translator", methods=["POST"])
# def translator():
#     if request.method == "POST" and request.data :
#         resposta = []
#         sinais = json.loads(request.data)
#         sinais = np.array(sinais)

#         for palavra in sinais:
#             resposta.append(sinais_translator(palavra))

#         return jsonify(result=" ".join(resposta))
    
# @abacate.route("/dicionario", methods=["GET"])
# @login_required
# def dicionario():
#     return render_template("dicionario.html",username=current_user.username, lista_nomes=lista_nomes)

# @abacate.route("/dicionario_modal_<sinal_nome>")
# @login_required
# def dicionario_modal(sinal_nome):
#     image_list = modal_feeder(sinal_nome,sinais_exemplo)

#     #* O PROBLEMA É SE DUAS PESSOAS FOREM OLHAR NESSE CANAL AO MESMO TEMPO
#     #* TAMBÉM NÃO DÁ PRA FAZER UM LOOP DE RETURN

#     #TODO: converter as imagens para gif

#     return Response(image_list,
#          mimetype = "multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    abacate.run(host="0.0.0.0",port=443,debug=True, ssl_context='adhoc')


#^ IF THE skeleton IS SHOWING WILL BE A SESSION
#^ IF THE SYSTEM IS RECORDING WILL BE A PAGE ITSELF (copy of the one where you write what sample is)
#^ RENUMBER THE SAMPLES AFTER YOU DELETE ONE, TO KEEP ALL THEN STARTING ON 0 AND GOING UNTIL THE END WITHOUT MISSES