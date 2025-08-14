from flask import Flask
from flask import redirect, render_template

app = Flask(__name__)

@app.route("/")
def inicio():
    return redirect("/menu")

@app.route("/menu")
def menu():
    return render_template("inicio.html")

if __name__ == '__main__':
    app.run(debug=True)