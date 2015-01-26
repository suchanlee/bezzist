from django.conf.urls import patterns, url

from .api import ActiveUserRpcResource, UserAuthRpcResource, UserLogoutRpcResource, UserCreateRpcResource

urlpatterns = patterns(
    '',
    url(r'^active$', ActiveUserRpcResource.as_view()),
    url(r'^create$', UserCreateRpcResource.as_view()),
    url(r'^login$', UserAuthRpcResource.as_view()),
    url(r'^logout$', UserLogoutRpcResource.as_view()),
)
