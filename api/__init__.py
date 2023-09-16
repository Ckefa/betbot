"""This is the base api module."""


from flask import Blueprint
from api.db import db

base = Blueprint("base", __name__)


from api.views import *
