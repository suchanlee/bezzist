from django.db import models

from base.models import AbstractUserScoredModel


class Answer(AbstractUserScoredModel):

    answer = models.CharField(max_length=300)

    class Meta:
        ordering = ['-score', 'created']

    def __unicode__(self):
        return self.answer
