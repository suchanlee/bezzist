from datetime import datetime, timedelta
from threading import Lock

from django.conf import settings
from django.conf.urls import patterns, url
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
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
        'id'       : 'id',
        'question' : 'question',
        'score'    : 'score',
        'active'   : 'active',
        'featured' : 'featured',
        'finished' : 'finished',
        'locked'   : 'locked',
        'created'  : 'created',
        'modified' : 'modified',
        'published': 'published_datetime'
    })

    def __init__(self, *args, **kwargs):
        super(QuestionResource, self).__init__(*args, **kwargs)
        self.http_methods.update({
            'answers': {
                'GET': 'answers',
            }
        })

    def wrap_list_response(self, data):
        return {
            'questions': data,
            'per_page' : self.paginator.per_page,
            'count'    : self.paginator.count,
            'num_page' : self.paginator.num_pages,
        }

    # GET /api/v1/questions/
    def list(self):
        query_filters = self.request.GET
        if query_filters.get('active') == 'true':
            questions = Question.objects.filter(active=True).order_by('-published_datetime')
            self.paginator = Paginator(questions, settings.QUESTION_PAGE_SIZE)
            if 'page' in query_filters:
                try:
                    questions = self.paginator.page(int(query_filters.get('page')))
                except PageNotAnInteger:
                    questions = self.paginator.page(1)
                except EmptyPage:
                    questions = self.paginator.page(self.paginator.num_pages)
            else:
                questions = self.paginator.page(1)
            return questions
        elif query_filters.get('active') == 'false':
            questions = Question.objects.filter(active=False).order_by('-score')
        elif query_filters.get('featured') == 'true':
            questions = Question.objects.filter(Q(active=True)&Q(featured=True))
        else:
            questions = Question.objects.all()
        self.paginator = Paginator(questions, len(questions))
        return questions

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

