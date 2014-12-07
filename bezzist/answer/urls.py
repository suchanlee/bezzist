from django.conf.urls import include, patterns, url

from .api import AnswerResource


urlpatterns = patterns(
    '',
    url(r'^', include(AnswerResource.urls())),
)
