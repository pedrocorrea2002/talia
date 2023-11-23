from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, EqualTo

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