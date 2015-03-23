from django.db import models

from base.models import AbstractUserScoredModel, MappableModel


class Answer(AbstractUserScoredModel, MappableModel):

    answer = models.CharField(max_length=300)

    class Meta:
        ordering = ['-score', 'created']

    def __unicode__(self):
        return self.answer

    def objectify(self):
        return {
            'created': self.created,
            'modified': self.modified,
            'id': self.id,
            'score': self.score,
            'answer': self.answer,
            'user': self.user.id
        }
