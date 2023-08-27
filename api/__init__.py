"""This is the base api module."""


from flask import Blueprint
from api.master import Master, timer
from api.db import db


ms = Master()
base = Blueprint("base", __name__)


from api.views import *

