from django.conf.urls import include, patterns, url

from .api import QuestionResource


urlpatterns = patterns(
    '',
    url(r'^', include(QuestionResource.urls())),
)
