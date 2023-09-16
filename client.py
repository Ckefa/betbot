#!/usr/bin/env python3


import socket
import json
from time import sleep


from os import environ

HEADER = 64
FORMAT = "utf-8"
DISCONNECT = "quit"


class Server:
    if "SERVER" in environ:
        HOST = environ["HOST"]
    else:
        HOST = "172.17.0.2"
    PORT = 5050

    def __init__(self):
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def send(self, message=None, data=None):
        body = {"message": message, "data": data}
        body = json.dumps(body)

        msg_len = len(body)
        self.server.send(str(msg_len).encode(FORMAT))

        sleep(0.2)
        self.server.send(body.encode(FORMAT))

    def receive(self):
        self.send(message="league")
        msg_len = self.server.recv(HEADER).decode(FORMAT)
        msg_len = int(msg_len)
        data = self.server.recv(msg_len).decode(FORMAT)
        data = json.loads(data)
        return data

    def connect(self):
        self.server.connect((Server.HOST, Server.PORT))
        msg = self.server.recv(HEADER).decode(FORMAT)
        print(msg)

    def quit(self):
        self.send(DISCONNECT)
        self.server.close()


def fetch():
    server = Server()
    server.connect()
    data = server.receive()
    server.quit()
    return data


if __name__ == "__main__":
    print(fetch())
