from django.conf.urls import include, patterns, url

from .api import ActiveUserResource


urlpatterns = patterns(
    '',
    url(r'^active$', ActiveUserResource.as_view()),
)
