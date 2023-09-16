#!/usr/bin/env python3


import json
import socket
import threading

from server.master import Master, timer


ms = Master()
HOST = "127.0.0.1"
HOST = socket.gethostbyname(socket.gethostname())
PORT = 5050
ADDR = (HOST, PORT)
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)
FORMAT = "utf-8"
HEADER = 64
DISCONNECT = "quit"


def handle_client(conn, addr):
    print(f"[CONNECTED] {addr}")
    conn.send("connection successfully".encode(FORMAT))
    connected = True

    while connected:
        msg_len = conn.recv(HEADER).decode(FORMAT)
        if msg_len:
            msg_len = int(msg_len)
            msg = conn.recv(msg_len).decode(FORMAT)
            msg = json.loads(msg)

            message = msg.get("message")
            if message == DISCONNECT:
                connected = False

            elif message == "league":
                data = {
                    "time": timer.get_time(),
                    "md": ms.md,
                    "fixtures": ms.ongoing,
                    "results": ms.completed,
                    "table": ms.table,
                }
                data = json.dumps(data)
                conn.send(str(len(data)).encode(FORMAT))
                conn.send(data.encode(FORMAT))

            else:
                data = msg.get("data")
                print(type(data), data)

    conn.close()


def start():
    print("[STARTING] server is starting.....")
    print(f"[RUNNING] on address {HOST}")
    server.listen()
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.activeCount() -1}")


start()
