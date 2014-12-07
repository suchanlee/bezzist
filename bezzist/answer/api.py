from django.shortcuts import get_object_or_404

from restless.exceptions import Unauthorized
from restless.preparers import FieldsPreparer

from base.api import AbstractBezzistResource
from .models import Answer
from question.models import Question


class AnswerResource(AbstractBezzistResource):

    resource_name = 'answers'

    preparer = FieldsPreparer(fields={
        'pk': 'pk',
        'answer': 'answer',
        'score': 'score',
        'created': 'created'
    })

    def list(self):
        return Answer.objects.all()

    def detail(self, pk):
        return get_object_or_404(Answer, pk=pk)

    def create(self):
        question = get_object_or_404(Question, id=self.data.get('qId'))
        answer = Answer.objects.create(
            answer=self.data.get('answer')
        )
        question.answers.add(answer)
        return answer

    # PUT /api/answers/<pk>
    def update(self, pk):
        if self.is_authenticated():
            try:
                answer = Answer.objects.get(pk=pk)
            except Answer.DoesNotExist:
                answer = Question()
            # if question.user and question.user != self.request.user:
            #     raise Unauthorized()

            # Unsanitized inputs
            # Will need to add support for answer additions
            answer.answer = self.data.get('answer')
            answer.score = self.data.get('score')
            answer.save()
            return answer
        else:
            raise Unauthorized()
