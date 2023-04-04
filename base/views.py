from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .serializers import CustomerSerializer, UserSerializer
from .models import Customer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import virtual_football as vfl
from threading import Thread, current_thread
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import time
import json


@api_view(["POST"])
def signup(request):
    if request.method == "POST":
        data = request.data
        email = data["email"]
        pass1 = data["pass1"]
        pass2 = data["pass2"]

        print(data)

        if pass1 != pass2:
            return Response("error")

        else:
            user = User.objects.create_user(email, email, pass1)
            user.save()
            customer = Customer()
            customer.user = user
            customer.balance = 100
            customer.save()

            return Response("signup success")


@api_view(["POST"])
def userlogin(request):
    if request.method == "POST":
        data = request.data
        email = data["email"]
        pass1 = data["pass1"]
        user = authenticate(request, username=email, password=pass1)
        if user:
            login(request, user)
            # print(request.user, request.user.is_authenticated, user)
            return Response("login success")
        else:
            return Response("invalid details")


@api_view(["GET"])
def check_status(request):
    # print(request.user)
    # print(request.user.username)
    if request.user.is_authenticated:
        customer = Customer.objects.get(user__username=request.user.username)
        customer = CustomerSerializer(customer, many=False)
        temp = customer.data
        temp["name"] = request.user.username
        print(temp)
        return Response(temp)
    else:
        return Response("Null")


@ api_view(["GET"])
def user_logout(request):
    logout(request)
    return Response("logout success")


@api_view(["GET"])
def fixtures(request):
    return Response({"fixtures": ms.ongoing, "x": timer.get_time(), "y": ms.md})


@api_view(["GET"])
def results(request):
    return JsonResponse({"results": ms.completed, "table": ms.table})


def base(request):
    return render(request, "index.html")


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
            time.sleep(1)
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
        Master.league = vfl.Epl()
        Master.league.start()
        Master.t1 = Thread(target=self.control)
        self.t1.start()

    @classmethod
    def run_games(cls):
        # global md, tcache, table, ongoing, completed, cache
        cls.epl = cls.league.fetch()
        if cls.epl:
            cls.md = cls.epl.id + 1
            cls.ongoing = [[i[0].name, i[1].name] for i in cls.epl.fixtures]
            cls.completed = cls.cache
            cls.cache = [[[i[0][0], i[1][0]], [i[0][1], i[1][1]]]
                     for i in zip(cls.ongoing, cls.epl.results)]
            cls.table = cls.tcache
            cls.tcache = cls.league.table.get_table()

        if cls.md > 29:
            cls.league.__init__()
            cls.league.start()

    @classmethod
    def control(cls):
        while True:
            if timer.get_time() in {60, 59, 58}:
                thread = Thread(target=cls.run_games())
                thread.start()
                thread.join()
                time.sleep(56)
            else:
                time.sleep(1)
# _____ classes and functions ending_________________#


timer = Timer()
ms = Master()
