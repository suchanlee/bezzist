from django.db import models

from base.models import AbstractUserScoredModel, MappableModel


class Answer(AbstractUserScoredModel, MappableModel):

    answer = models.CharField(max_length=500)

    class Meta:
        ordering = ['-score', 'created']

    def __str__(self):
        return self.answer

    def objectify(self):
        ansObj = {}
        for field in self._meta.fields:
            if field.name != 'user':
                ansObj[field.name] = getattr(self, field.name)
        return ansObj
