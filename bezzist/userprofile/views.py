from django.contrib.auth import logout
from django.core.urlresolvers import reverse_lazy
from django.views.generic.base import RedirectView, TemplateView

from userprofile.models import UserConfirmation


class LogoutView(RedirectView):

    def get_redirect_url(self, *args, **kwargs):
        logout(self.request)
        return reverse_lazy('landing_view')


class ConfirmationView(RedirectView):

    permanent = False

    def get_redirect_url(self, *args, **kwargs):
        try:
            confirmation = UserConfirmation.objects.get(confirmation_code=kwargs.get('code'))
            confirmation.confirm_user()
            return reverse_lazy('landing_view')
        except:
            return reverse_lazy('confirmation_fail_view')


class ConfirmationFailView(TemplateView):

    template_name = 'site/confirmation_fail.html'