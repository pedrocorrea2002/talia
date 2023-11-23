from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired

class SampleRecording(FlaskForm):
    sample_name = StringField(label="", name="sample_name", validators=[InputRequired(message="Preenchimento obrigatório!")])
    length = IntegerField(label="", name="length", validators=[InputRequired(message="Preenchimento obrigatório!")])