from threading import Lock

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.generic import View
from django.utils.html import escape

from restless.exceptions import BadRequest, HttpError, Unauthorized
from restless.preparers import FieldsPreparer

from base.api import AbstractBezzistResource
from .models import Answer
from question.models import Question


class AnswerResource(AbstractBezzistResource):

    resource_name = 'answers'
    resource_lock = Lock()

    hidden_score = -1

    preparer = FieldsPreparer(fields={
        'id': 'id',
        'answer': 'answer',
        'score': 'score',
        'created': 'created',
        'last_modified': 'modified'
    })

    def prepare(self, data):
        prepped = super(AnswerResource, self).prepare(data)
        if self.question.hide_score_until_finished:
            prepped['score'] = self.hidden_score
        return prepped

    def wrap_list_response(self, data):
        return {
            'qid': self.question.id,
            'answers': data
        }

    def list(self):
        query_filters = self.request.GET
        try:
            question = Question.objects.get(id=query_filters.get('qid'))
            self.question = question  # store for post-prep
            if question.hide_score_until_finished:
                return question.answers.order_by('created')
            return question.answers.order_by('-score')
        except:
            raise BadRequest('qid must be provided with the query.')

    def detail(self, pk):
        return get_object_or_404(Answer, pk=pk)

    def create(self):
        question = get_object_or_404(Question, id=self.data.get('qId'))
        self.question = question  # store for post-prep
        if not question.finished or not question.locked:
            answer = Answer.objects.create(
                user=self.request.user,
                answer=escape(self.data.get('answer'))
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
        if answer.is_owner(self.request.user) and answer.score is 0:
            question = Question.objects.get(id=self.data.get('qId'))  # question must exist for answer to exist
            self.question = question  # store for post-prep
            if not question.finished:
                if self.data.get('answer'):
                    answer.answer = escape(self.data.get('answer').strip())
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
