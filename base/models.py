from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    balance = models.FloatField()

    def __str__(self):
        return self.balance


    

    

