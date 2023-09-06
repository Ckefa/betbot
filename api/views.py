#!/usr/bin/env python3


"""This is Main APi endpoint server."""


from api import base, ms, timer, db
from flask import render_template, request, session


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), unique=True)
    passw = db.Column(db.String(30))
    bal = db.Column(db.Float)


@base.route("/", strict_slashes=False)
def home():
    return render_template("index.html")


@base.route("/place", strict_slashes=False, methods=["POST"])
def place_bet():
    data = request.json
    slip = data.get("slip", None)
    print(slip)

    return {"resp": "bet placed succefully"}


@base.route("/signup", methods=["GET", "POST"], strict_slashes=False)
def register():
    if request.method == "GET":
        users = User.query.all()
        return f"{[user.email for user in users]}"
    if request.method == "POST":
        data = request.json
        new_user = User(email=data["email"], passw=data["pass1"], bal=0.05)
        db.session.add(new_user)
        db.session.commit()
    return {"resp": "registration successful"}


@base.route("/login", methods=["GET", "POST"], strict_slashes=False)
def log_in():
    if request.method == "POST":
        data = request.json
        email = data["email"]
        user = User.query.filter_by(email=email).first()

        if not user:
            return {"resp": "user not registered"}
        elif user.passw == data["password"]:
            session["user"] = user.email
            return {"resp": f"{user.email} login successfully."}
        else:
            return {"resp": "incorrrect password."}

    return "logging in"


@base.route("/logout", strict_slashes=False)
def logout():
    session["user"] = None
    if session.get("user"):
        return {"resp": "logout failed"}
    else:
        return {"resp": "logout success"}


@base.route("/delete/<email>", strict_slashes=False)
def delete(email):
    user = User.query.filter_by(email=email).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return f"{email} deleted successfully."
    else:
        return f"{email} not found in the system."


@base.route("/status", strict_slashes=False)
def status():
    email = session.get("user", None)
    user = User.query.filter_by(email=email).first()
    if user:
        print(user)
        return {"name": user.email, "balance": user.bal}
    else:
        return {"resp": "please login"}


@base.route("/fixtures", strict_slashes=False)
def fixtures():
    return {"fixtures": ms.ongoing, "x": timer.get_time(), "y": ms.md}


@base.route("/results", strict_slashes=False)
def results():
    return {"results": ms.completed, "table": ms.table}
