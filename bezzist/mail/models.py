from django.db import models


class Email(models.Model):
    '''
    Temporary model to hold emails until users are created
    '''
    email = models.EmailField(max_length=100)
