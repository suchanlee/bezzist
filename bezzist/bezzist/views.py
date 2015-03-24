from django.views.generic import TemplateView


class LandingView(TemplateView):
    template_name = 'site/landing.html'


class AboutView(TemplateView):
    template_name = 'site/about.html'


class RulesView(TemplateView):
    template_name = 'site/rules.html'


class TermsView(TemplateView):
    template_name = 'site/terms.html'