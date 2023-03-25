#!/usr/bin/python3
from dataclasses import dataclass
from pandas import DataFrame
from itertools import combinations
from random import gauss, randint


class Epl:
    def __init__(self):
        self.teams = teams = [
            "Ars",
            "Bou",
            "Bur",
            "Che",
            "Cry",
            "Eve",
            "Lei",
            "Liv",
            "MaC",
            "MaU",
            "New",
            "Sou",
            "Tot",
            "Wat",
            "Wes",
            "Wol"]
        self.ratings = [80, 74, 73, 84, 76, 77,
                        79, 84, 85, 82, 78, 75, 81, 73, 79, 78]
        self.table = Table([], [])
        self.C1 = []
        self.C2 = []
        self.s1 = None
        self.n = 0

    def start(self):
        for i, n in enumerate(self.teams):
            tm = Team(i, n, self.ratings[i], [])
            self.table.teams.append(tm)

        self.C1 = list(combinations(self.table.teams, 2))
        self.C2 = list(map(lambda x: (x[1], x[0]), self.C1))

        self.s1 = Schedule(self.C1 + self.C2)

    def fetch(self):
        r = self.s1.get()
        if not r:
            return None
        md = MatchDay(self.n, r, [])
        self.n += 1
        md.start()

        return md


@dataclass
class Team:
    id: int
    name: str
    rank: int
    streak: list
    gpl: int = 0
    pts: int = 0
    win: int = 0
    lose: int = 0
    draw: int = 0
    goals: int = 0

    def __repr__(self):
        return self.name
    
    def __hash__(self):
        return hash((self.id, self.name))

    def __eq__(self, other):
        return self.name == other.name and self.id == other.id 


@dataclass
class Table:
    teams: list
    points: list

    def get_table(self):
        df = DataFrame(self.teams)
        df = df.sort_values(by=['pts'], ascending=False).drop(
            columns=["streak", "rank"])
        df = [
            list(i) for i in zip(
                df["name"],
                df["pts"],
                df["gpl"],
                df["win"],
                df["draw"],
                df["lose"])]

        return df


@dataclass
class Match:
    id: int
    tma: Team
    tmb: Team
    round: int
    res: str = None

    def play(self):
        a = self.tma.rank
        b = self.tmb.rank

        ta = self.tma
        tb = self.tmb

        if not a or not b:
            raise Exception("Rank Error")

        x = randint(2, 3) if a > b else randint(0, 1)
        y = randint(2, 3) if b > a else randint(0, 1)

        a = abs(int(gauss(x, y)))
        b = abs(int(gauss(y, x)))

        a = 4 if a > 4 else a
        b = 4 if b > 4 else b

        if sum([a, b]) > 4:
            return self.play()

        ta.gpl += 1
        tb.gpl += 1

        if a > b:
            ta.pts += 3
            ta.win += 1
            tb.lose += 1
        elif b > a:
            tb.pts += 3
            tb.win += 1
            ta.lose += 1
        else:
            ta.pts += 1
            ta.draw += 1
            tb.pts += 1
            tb.draw += 1

        ta.goals += a
        tb.goals += b

        ta.streak.append(a)
        tb.streak.append(b)

        return [a, b]


@dataclass
class MatchDay:
    id: int
    fixtures: list
    results: list

    def start(self):
        # print(f"-- MatchDay {self.id} --")
        if not self.fixtures:
            print("all games played")
            return None

        for z, m in enumerate(self.fixtures):
            # print(m[0].name, "   vs   ", m[1].name)
            mt = Match(z, m[0], m[1], 1)
            self.results.append(mt.play())

        if len(self.fixtures) != len(self.results):
            raise Exception("Mismatching results")

        # print("---   Results   ----")
        rs = self.results
        for t, j in enumerate(self.fixtures):
            x = f"{j[0].name} {rs[t][0]}"
            y = f"{j[1].name} {rs[t][1]}"
            # print(x, "  -   ", y)


@dataclass
class Schedule:
    calendar: list

    def get(self):
        if not self.calendar:
            return None
        else:
            res = set()
            played = set()

            print("before", len(self.calendar))

            for m in self.calendar:
                if any(t in played for t in m):
                    continue
                res.add(m)
                played.update(m)

            for m in res:
                self.calendar.remove(m)
                
            print("after ", len(self.calendar))
            print("res", len(res))
            return res

if __name__ == "__main__":
    e = Epl()
    e.start()
    while e.fetch():
        pass
