# unique id using Date.now() do javascript

from flask import Flask, render_template

abacate = Flask(__name__)
abacate.config["ATUM"] = "BALEIA"

@abacate.route("/home")
def Main():
    return render_template("home.html")

if __name__ == '__main__':
    abacate.run(debug=True)