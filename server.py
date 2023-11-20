# unique id using Date.now() do javascript

from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, EqualTo
import time
import os

abacate = Flask(__name__)
abacate.config['SECRET_KEY'] = str(time.time())

class UserRegistration(FlaskForm):
    username = StringField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    confirm_password = PasswordField(label="", validators=[
        EqualTo('password',message="As duas senhas precisam ser iguais!"),
        InputRequired(message="Preenchimento obrigatório!")
    ])

class UserAuthentication(FlaskForm):
    username = StringField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])

class user:
    def __init__(self, username,password):
        self.username = username
        self.password = password

@abacate.route("/home", methods=['GET','POST'], )
def home():
    logon_form = UserRegistration()
    login_form = UserAuthentication()

    print("button: " + request.form['button'])
    print("validade start")
    print(logon_form.validate_on_submit())
    print(logon_form.errors)
    print("validade end")

    if request.method == 'POST' and request.form['button'] == "logon"  and logon_form.validate_on_submit():
        user_folder = os.path.join("users",f"{logon_form.username.data}_{logon_form.password.data}")

        if(os.path.exists(os.path.join(user_folder))):
            return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=True,exist_user_login=True)
        else:
            #! FALTOU REMOVER ACENTOS E CARACTERES ESPECIAIS NO USUÁRIO E SENHA, PRA NÃO DAR PROBLEMA NO LINUX
            #! FAZER O TRATAMENTO INVERSO, REMOVER TUDO QUE NÃO FOR NÚMERO OU LETRA
            os.mkdir(user_folder)
            return render_template("what_sample.html", user=user(logon_form.username.data,logon_form.password.data))

    elif request.method == 'POST' and request.form['button'] == "login"  and login_form.validate_on_submit():
        #! A REMOÇÃO DE CARACTERES ESPECIAIS DEVE SER FEITA TAMBÉM AQUI, JÁ QUE O USUÁRIO NÃO ESTÁ CIENTE DESTE TRATAMENTO
        user_folder = os.path.join("users",f"{login_form.username.data}_{login_form.password.data}")

        if(os.path.exists(os.path.join(user_folder))):
            return render_template("what_sample.html", user=user(login_form.username.data,login_form.password.data))
        else:
            return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=False,exist_user_login=False)

    return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user_logon=False,exist_user_login=True)


if __name__ == '__main__':
    abacate.run(debug=True)

    # ! EU VOU TER QUE ACHAR UM FORMA DE ELE NÃO ESTRANHAR A CONFIRMAÇÃO DE SENHA FICANDO VAZIA NO LOGIN, PORÉM SENDO OBRIGATÓRIO NO LOGON