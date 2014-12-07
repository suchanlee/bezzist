from django.views.generic import TemplateView


class LandingView(TemplateView):
    template_name = 'site/landing.html'
