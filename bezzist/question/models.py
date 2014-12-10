from django.db import models

from base.models import AbstractUserScoredModel

from answer.models import Answer


class Question(AbstractUserScoredModel):

    question = models.CharField(max_length=300)
    answers = models.ManyToManyField(Answer, blank=True)

    # Meta
    active = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)  # For 1 question/week

    class Meta:
        ordering = ['-score', 'created']

    def __str__(self):
        return '{} by {}'.format(self.question, self.user.get_full_name())
