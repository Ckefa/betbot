from django.urls import path
from . import views

urlpatterns = [
    path("", views.base, name="base"),
    path("results/", views.results, name="results"),
    path("login/", views.userlogin, name="login"),
    path("signup/", views.signup, name="signup"),
    path("status/", views.check_status, name="test"),
    path("logout/", views.user_logout, name="logout"),
    path("fixtures/", views.fixtures, name="fixtures"),
]
