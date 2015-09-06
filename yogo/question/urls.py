from django.conf.urls import include, patterns, url

from .api import QuestionResource, IncrementScoreRpcResource, DecrementScoreRpcResource


urlpatterns = patterns(
    '',
    url(r'^(?P<pk>\d+)/incrementScore$', IncrementScoreRpcResource.as_view()),
    url(r'^(?P<pk>\d+)/decrementScore$', DecrementScoreRpcResource.as_view()),
    url(r'^', include(QuestionResource.urls())),
)
