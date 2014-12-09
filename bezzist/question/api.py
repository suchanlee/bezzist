from django.conf.urls import patterns, url
from django.shortcuts import get_object_or_404

from restless.exceptions import Unauthorized
from restless.preparers import FieldsPreparer
from restless.resources import skip_prepare

from base.api import AbstractBezzistResource
from .models import Question
from mail.models import Email


class QuestionResource(AbstractBezzistResource):

    resource_name = 'questions'

    preparer = FieldsPreparer(fields={
        'id': 'id',
        'question': 'question',
        'score': 'score',
        'active': 'active',
        'finished': 'finished',
        'posted_by': 'user.username',
        'created': 'created',
        'last_modified': 'modified'
    })

    def __init__(self, *args, **kwargs):
        super(QuestionResource, self).__init__(*args, **kwargs)
        self.http_methods.update({
            'answers': {
                'GET': 'answers',
            }
        })

    # GET /api/v1/questions
    def list(self):
        query_filters = self.request.GET
        questions = Question.objects.all()
        if query_filters.get('active') == 'true':
            questions = questions.filter(active=True)
        elif query_filters.get('active') == 'false':
            questions = questions.filter(active=False)
        return questions  # for now returns all

    # GET /api/v1/questions/<pk>
    def detail(self, pk):
        return get_object_or_404(Question, pk=pk)

    # POST /api/posts/
    def create(self):
        # Unsanitized inputs
        if self.is_authenticated():
            try:
                Email.objects.get(email=self.data.get('email'))
            except:
                Email.objects.create(email=self.data.get('email'))
            return Question.objects.create(
                question=self.data.get('question')
            )
        else:
            raise Unauthorized()

    # PUT /api/posts/<pk>
    def update(self, pk):
        if self.is_authenticated():
            try:
                question = Question.objects.get(pk=pk)
            except Question.DoesNotExist:
                question = Question()
            # if question.user and question.user != self.request.user:
            #     raise Unauthorized()

            # Unsanitized inputs
            # Will need to add support for answer additions
            question.question = self.data.get('question')
            question.score = self.data.get('score')
            question.save()
            return question
        else:
            raise Unauthorized()

    def delete(self, pk):
        question = get_object_or_404(Question, pk=pk)
        if (self.request.user.is_authenticated() and
                question.user == self.request.user):
            question.delete()
        else:
            raise Unauthorized()

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
