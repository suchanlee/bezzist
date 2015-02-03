from threading import Lock

from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.generic import View

from restless.exceptions import BadRequest, HttpError, Unauthorized
from restless.preparers import FieldsPreparer

from base.api import AbstractBezzistResource
from .models import Answer
from question.models import Question


class AnswerResource(AbstractBezzistResource):

    resource_name = 'answers'
    resource_lock = Lock()

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
        if not question.finished:
            answer = Answer.objects.create(
                user=self.request.user,
                answer=self.data.get('answer')
            )
            question.answers.add(answer)
            self.request.user.userprofile.increment_score(10)
        else:
            raise HttpError(msg='Answers cannot be added to a closed question.')
        return answer

    # PUT /api/answers/<pk>
    def update(self, pk):
        self.resource_lock.acquire()
        answer = get_object_or_404(Answer, pk=pk)
        if answer.is_owner(self.request.user):
            question = answer.question.all().get()  # question must exist for answer to exist
            if not question.finished:
                answer.answer = self.data.get('answer').strip()
                answer.score = self.data.get('score')
                answer.save()
                self.resource_lock.release()
                return answer
            else:
                self.resource_lock.release()
                raise HttpError(msg='This answer can no longer be modified because the question is now closed.' )
        else:
            self.resource_lock.release()
            raise Unauthorized()

    def delete(self, pk):
        answer = get_object_or_404(Answer, pk=pk)
        if answer.is_owner(self.request.user):
            try:
                answer.delete()
            except:
                raise BadRequest(msg='Failed to delete answer.')
        else:
            raise Unauthorized()

class ActiveAndFeaturedAnswerRpcResource(View):

    def get(self, request):
        questions = Question.objects.filter(Q(active=True) | Q(featured=True))
        answers = []
        for question in questions:
            answers.append({
                'questionId': question.id,
                'answers': map(lambda a: a.shallow_mappify(exception_fields=['liked_browsers']), question.answers.all())
            })
        return JsonResponse(answers, safe=False)


class IncrementScoreRpcResource(View):

    # POST /api/answers/<pk>/incrementScore
    def post(self, request, pk):
        answer = get_object_or_404(Answer, pk=pk)
        answer.increment_score(request)
        return JsonResponse({
            'id': answer.id,
            'question': answer.answer,
            'score': answer.score
        })

class DecrementScoreRpcResource(View):

    # POST /api/answers/<pk>/incrementScore
    def post(self, request, pk):
        answer = get_object_or_404(Answer, pk=pk)
        answer.decrement_score(request)
        return JsonResponse({
            'id': answer.id,
            'question': answer.answer,
            'score': answer.score
        })
