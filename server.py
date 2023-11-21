from flask import Flask, render_template, request, redirect, url_for
from flask_login import login_user, current_user, login_required, LoginManager
import os
import hashlib
from utils.classes.userAuth_classes import UserAuthentication, UserRegistration
from utils.classes.user import user

abacate = Flask(__name__)
abacate.config['SECRET_KEY'] = "secret"

login_manager = LoginManager()
login_manager.login_view = "home"
login_manager.init_app(abacate)

@login_manager.user_loader
def load_user(user_id):
    username, password = user_id
    return user(username, password)

@abacate.route("/")
def main():
    return redirect(url_for('home'))

@abacate.route("/home", methods=['GET','POST'])
def home():
    logon_form = UserRegistration()
    login_form = UserAuthentication()

    if request.method == 'POST' and request.form['button'] == "logon"  and logon_form.validate_on_submit():
        #* CONVERTENDO O CONJUNTO username_password PARA MD5
        md5_conversor = hashlib.md5()

        user_hash = f"{logon_form.username.data}_{logon_form.password.data}".encode('utf-8')
        md5_conversor.update(user_hash)
        user_hash = md5_conversor.hexdigest()
        md5_conversor.update(logon_form.username.data.encode('utf-8'))
        username_hash = md5_conversor.hexdigest()
        final_hash = f"{username_hash}_{user_hash}"

        user_folder = os.path.join("users",final_hash)

        #* SE A PASTA EXISTE É AVISADO QUE O USUÁRIO JÁ EXISTE, SE NÃO É CRIADO A NOVA PASTA
        if(os.path.exists(os.path.join(user_folder))):
            return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=True,exist_user_login=True)
        else:
            os.mkdir(user_folder)
            return render_template("what_sample.html", user=user(login_form.username.data,user_hash))

    elif request.method == 'POST' and request.form['button'] == "login"  and login_form.validate_on_submit():
        #* CONVERTENDO O CONJUNTO username_password PARA MD5
        md5_conversor = hashlib.md5()

        user_hash = f"{login_form.username.data}_{login_form.password.data}".encode('utf-8')
        md5_conversor.update(user_hash)
        user_hash = md5_conversor.hexdigest()
        md5_conversor.update(login_form.username.data.encode('utf-8'))
        username_hash = md5_conversor.hexdigest()
        final_hash = f"{username_hash}_{user_hash}"

        user_folder = os.path.join("users",final_hash)

        #* SE A PASTA EXISTE O LOGIN É FEITO, SE ELA NÃO EXISTE O LOGIN É NEGADO
        if(os.path.exists(os.path.join(user_folder))):
            login_user(user(login_form.username.data,final_hash))
            return redirect(url_for('what_sample'))
        else:
            return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=False,exist_user_login=False)

    return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=False,exist_user_login=True)

@abacate.route("/what_sample", methods=['GET','POST'])
@login_required
def what_sample():
    print("aqui4")
    return render_template("what_sample.html", username=current_user.username, final_hash=current_user.password)

if __name__ == '__main__':
    abacate.run(debug=True)

#^ IMPREMENTAÇÃO FUTURA, SALVAR username E password NOS COOKIES E FAZER LOGIN AUTOMÁTICO SE EXISTIREM ESSES DOIS NOS COOKIES