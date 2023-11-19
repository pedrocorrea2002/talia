# unique id using Date.now() do javascript

from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired
import time

abacate = Flask(__name__)
abacate.config['SECRET_KEY'] = str(time.time())

class UserRegistration(FlaskForm):
    username = StringField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    password = PasswordField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    confirm_password = PasswordField(label="", validators=[InputRequired(message="Preenchimento obrigatório!")])
    situation = ""


@abacate.route("/home")
def Main():
    logon_form = UserRegistration()
    return render_template("home.html", form=logon_form)

def Logon():
    return 

if __name__ == '__main__':
    abacate.run(debug=True)