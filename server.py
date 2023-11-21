# unique id using Date.now() do javascript

from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, EqualTo
import time
import os
import hashlib

abacate = Flask(__name__)
abacate.config['SECRET_KEY'] = "secret"

class UserRegistration(FlaskForm):
    username = StringField(label="", name="logon_username", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", name="logon_password", validators=[InputRequired(message="Preenchimento obrigatório!")])
    confirm_password = PasswordField(label="logon_confirm_password", name="", validators=[
        EqualTo('password',message="As duas senhas precisam ser iguais!"),
        InputRequired(message="Preenchimento obrigatório!")
    ])

class UserAuthentication(FlaskForm):
    username = StringField(label="", name="login_username", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", name="login_password", validators=[InputRequired(message="Preenchimento obrigatório!")])

class user:
    def __init__(self, username,password):
        self.username = username
        self.password = password

@abacate.route("/home", methods=['GET','POST'], )
def home():
    logon_form = UserRegistration()
    login_form = UserAuthentication()

    # print("button: " + request.form['button'])
    print("validade start")
    print(login_form.validate_on_submit())
    print(login_form.errors)
    print("validade end")

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
            print(f"Seja bem vindo: {login_form.username.data}")
            return render_template("what_sample.html", user=user(login_form.username.data,final_hash))
        else:
            return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=False,exist_user_login=False)

    return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=False,exist_user_login=True)


if __name__ == '__main__':
    abacate.run(debug=True)