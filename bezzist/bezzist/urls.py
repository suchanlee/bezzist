from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin

from .views import LandingView
from userprofile.views import ConfirmationView, ConfirmationFailView, LogoutView

urlpatterns = patterns(
    '',
    url(r'^$', LandingView.as_view(), name='landing_view'),
    url(r'^questions/(?P<qId>\d+)$', LandingView.as_view(), name='question_detail_view'),
    url(r'^profiles/logout$', LogoutView.as_view(), name='confirmation_view'),
    url(r'^profiles/activate/(?P<code>\d+)$', ConfirmationView.as_view(), name='confirmation_view'),
    url(r'^profiles/activate/fail$', ConfirmationFailView.as_view(), name='confirmation_fail_view'),

    url(r'^api/v1/alerts/', include('alert.urls')),
    url(r'^api/v1/answers/', include('answer.urls')),
    url(r'^api/v1/profiles/', include('userprofile.urls')),
    url(r'^api/v1/questions/', include('question.urls')),
    url(r'^admin/', include(admin.site.urls))
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
