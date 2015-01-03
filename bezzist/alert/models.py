from django.db import models
from django.utils import timezone

from base.models import AbstractTimeStampedModel


class Alert(AbstractTimeStampedModel):

    ALERT_SUCCESS = 'SUCCESS'
    ALERT_INFO = 'INFO'
    ALERT_WARNING = 'WARNING'
    ALERT_DANGER = 'DANGER'

    ALERT_TYPES = (
        (ALERT_SUCCESS, 'Success'),
        (ALERT_INFO, 'Info'),
        (ALERT_WARNING, 'Warning'),
        (ALERT_DANGER, 'Danger')
    )

    show_from = models.DateTimeField()
    show_to = models.DateTimeField()
    alert_type = models.CharField(max_length=10, choices=ALERT_TYPES, default=ALERT_INFO)
    title = models.CharField(max_length=100, blank=True)
    content = models.CharField(max_length=500)
    displayed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created']

    def __unicode__(self):
        if self.displayed:
            displayed = 'ON'
        else:
            displayed = 'OFF'
        if self.title:
            content = self.title
        else:
            content = self.content
        return '({}) {}: {}'.format(displayed, self.alert_type, content)

    def save(self, *args, **kwargs):
        self._update_displayed_status()
        return super(Alert, self).save(*args, **kwargs)

    def _update_displayed_status(self):
        now = timezone.now()
        if self.show_from <= now and now <= self.show_to:
            self.displayed = True
        else:
            self.displayed = False
