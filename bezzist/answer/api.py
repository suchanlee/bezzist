from django.shortcuts import get_object_or_404

from restless.exceptions import BadRequest, HttpError, Unauthorized
from restless.preparers import FieldsPreparer

from base.api import AbstractBezzistResource
from .models import Answer
from question.models import Question


class AnswerResource(AbstractBezzistResource):

    resource_name = 'answers'

    preparer = FieldsPreparer(fields={
        'id': 'id',
        'answer': 'answer',
        'score': 'score',
        'created': 'created',
        'last_modified': 'modified'
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
        answer = get_object_or_404(Answer, pk=pk)
        if self.is_owner(answer):
            question = get_object_or_404(Question, id=self.data.get('qId'))
            if not question.finished:
                answer.answer = self.data.get('answer').strip()
                answer.score = self.data.get('score')
                answer.save()
            else:
                raise HttpError(msg='This answer can no longer be modified because the question is now closed.')
            return answer
        else:
            raise Unauthorized()

    def delete(self, pk):
        answer = get_object_or_404(Answer, pk=pk)
        if self.is_owner(answer):
            try:
                answer.delete()
            except:
                raise BadRequest(msg='Failed to delete answer.')
        else:
            raise Unauthorized()

