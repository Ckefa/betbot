from . import virtual_football as vfl

from threading import Thread
from time import sleep


"""Define class Timer."""


class Timer:
    # """Manages time for the program."""
    count = 0

    def __init__(self, limit=60):
        self.limit = limit
        self.current = 0
        t1 = Thread(target=self.__counter)
        t1.start()

    def __counter(self):
        # """Increment current value by 1 every second."""
        while True:
            sleep(1)
            self.current += 1  # increase the current time by 1 second
            if self.get_time() < 1:
                # """Checks if the time has reached the limit."""
                self.current = 0  # restarts the value of current time value
                self.count += 1

    def get_time(self):
        # """Return the current time state."""
        return self.limit - self.current


"""Define class Master."""


class Master:
    """Controls the api."""
    md = 0
    epl, table = [], []
    cache, tcache = [], []
    ongoing, completed = [], []

    def __init__(self):
        self.league = vfl.Epl()
        self.league.start()
        self.t1 = Thread(target=self.control)
        self.t1.start()

    def run_games(self):
        self.epl = self.league.fetch()
        if self.epl:
            self.md = self.epl.id + 1
            self.ongoing = [[i[0].name, i[1].name] for i in self.epl.fixtures]
            self.completed = self.cache
            self.cache = [[[i[0][0], i[1][0]], [i[0][1], i[1][1]]]
                          for i in zip(self.ongoing, self.epl.results)]
            self.table = self.tcache
            self.tcache = self.league.table.get_table()

        if self.md > 29:
            self.league.__init__()

    def control(self):
        while True:
            if timer.get_time() in {60, 59, 58}:
                thread = Thread(target=self.run_games())
                thread.start()
                thread.join()
                sleep(56)
            else:
                sleep(1)

# _____ classes and functions ending_________________#


timer = Timer()
ms = Master()
