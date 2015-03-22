from django.db import models
from django.utils import timezone

from base.models import AbstractUserScoredModel

from answer.models import Answer


class Question(AbstractUserScoredModel):

    question = models.CharField(max_length=300)
    answers = models.ManyToManyField(Answer, blank=True, related_name='question')

    # Meta
    published_datetime = models.DateTimeField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
    locked = models.BooleanField(default=False)

    class Meta:
        ordering = ['-score', 'created']

    def __unicode__(self):
        return '{} by {}'.format(self.question, self.user.get_full_name())

    def save(self, *args, **kwargs):
        if not self.published_datetime and self.active:
            self.published_datetime = timezone.now()
        super(Question, self).save(*args, **kwargs)