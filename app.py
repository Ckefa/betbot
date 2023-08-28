#!/usr/bin/env python3


"""Flask's command-line utility for administrative tasks."""


from flask import Flask, render_template

# from flask_login import LoginManager
from flask_cors import CORS
from api import base, db
from api.views import User


app = Flask(__name__, template_folder="bbot/dist", static_folder="bbot/dist/assets")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.secret_key = "Ckefa7474"
app.register_blueprint(base)
# login_manager = LoginManager(app)
CORS(app, origins="*")

db.init_app(app)


"""@login_manager.user_loader
def load_user(email):
    return User.query.filter_by(email=email).first()
"""

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=80)
