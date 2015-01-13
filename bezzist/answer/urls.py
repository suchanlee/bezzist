from django.conf.urls import include, patterns, url

from .api import AnswerResource, AnswerScoreRpcResource


urlpatterns = patterns(
    '',
    url(r'^(?P<pk>\d+)/incrementScore$', AnswerScoreRpcResource.as_view()),
    url(r'^', include(AnswerResource.urls())),
)
