from django.db import models
from django.utils import timezone

from base.models import AbstractTimeStampedModel, MappableModel


class Alert(AbstractTimeStampedModel, MappableModel):

    SUCCESS = 'SUCCESS'
    INFO = 'INFO'
    WARNING = 'WARNING'
    DANGER = 'DANGER'

    ALERT_TYPES = (
        (SUCCESS, 'Success'),
        (INFO, 'Info'),
        (WARNING, 'Warning'),
        (DANGER, 'Danger')
    )

    ALERT_SORT_MAP = {
        SUCCESS: 1,
        INFO: 2,
        WARNING: 3,
        DANGER: 4
    }

    show_from = models.DateTimeField()
    show_to = models.DateTimeField()
    alert_type = models.CharField(max_length=10, choices=ALERT_TYPES, default=INFO)
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
        self._update_displayed()
        return super(Alert, self).save(*args, **kwargs)

    def _update_displayed(self):
        now = timezone.now()
        if self.show_from <= now and now <= self.show_to:
            self.displayed = True
        else:
            self.displayed = False

    @classmethod
    def alert_cmp(cls, type1, type2):
        '''
        Comparison static method used to sort alerts based on
        their alert types.

        Arguments taken are alert types of the two alerts
        being compared.

        Sorting is as follows:

            Danger > Warning > Info > Success
        '''
        try:
            return cls.ALERT_SORT_MAP.get(type1) - cls.ALERT_SORT_MAP.get(type2)
        except:
            return -1
