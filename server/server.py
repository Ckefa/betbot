#!/usr/bin/env python3


from server.master import Master, timer
from server.crash_game import CrashGame

import json
import socketio
from time import sleep
from threading import Thread

sio = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(sio)

ms = Master()

clients = {}
messages = []
active_users = 0


def master_event():
    while True:
        data = {
            "time": timer.get_time(),
            "md": ms.md,
            "fixtures": ms.ongoing,
            "results": ms.completed,
            "table": ms.table,
        }

        data = json.dumps(data)

        sio.emit("update", data)
        sleep(1)


Thread(target=master_event).start()
crash = CrashGame(sio)


@sio.event
def connect(sid, environ):
    global active_users

    clients[sid] = True
    active_users = len(clients)

    print(f"[CONNECTED: {sid}]")
    print(f"[ACTIVE: {active_users}]")


@sio.event
def place_bet(sid, environ):
    print(environ)
    bet = environ.copy()
    sio.emit("newbet", bet)


@sio.event
def message(sid, msg):
    data = {"user": sid, "msg": msg}
    messages.append(data)
    sio.emit("message", messages)


@sio.event
def update_messages(sid):
    sio.emit("message", messages, to=sid)


@sio.event
def update(sid):
    global active_users

    clients[sid] = True
    active_users = len(clients)

    data = {
        "time": timer.get_time(),
        "md": ms.md,
        "fixtures": ms.ongoing,
        "results": ms.completed,
        "table": ms.table,
    }

    sio.emit("update", data, to=sid)
    return data


@sio.event
def disconnect(sid):
    global active_users

    del clients[sid]
    active_users = len(clients)
    print(f"[DISCONNECTED: {sid}]")
    print(f"[ACTIVE: {active_users}]")
