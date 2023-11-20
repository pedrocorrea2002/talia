# unique id using Date.now() do javascript

from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, equal_to, ValidationError
import time
import os

abacate = Flask(__name__)
abacate.config['SECRET_KEY'] = str(time.time())

class UserRegistration(FlaskForm):
    username = StringField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    confirm_password = PasswordField(label="", validators=[
        InputRequired(message="Preenchimento obrigatório!")
        # equal_to(password,"As duas senhas precisam ser iguais!")
    ])

class UserAuthentication(FlaskForm):
    username = StringField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    submit = SubmitField('submit_logon')

@abacate.route("/home", methods=['GET','POST'])
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
            logon_form.username.
            # logon_form.username.post_validate(logon_form, ValidationError(message="Já existe um usuário com esse nome e senha cadastrado!"))
        else:
            os.mkdir(user_folder)

    elif request.method == 'POST' and request.form['button'] == "login"  and login_form.validate_on_submit():
        pass

    return render_template("home.html", form_logon=logon_form, form_login=login_form)

if __name__ == '__main__':
    abacate.run(debug=True)

    # ! EU VOU TER QUE ACHAR UM FORMA DE ELE NÃO ESTRANHAR A CONFIRMAÇÃO DE SENHA FICANDO VAZIA NO LOGIN, PORÉM SENDO OBRIGATÓRIO NO LOGON