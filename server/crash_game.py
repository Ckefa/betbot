#!/usr/bin/env python3

from random import choice
from time import sleep
from threading import Thread


class CrashGame:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not CrashGame._instance:
            CrashGame._instance = super().__new__(cls)
        return CrashGame._instance

    def __init__(self, sio):
        self.sio = sio
        self.hist = []
        self.start_point = 1
        self.crash_data = []

        with open("hist/run2", "r") as file:
            self.crash_data = list(map(float, file.read().split()))

        Thread(target=self.run_game).start()

    def run_game(self):
        while True:
            self.crash_point = choice(self.crash_data)
            multiplier = self.start_point

            while True:
                speed = 0.12
                if multiplier > 25:
                    speed = 0.005
                elif multiplier > 10:
                    speed = 0.01
                elif multiplier > 5:
                    speed = 0.05
                elif multiplier > 2:
                    speed = 0.1

                self.sio.emit("multiplier", multiplier)
                # print(multiplier)
                multiplier += 0.01
                multiplier = round(multiplier, 2)
                sleep(speed)

                if multiplier >= self.crash_point:
                    break

            self.sio.emit("busted", self.crash_point)
            print("Busted @", multiplier)
            sleep(8)


if __name__ == "__main__":
    game = CrashGame(1)
