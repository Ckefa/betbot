from .master import timer, ms

from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .serializers import CustomerSerializer, UserSerializer
from .models import Customer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie


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
