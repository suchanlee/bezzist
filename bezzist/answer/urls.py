from django.conf.urls import include, patterns, url

from .api import (AnswerResource, IncrementScoreRpcResource,
    ActiveAndFeaturedAnswerRpcResource, DecrementScoreRpcResource)


urlpatterns = patterns(
    '',
    url(r'^activeAndFeatured$', ActiveAndFeaturedAnswerRpcResource.as_view()),
    url(r'^(?P<pk>\d+)/incrementScore$', IncrementScoreRpcResource.as_view()),
    url(r'^(?P<pk>\d+)/decrementScore$', DecrementScoreRpcResource.as_view()),
    url(r'^', include(AnswerResource.urls())),
)
