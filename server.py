# unique id using Date.now() do javascript

from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, EqualTo
from flask_login import login_user
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
            return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user=True)
        else:
            os.mkdir(user_folder)
            return render_template("what_sample.html", user=user(logon_form.username.data,logon_form.password.data))

    elif request.method == 'POST' and request.form['button'] == "login"  and login_form.validate_on_submit():
        pass

    return render_template("home.html", form_logon=logon_form, form_login=login_form, exist_user=False)


if __name__ == '__main__':
    abacate.run(debug=True)

    # ! EU VOU TER QUE ACHAR UM FORMA DE ELE NÃO ESTRANHAR A CONFIRMAÇÃO DE SENHA FICANDO VAZIA NO LOGIN, PORÉM SENDO OBRIGATÓRIO NO LOGON