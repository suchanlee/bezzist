from django.db import models
from django.utils.html import escape

from base.models import AbstractUserScoredModel


class Answer(AbstractUserScoredModel):

    answer = models.CharField(max_length=300)
    questionTemp = models.ForeignKey(Question, blank=True, null=True, related_name='answers')

    class Meta:
        ordering = ['-score', 'created']

    def __unicode__(self):
        return self.answer

    def save(self, *args, **kwargs):
        self.answer = escape(self.answer)
        super(Answer, self).save(*args, **kwargs)
