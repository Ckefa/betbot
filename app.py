#!/usr/bin/env python3


"""Flask's command-line utility for administrative tasks."""


from flask import Flask, render_template
from flask_cors import CORS
from api import base, db
from api.views import User


app = Flask(__name__, template_folder="bbot/dist", static_folder="bbot/dist/assets")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.secret_key = "Ckefa7474"
app.register_blueprint(base)
CORS(app, origins="*")

db.init_app(app)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0")
