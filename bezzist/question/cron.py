from datetime import datetime, timedelta

from django.db.models import Q

from .models import Question


def publish_top_question():
    '''
    Publishes the highest-voted, unpublished question
    and sets the published_datetime as now
    '''
    try:
        question = Question.objects.filter(Q(active=False)&Q(finished=False)).order_by('-score')[0]
        question.publish()
    except:
        # If there are no questions in queue, don't publish anything.
        pass

def finish_questions():
    '''
    Sets finished field of questions older than period
    specified in QUESTION_DURATION to true.
    '''
    time_threshold = datetime.now() - timedelta(weeks=1)
    questions = Question.objects.filter(Q(finished=False)&Q(published_datetime__lt=time_threshold))
    for question in questions:
        question.finish()
