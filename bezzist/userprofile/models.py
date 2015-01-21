from django.contrib.auth.models import User
from django.db import models

from base.models import AbstractTimeStampedModel, MappableModel
from question.models import Question
from answer.models import Answer


class UserProfile(AbstractTimeStampedModel, MappableModel):

    user = models.OneToOneField(User, primary_key=True)
    score = models.IntegerField(default=0)
    followed_questions = models.ManyToManyField(Question, related_name='follwed_users')

    class Meta:
        ordering = ['user']

    def __unicode__(self):
        return self.user.username

    def liked_questions(self):
        return Question.objects.filter(liked__in=[self.user])

    def liked_answers(self):
        return Answer.objects.filter(liked__in=[self.user])

    def increment_score(self):
        self.score += 1
        self.save()
