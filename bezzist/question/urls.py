from django.conf.urls import include, patterns, url

from .api import QuestionResource, QuestionScoreRpcResource


urlpatterns = patterns(
    '',
    url(r'^(?P<pk>\d+)/incrementScore$', QuestionScoreRpcResource.as_view()),
    url(r'^', include(QuestionResource.urls())),
)
