import uuid

from django.contrib.auth.models import User
from django.db import models

from base.models import AbstractTimeStampedModel, MappableModel
from mail.mailer import Mailer
from question.models import Question


class UserConfirmation(AbstractTimeStampedModel):

    confirmation_code = models.CharField(max_length=40)
    used = models.BooleanField(default=False)
    user = models.ForeignKey(User)

    @classmethod
    def create_confirmation(self, user):
        code = str(uuid.uuid4().int)
        while self.objects.filter(confirmation_code=code).count() > 0:
            code = str(uuid.uuid4().int)
        confirmation = self.objects.create(confirmation_code=code, user=user)
        confirmation.send_confirmation_email()
        return confirmation

    def send_confirmation_email(self):
        Mailer.send_html_mail(
            'Welcome to Bezzist! Please Confirm Your Account',
            'mail/account_confirmation.html',
            { 'confirmation_code': self.confirmation_code },
            [self.user.email])

    def confirm_user(self):
        '''
        Confirms a user, authenticates and logges her in,
        and then send out an email to that user notifying
        her of the confirmation.
        '''
        self.user.is_active = True
        self.user.save()
        Mailer.send_html_mail(
            'Bezzist Account Confimation Email',
            'mail/account_confirmed.html',
            {},
            [self.user.email])
        self.delete()


class UserProfile(AbstractTimeStampedModel, MappableModel):

    user = models.OneToOneField(User, primary_key=True)
    score = models.IntegerField(default=0)
    followed_questions = models.ManyToManyField(Question, related_name='follwed_users')

    class Meta:
        ordering = ['user']

    def __unicode__(self):
        return self.user.username

    def increment_score(self, increment):
        self.score += increment
        self.save()

    def liked_questions(self):
        return map(lambda question: question.id, self.user.question_liked_users.all())

    def liked_answers(self):
        return map(lambda answer: answer.id, self.user.answer_liked_users.all())

    def package(self):
        package = self.shallow_mappify()
        package['liked_question_ids'] = self.liked_questions()
        package['liked_answer_ids'] = self.liked_answers()
        return package

