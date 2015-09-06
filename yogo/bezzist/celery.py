from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings


APP_NAME = 'bezzist'

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.local')

app = Celery(APP_NAME)

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
