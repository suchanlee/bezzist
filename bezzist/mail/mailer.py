from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .tasks import send_mail


BEZZIST_EMAIL_ADDR = getattr(settings, 'EMAIL_HOST_USER', 'hello@bezzist.com')


class Mailer:

    @staticmethod
    def send_html_mail(subject, template, context, recp_emails):
        '''
        Args:
            subject     : str
            template    : str, placed in the format "mail/[].html"
            context     : dictionary of objects for the template
            recp_emails : a python list of email strings
        '''
        html_content = render_to_string(template, context)
        text_content = strip_tags(html_content)
        send_mail.delay(subject, text_content, BEZZIST_EMAIL_ADDR, recp_emails, html_message=html_content)
