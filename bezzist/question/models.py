from django.db import models

from base.models import AbstractUserScoredModel

from answer.models import Answer


class Question(AbstractUserScoredModel):

    question = models.CharField(max_length=300)
    answers = models.ManyToManyField(Answer, blank=True, related_name='question')

    # Meta
    active = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)

    class Meta:
        ordering = ['-score', 'created']

    def __unicode__(self):
        return '{} by {}'.format(self.question, self.user.get_full_name())
