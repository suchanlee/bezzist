from datetime import datetime, timedelta
from threading import Lock

from django.conf.urls import patterns, url
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.generic import View

from restless.exceptions import Unauthorized
from restless.preparers import FieldsPreparer
from restless.resources import skip_prepare

from base.api import AbstractBezzistResource
from .models import Question


class QuestionResource(AbstractBezzistResource):

    resource_name = 'questions'
    resource_lock = Lock()

    preparer = FieldsPreparer(fields={
        'id': 'id',
        'question': 'question',
        'score': 'score',
        'active': 'active',
        'featured': 'featured',
        'finished': 'finished',
        'locked': 'locked',
        'posted_by': 'user.username',
        'created': 'created',
        'modified': 'modified',
        'published': 'published_datetime'
    })

    def __init__(self, *args, **kwargs):
        super(QuestionResource, self).__init__(*args, **kwargs)
        self.http_methods.update({
            'answers': {
                'GET': 'answers',
            }
        })

    # GET /api/v1/questions/
    def list(self):
        query_filters = self.request.GET
        time_threshold = datetime.now() - timedelta(weeks=1)
        questions = Question.objects.filter(published_datetime__gt=time_threshold)
        if query_filters.get('active') == 'true':
            questions = questions.filter(active=True)
        elif query_filters.get('active') == 'false':
            questions = questions.filter(active=False)
        return questions  # for now returns all

    # GET /api/v1/questions/<pk>
    def detail(self, pk):
        return get_object_or_404(Question, pk=pk)

    # POST /api/questions/
    def create(self):
        # Unsanitized inputs
        self.request.user.userprofile.increment_score(10)
        return Question.objects.create(
            question=self.data.get('question'),
            user=self.request.user
        )

    # PUT /api/questions/<pk>
    def update(self, pk):
        # Currently allows editing question and score
        self.resource_lock.acquire()
        question = get_object_or_404(Question, pk=pk)
        if question.is_owner(self.request.user):
            question.question = self.data.get('question').strip()
            question.score = self.data.get('score')
            question.save()
            self.resource_lock.release()
            return question
        else:
            self.resource_lock.release()
            raise Unauthorized()

    # DELETE /api/questions/<pk>/
    def delete(self, pk):
        question = get_object_or_404(Question, pk=pk)
        if question.is_owner(self.request.user):
            question.delete()
        else:
            raise Unauthorized()

    # GET /api/questions/<pk>/answers
    @skip_prepare
    def answers(self, pk):
        question = get_object_or_404(Question, pk=pk)
        return {
            'answers': map(lambda a: a.shallow_mappify(), question.answers.all())
        }

    @classmethod
    def urls(cls, name_prefix=None):
        urlpatterns = super(QuestionResource, cls).urls(name_prefix=name_prefix)
        return urlpatterns + patterns(
            '',
            url(r'^(?P<pk>\d+)/answers$',
                cls.as_view('answers'),
                name=cls.build_url_name('answers', name_prefix)),
        )


class IncrementScoreRpcResource(View):

    # POST /api/questions/<pk>/incrementScore
    def post(self, request, pk):
        question = get_object_or_404(Question, pk=pk)
        question.increment_score(request)
        return JsonResponse({
            'id': question.id,
            'question': question.question,
            'score': question.score
        })

class DecrementScoreRpcResource(View):

    # POST /api/questions/<pk>/incrementScore
    def post(self, request, pk):
        question = get_object_or_404(Question, pk=pk)
        question.decrement_score(request)
        return JsonResponse({
            'id': question.id,
            'question': question.question,
            'score': question.score
        })

