from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin

from .views import LandingView

urlpatterns = patterns(
    '',
    url(r'^$', LandingView.as_view(), name='landing_view'),
    url(r'^api/v1/alerts/', include('alert.urls')),
    url(r'^api/v1/answers/', include('answer.urls')),
    url(r'^api/v1/profiles/', include('userprofile.urls')),
    url(r'^api/v1/questions/', include('question.urls')),
    url(r'^admin/', include(admin.site.urls))
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
