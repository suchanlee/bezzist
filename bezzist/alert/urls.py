from django.conf.urls import patterns, url

from .api import ActiveAlertsRpcResource


urlpatterns = patterns(
    '',
    url(r'^displayed', ActiveAlertsRpcResource.as_view()),
)
