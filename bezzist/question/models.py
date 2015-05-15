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
    locked = models.BooleanField(default=False)
    default_visible_answers = models.SmallIntegerField(default=5)

    # deprecated field, still here to not remove existing field values
    # and in case we may need it later. Does not do anything.
    finished = models.BooleanField(default=False)

    class Meta:
        ordering = ['-score', 'created']

    def __unicode__(self):
        return '{} by {}'.format(self.question, self.user.get_full_name())

    def save(self, *args, **kwargs):
        if not self.published_datetime and self.active:
            self.published_datetime = timezone.now()
        super(Question, self).save(*args, **kwargs)

    def publish(self):
        if not self.active:
            self.active = True
            self.save()

    def finish(self):
        if not self.finished:
            self.finished = True
            self.save()
