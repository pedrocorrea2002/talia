from flask import Flask, render_template, request, redirect, url_for, Response
from flask_login import login_user, current_user, login_required, LoginManager
import os
import hashlib
import numpy as np
import cv2
import mediapipe as mp

from utils.classes.userAuth_classes import UserAuthentication, UserRegistration
from utils.classes.user import user
from utils.functions import mediapipe_detection as md
from utils.functions import draw_landmarks as dl
from utils.functions import extract_keypoints as ek

abacate = Flask(__name__)
abacate.config["SECRET_KEY"] = "secret"

login_manager = LoginManager()
login_manager.login_view = "home"
login_manager.init_app(abacate)


@login_manager.user_loader
def load_user(user_id):
    print("user_id")
    print(user_id)
    username, password = user_id
    return user(username, password)


@abacate.route("/")
def main():
    return redirect(url_for("home"))


@abacate.route("/home", methods=["GET", "POST"])
def home():
    if str(current_user)[:-37] != "<flask_login.mixins.AnonymousUs":
        return redirect(url_for("main_buttons"))

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
                exist_user_login=True,
            )
        else:
            os.mkdir(user_folder)
            login_user(user(logon_form.username.data, final_hash))
            return redirect(url_for("main_buttons"))

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
            return redirect(url_for("main_buttons"))
        else:
            return render_template(
                "home.html",
                form_logon=logon_form,
                form_login=login_form,
                exist_user_logon=False,
                exist_user_login=False,
            )

    return render_template(
        "home.html",
        form_logon=logon_form,
        form_login=login_form,
        exist_user_logon=False,
        exist_user_login=True,
    )


@abacate.route("/main_buttons", methods=["GET"])
@login_required
def main_buttons():
    print(current_user.password)

    return render_template("main_buttons.html", username=current_user.username)


@abacate.route("/sample_recorder", methods=["GET", "POST"])
@login_required
def sample_recorder():

    return render_template("sample_recorder.html", username=current_user.username)


def recorder():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    # Cores das barras das 5 palavras mais prováveis
    colors = [
        (245, 117, 16),
        (117, 245, 16),
        (16, 117, 245),
        (50, 245, 50),
        (150, 245, 150),
    ]

    no_sequences = 20
    sequence_length = 30
    action = "presunto"

    # Variáveis do mediapipe
    mp_holistic = (
        mp.solutions.holistic
    )  # Possui modelos de marcadores do corpo, mãos e rosto

    with mp_holistic.Holistic(
        min_detection_confidence=0.5, min_tracking_confidence=0.5
    ) as holistic:
        # Executa enquanto a webcam está ativa
        while cap.isOpened():
            # Coletando o conteúdo capturado pela câmera
            # Frame é a imagem capturada em si
            # ret é só um boooleano
            ret, frame = cap.read()

            for x in reversed(range(10)):
                success, image = cap.read()
                cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
                cv2.putText(image,f"Em {x} segundos: {action}",(15, 20),cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,(255, 255, 255),1,cv2.LINE_AA)

                cv2.imshow("Captura", image)
                cv2.waitKey(1000)
            
            for frame_num in range(sequence_length):
                success, frame = cap.read()

                (flag, encodedImage) = cv2.imencode(".jpg", frame)
                if not flag:
                    continue
                yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                    bytearray(encodedImage) + b'\r\n')

@abacate.route("/video_feed/<current_user.password>")
@login_required
def video_feed():
     return Response(recorder(),
          mimetype = "multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    abacate.run(debug=True)
