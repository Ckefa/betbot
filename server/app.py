#!/usr/bin/env python3


import socketio

sio = socketio.AsyncServer(async_mode="asgi")
app = socketio.ASGIApp(sio)


@sio.event
async def connect(sid, environ):
    print(f"[CONNECTED {sid}]")


@sio.event
async def message(sid, msg):
    print(f"[{sid}: {msg}]")
    return "Data Received !!"


@sio.event
async def disconnect(sid):
    print(f"[DISCONNECTED {sid}]")


if __name__ == "__main__":
    pass
