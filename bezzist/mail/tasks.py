from __future__ import absolute_import

from django.core import mail

from celery import shared_task


@shared_task
def send_mail(subject, text_content, from_email, recp_emails, html_message=None):
    '''
    Tries to send mail with the given parameters.
    '''
    try:
        mail.send_mail(subject, text_content, from_email, recp_emails, html_message=html_message)
    except:
        print 'Failed to send message.'
